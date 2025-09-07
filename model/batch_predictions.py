#!/usr/bin/env python3
"""
Batch Predictions Script for Chronic Care Risk Dashboard
========================================================

This script loads our trained ML model and processes all patients from the 
EHR dataset to generate risk scores and explanations for the dashboard.

Output: JSON file with patient risk data for dashboard consumption
"""

import pandas as pd
import numpy as np
import pickle
import json
from pathlib import Path
import warnings
warnings.filterwarnings('ignore')

# Machine Learning
from sklearn.preprocessing import StandardScaler
import shap

class BatchPredictor:
    def __init__(self):
        self.model_path = 'chronic_care_model.pkl'
        self.dataset_path = '../dataset/ehr_cleaned_dataset.csv'
        self.output_path = '../dashboard_data.json'
        self.df = None
        self.model_data = None
        self.patient_predictions = []
        
    def load_model_and_data(self):
        """Load the trained model and dataset"""
        print("Loading trained model and dataset...")
        
        # Load the saved model data
        with open(self.model_path, 'rb') as f:
            self.model_data = pickle.load(f)
            
        print(f"✅ Loaded model: {self.model_data['metadata']['best_model']}")
        print(f"✅ Model AUROC: {self.model_data['metadata']['test_auroc']:.4f}")
        
        # Load the dataset
        self.df = pd.read_csv(self.dataset_path)
        print(f"✅ Loaded dataset: {self.df.shape[0]} patients")
        
        return True
    
    def prepare_features_for_prediction(self):
        """Prepare features exactly as done in training"""
        print("Preparing features for all patients...")
        
        # Import the feature engineering logic from our main pipeline
        # We'll recreate the key steps here for consistency
        
        # Convert dates
        self.df['first_encounter'] = pd.to_datetime(self.df['first_encounter'])
        self.df['last_encounter'] = pd.to_datetime(self.df['last_encounter'])
        self.df['birthdate'] = pd.to_datetime(self.df['birthdate'])
        
        # Calculate age
        self.df['age_at_last_encounter'] = (
            self.df['last_encounter'] - self.df['birthdate']
        ).dt.days / 365.25
        
        # Filter patients with sufficient temporal history (>=30 days)
        self.df['total_care_duration_days'] = (
            self.df['last_encounter'] - self.df['first_encounter']
        ).dt.days
        
        # Parse procedure data (needed for feature engineering)
        def safe_parse_array(x):
            if pd.isna(x) or x == '[]':
                return []
            try:
                if isinstance(x, str):
                    import ast
                    return ast.literal_eval(x)
                return x if isinstance(x, list) else []
            except:
                return []
        
        # Calculate procedure count
        if 'procedures' in self.df.columns:
            self.df['procedure_count'] = self.df['procedures'].apply(lambda x: len(safe_parse_array(x)))
        else:
            self.df['procedure_count'] = 0
            
        valid_patients = (self.df['total_care_duration_days'] >= 30) & (self.df['age_at_last_encounter'] >= 18)
        self.df = self.df[valid_patients].copy()
        
        print(f"✅ Filtered to {len(self.df)} patients with sufficient data")
        
        # Engineer features (simplified version of main pipeline)
        feature_df = self.df.copy()
        
        # Demographics
        feature_df['gender_male'] = (feature_df['gender'] == 'male').astype(int)
        feature_df['age_group_senior'] = (feature_df['age_at_last_encounter'] >= 65).astype(int)
        feature_df['age_group_elderly'] = (feature_df['age_at_last_encounter'] >= 80).astype(int)
        
        # BMI categories
        feature_df['bmi_obese'] = (feature_df['Body_Mass_Index'] >= 30).astype(int)
        feature_df['bmi_underweight'] = (feature_df['Body_Mass_Index'] < 18.5).astype(int)
        feature_df['bmi_normal'] = ((feature_df['Body_Mass_Index'] >= 18.5) & 
                                   (feature_df['Body_Mass_Index'] < 25)).astype(int)
        
        # Clinical thresholds
        feature_df['glucose_diabetic'] = (feature_df['Glucose'] >= 126).astype(int)
        feature_df['hba1c_diabetic'] = (feature_df['Hemoglobin_A1c_Hemoglobin_total_in_Blood'] >= 6.5).astype(int)
        feature_df['creatinine_high'] = (feature_df['Creatinine'] > 1.2).astype(int)
        feature_df['cholesterol_high'] = (feature_df['Total_Cholesterol'] >= 240).astype(int)
        
        # Temperature alerts
        feature_df['fever'] = (feature_df['Oral_temperature'] > 38.0).astype(int)
        feature_df['hypothermia'] = (feature_df['Oral_temperature'] < 36.0).astype(int)
        
        # Healthcare utilization
        feature_df['procedures_per_year'] = feature_df['procedure_count'] / (
            feature_df['total_care_duration_days'] / 365.25
        )
        feature_df['high_utilization'] = (feature_df['procedures_per_year'] > 10).astype(int)
        feature_df['long_encounters'] = (feature_df['avg_encounter_duration_min'] > 60).astype(int)
        
        # Care duration categories
        feature_df['short_term_care'] = (feature_df['total_care_duration_days'] <= 90).astype(int)
        feature_df['medium_term_care'] = ((feature_df['total_care_duration_days'] > 90) & 
                                         (feature_df['total_care_duration_days'] <= 365)).astype(int)
        feature_df['long_term_care'] = (feature_df['total_care_duration_days'] > 365).astype(int)
        
        # Process conditions (simplified)
        def parse_conditions(conditions_str):
            if pd.isna(conditions_str):
                return []
            try:
                if isinstance(conditions_str, str):
                    import ast
                    return ast.literal_eval(conditions_str.lower())
                return []
            except:
                return []
        
        # Extract condition flags
        if 'conditions' in feature_df.columns:
            feature_df['conditions_parsed'] = feature_df['conditions'].apply(parse_conditions)
            
            # Create condition flags
            feature_df['condition_prediabetes'] = feature_df['conditions_parsed'].apply(
                lambda x: int(any('prediabetes' in str(c).lower() for c in x)))
            feature_df['condition_hypertension'] = feature_df['conditions_parsed'].apply(
                lambda x: int(any('hypertension' in str(c).lower() for c in x)))
            feature_df['condition_stroke'] = feature_df['conditions_parsed'].apply(
                lambda x: int(any('stroke' in str(c).lower() for c in x)))
            feature_df['condition_heart_failure'] = feature_df['conditions_parsed'].apply(
                lambda x: int(any('heart' in str(c).lower() for c in x)))
            feature_df['condition_chronic_kidney_disease'] = feature_df['conditions_parsed'].apply(
                lambda x: int(any('kidney' in str(c).lower() for c in x)))
        else:
            # Default to 0 if no conditions column
            for condition in ['prediabetes', 'hypertension', 'stroke', 'heart_failure', 'chronic_kidney_disease']:
                feature_df[f'condition_{condition}'] = 0
                
        # Count total conditions
        condition_cols = [col for col in feature_df.columns if col.startswith('condition_')]
        if condition_cols:
            feature_df['condition_count'] = feature_df[condition_cols].sum(axis=1)
        else:
            feature_df['condition_count'] = 0
        feature_df['multiple_conditions'] = (feature_df['condition_count'] >= 3).astype(int)
        
        # Fill missing values for key features
        fill_columns = ['Body_Mass_Index', 'Body_Weight', 'Body_Height', 'Oral_temperature',
                       'Glucose', 'Hemoglobin_A1c_Hemoglobin_total_in_Blood', 'Creatinine', 'Total_Cholesterol',
                       'avg_encounter_duration_min']
        
        for col in fill_columns:
            if col in feature_df.columns:
                feature_df[f'{col}_filled'] = feature_df[col].fillna(feature_df[col].median())
        
        # Select the same features used in training
        expected_features = self.model_data['feature_names']
        
        # Create feature matrix with all expected features
        self.features = pd.DataFrame(index=feature_df.index)
        
        for feature in expected_features:
            if feature in feature_df.columns:
                self.features[feature] = feature_df[feature]
            else:
                self.features[feature] = 0
                
        self.features = self.features.fillna(0)
        
        print(f"✅ Feature matrix prepared: {self.features.shape}")
        return self.features
    
    def generate_predictions(self):
        """Generate risk predictions for all patients"""
        print("Generating risk predictions...")
        
        # Get the best model
        best_model_name = self.model_data['metadata']['best_model']
        best_model = self.model_data['models'][best_model_name]
        
        # Handle scaler (might be single scaler or dict)
        if isinstance(self.model_data['scalers'], dict):
            scaler = self.model_data['scalers'].get(best_model_name, list(self.model_data['scalers'].values())[0])
        else:
            scaler = self.model_data['scalers']
        
        # Scale features
        X_scaled = scaler.transform(self.features)
        
        # Generate predictions
        risk_probabilities = best_model.predict_proba(X_scaled)[:, 1]
        
        print(f"✅ Generated predictions for {len(risk_probabilities)} patients")
        
        return risk_probabilities
    
    def categorize_risk(self, probability):
        """Categorize risk level based on probability"""
        if probability < 0.10:
            return {"level": "Low Risk", "color": "green", "priority": 1}
        elif probability < 0.25:
            return {"level": "Medium Risk", "color": "yellow", "priority": 2}
        elif probability < 0.50:
            return {"level": "High Risk", "color": "orange", "priority": 3}
        else:
            return {"level": "Critical Risk", "color": "red", "priority": 4}
    
    def generate_explanations(self, sample_size=1000):
        """Generate SHAP explanations for a sample of patients"""
        print("Generating SHAP explanations...")
        
        # Use a sample for SHAP (computational efficiency)
        sample_indices = np.random.choice(len(self.features), 
                                        min(sample_size, len(self.features)), 
                                        replace=False)
        
        X_sample = self.features.iloc[sample_indices]
        best_model_name = self.model_data['metadata']['best_model']
        
        # Handle scaler (might be single scaler or dict)
        if isinstance(self.model_data['scalers'], dict):
            scaler = self.model_data['scalers'].get(best_model_name, list(self.model_data['scalers'].values())[0])
        else:
            scaler = self.model_data['scalers']
            
        X_sample_scaled = scaler.transform(X_sample)
        
        # Create SHAP explainer
        best_model = self.model_data['models'][best_model_name]
        
        if self.model_data['metadata']['best_model'] == 'xgboost':
            explainer = shap.TreeExplainer(best_model)
            shap_values = explainer.shap_values(X_sample_scaled)
        else:
            # For other models, use a smaller background sample
            background = X_sample_scaled[:min(100, len(X_sample_scaled))]
            explainer = shap.KernelExplainer(best_model.predict_proba, background)
            shap_values = explainer.shap_values(X_sample_scaled[:100])[:, 1]
        
        print(f"✅ Generated SHAP explanations for {len(shap_values)} patients")
        
        return sample_indices[:len(shap_values)], shap_values
    
    def create_patient_records(self, risk_probabilities, shap_indices=None, shap_values=None):
        """Create structured patient records for dashboard"""
        print("Creating patient records for dashboard...")
        
        patient_records = []
        
        for idx, (patient_idx, risk_prob) in enumerate(zip(self.df.index, risk_probabilities)):
            patient_row = self.df.loc[patient_idx]
            
            # Basic patient info
            record = {
                "patient_id": str(patient_idx),
                "name": f"Patient {patient_idx}",  # Anonymous for demo
                "age": round(patient_row.get('age_at_last_encounter', 0)),
                "gender": patient_row.get('gender', 'unknown'),
                "last_encounter": patient_row.get('last_encounter', '').strftime('%Y-%m-%d') if pd.notnull(patient_row.get('last_encounter')) else '',
                
                # Risk assessment
                "risk_probability": float(risk_prob),
                "risk_percentage": round(float(risk_prob * 100), 1),
                **self.categorize_risk(risk_prob),
                
                # Clinical data - Parse from original conditions column
                "conditions": self._extract_conditions_from_patient(patient_row),
                
                "vitals": {
                    "bmi": round(float(patient_row.get('Body_Mass_Index', 0)), 1) if pd.notnull(patient_row.get('Body_Mass_Index')) else None,
                    "weight": round(float(patient_row.get('Body_Weight', 0)), 1) if pd.notnull(patient_row.get('Body_Weight')) else None,
                    "temperature": round(float(patient_row.get('Oral_temperature', 0)), 1) if pd.notnull(patient_row.get('Oral_temperature')) else None
                },
                
                "labs": {
                    "glucose": round(float(patient_row.get('Glucose', 0)), 1) if pd.notnull(patient_row.get('Glucose')) else None,
                    "hba1c": round(float(patient_row.get('Hemoglobin_A1c_Hemoglobin_total_in_Blood', 0)), 1) if pd.notnull(patient_row.get('Hemoglobin_A1c_Hemoglobin_total_in_Blood')) else None,
                    "creatinine": round(float(patient_row.get('Creatinine', 0)), 2) if pd.notnull(patient_row.get('Creatinine')) else None,
                    "cholesterol": round(float(patient_row.get('Total_Cholesterol', 0)), 1) if pd.notnull(patient_row.get('Total_Cholesterol')) else None
                },
                
                # Healthcare utilization
                "care_duration_days": int(patient_row.get('total_care_duration_days', 0)),
                "procedure_count": int(patient_row.get('procedure_count', 0)),
                "avg_encounter_duration": round(float(patient_row.get('avg_encounter_duration_min', 0)), 1) if pd.notnull(patient_row.get('avg_encounter_duration_min')) else None,
                
                # Ground truth (for evaluation)
                "actual_outcome": int(patient_row.get('mortality', 0))
            }
            
            # Add SHAP explanations if available
            if shap_indices is not None and shap_values is not None and idx < len(shap_indices):
                shap_idx = np.where(shap_indices == patient_idx)[0]
                if len(shap_idx) > 0:
                    patient_shap = shap_values[shap_idx[0]]
                    feature_names = self.model_data['feature_names']
                    
                    # Get top 5 risk factors
                    shap_importance = list(zip(feature_names, patient_shap))
                    shap_importance.sort(key=lambda x: abs(x[1]), reverse=True)
                    
                    record["risk_factors"] = [
                        {
                            "factor": self.translate_feature_name(factor),
                            "impact": float(impact),
                            "direction": "increases" if impact > 0 else "decreases"
                        }
                        for factor, impact in shap_importance[:5]
                    ]
                else:
                    record["risk_factors"] = []
            else:
                record["risk_factors"] = []
            
            patient_records.append(record)
        
        print(f"✅ Created {len(patient_records)} patient records")
        return patient_records
    
    def _extract_conditions_from_patient(self, patient_row):
        """Extract and parse conditions from patient data"""
        conditions_str = str(patient_row.get('conditions', '[]'))
        
        # Initialize condition flags
        conditions = {
            "diabetes": 0,
            "hypertension": 0,
            "heart_disease": 0,
            "kidney_disease": 0,
            "stroke": 0,
            "copd": 0,
            "other_conditions": [],  # Store unrecognized conditions
            "total_conditions": 0
        }
        
        if conditions_str and conditions_str not in ['[]', 'nan', 'None', ''] and not pd.isna(conditions_str):
            try:
                # Parse conditions string - handle Python list format
                if isinstance(conditions_str, str):
                    import ast
                    parsed_conditions = ast.literal_eval(conditions_str)
                    
                    if isinstance(parsed_conditions, list) and len(parsed_conditions) > 0:
                        conditions_list = [str(c).lower() for c in parsed_conditions if c and str(c).strip()]
                        
                        # Check for specific conditions and create comprehensive mapping
                        detected_conditions = []
                        for condition in conditions_list:
                            condition = condition.strip().lower()
                            
                            # Diabetes and Prediabetes
                            if 'diabetes' in condition or 'prediabetes' in condition:
                                conditions["diabetes"] = 1
                                if "diabetes" not in detected_conditions:
                                    detected_conditions.append("diabetes")
                            
                            # Hypertension
                            elif 'hypertension' in condition or 'high blood pressure' in condition:
                                conditions["hypertension"] = 1
                                if "hypertension" not in detected_conditions:
                                    detected_conditions.append("hypertension")
                            
                            # Heart Disease
                            elif ('heart' in condition or 'cardiac' in condition or 'coronary' in condition 
                                  or 'myocardial' in condition or 'angina' in condition):
                                conditions["heart_disease"] = 1
                                if "heart_disease" not in detected_conditions:
                                    detected_conditions.append("heart_disease")
                            
                            # Kidney Disease
                            elif ('kidney' in condition or 'renal' in condition or 'nephritis' in condition):
                                conditions["kidney_disease"] = 1
                                if "kidney_disease" not in detected_conditions:
                                    detected_conditions.append("kidney_disease")
                            
                            # Stroke
                            elif ('stroke' in condition or 'cerebrovascular' in condition or 'tia' in condition):
                                conditions["stroke"] = 1
                                if "stroke" not in detected_conditions:
                                    detected_conditions.append("stroke")
                            
                            # COPD and Respiratory
                            elif ('copd' in condition or 'pulmonary' in condition or 'respiratory' in condition 
                                  or 'emphysema' in condition or 'bronchitis' in condition or 'asthma' in condition):
                                conditions["copd"] = 1
                                if "copd" not in detected_conditions:
                                    detected_conditions.append("copd")
                            
                            # If condition doesn't match our categories, store it as other
                            else:
                                conditions["other_conditions"].append(condition.strip())
                                detected_conditions.append("other")
                        
                        # Set total_conditions to match detected conditions count
                        conditions["total_conditions"] = len(detected_conditions)
                        
            except Exception as e:
                # Fallback: check individual condition flags from feature engineering
                conditions["diabetes"] = int(patient_row.get('condition_prediabetes', 0)) or int(patient_row.get('glucose_diabetic', 0))
                conditions["hypertension"] = int(patient_row.get('condition_hypertension', 0))
                conditions["heart_disease"] = int(patient_row.get('condition_heart_failure', 0))
                conditions["kidney_disease"] = int(patient_row.get('condition_chronic_kidney_disease', 0))
                conditions["total_conditions"] = int(patient_row.get('condition_count', 0))
        else:
            # If no conditions string, use feature engineering flags as fallback
            conditions["diabetes"] = int(patient_row.get('condition_prediabetes', 0)) or int(patient_row.get('glucose_diabetic', 0))
            conditions["hypertension"] = int(patient_row.get('condition_hypertension', 0))
            conditions["heart_disease"] = int(patient_row.get('condition_heart_failure', 0))
            conditions["kidney_disease"] = int(patient_row.get('condition_chronic_kidney_disease', 0))
            conditions["total_conditions"] = int(patient_row.get('condition_count', 0))
        
        return conditions

    def translate_feature_name(self, technical_name):
        """Translate technical feature names to clinical language"""
        translations = {
            'total_care_duration_days': 'Length of Care Relationship',
            'age_at_last_encounter': 'Patient Age',
            'avg_encounter_duration_filled': 'Average Appointment Duration',
            'condition_count': 'Number of Chronic Conditions',
            'Body_Mass_Index_filled': 'Body Mass Index',
            'glucose_diabetic': 'Diabetic Glucose Levels',
            'hba1c_diabetic': 'Diabetic HbA1c Levels',
            'condition_hypertension': 'Hypertension Diagnosis',
            'condition_prediabetes': 'Prediabetes Diagnosis',
            'condition_heart_failure': 'Heart Failure Diagnosis',
            'procedure_count': 'Number of Medical Procedures',
            'multiple_conditions': 'Multiple Chronic Conditions',
            'creatinine_high': 'Elevated Creatinine Levels',
            'bmi_obese': 'Obesity (BMI ≥30)',
            'high_utilization': 'High Healthcare Utilization',
            'long_term_care': 'Long-term Care Relationship'
        }
        return translations.get(technical_name, technical_name.replace('_', ' ').title())
    
    def save_dashboard_data(self, patient_records):
        """Save data for dashboard consumption"""
        print("Saving dashboard data...")
        
        # Create summary statistics
        total_patients = len(patient_records)
        risk_distribution = {}
        for level in ["Low Risk", "Medium Risk", "High Risk", "Critical Risk"]:
            count = sum(1 for p in patient_records if p['level'] == level)
            risk_distribution[level] = {
                "count": count,
                "percentage": round(count / total_patients * 100, 1)
            }
        
        # Calculate model performance on this cohort
        actual_outcomes = [p['actual_outcome'] for p in patient_records]
        predicted_probs = [p['risk_probability'] for p in patient_records]
        
        from sklearn.metrics import roc_auc_score, average_precision_score
        cohort_auroc = roc_auc_score(actual_outcomes, predicted_probs)
        cohort_auprc = average_precision_score(actual_outcomes, predicted_probs)
        
        # Create dashboard data structure
        dashboard_data = {
            "metadata": {
                "generated_at": pd.Timestamp.now().isoformat(),
                "total_patients": total_patients,
                "model_name": self.model_data['metadata']['best_model'],
                "model_auroc": float(self.model_data['metadata']['test_auroc']),
                "cohort_auroc": float(cohort_auroc),
                "cohort_auprc": float(cohort_auprc)
            },
            "summary": {
                "risk_distribution": risk_distribution,
                "high_risk_alerts": len([p for p in patient_records if p['priority'] >= 3]),
                "critical_risk_alerts": len([p for p in patient_records if p['priority'] == 4])
            },
            "patients": patient_records
        }
        
        # Save to JSON file
        output_file = "dashboard_data.json"
        with open(output_file, 'w') as f:
            json.dump(dashboard_data, f, indent=2)
        
        print(f"✅ Dashboard data saved to {output_file}")
        print(f"✅ Total patients: {total_patients}")
        print(f"✅ High/Critical risk: {dashboard_data['summary']['high_risk_alerts']}")
        print(f"✅ Cohort AUROC: {cohort_auroc:.4f}")
        
        return output_file

def main():
    """Main execution function"""
    print("🏥 CHRONIC CARE RISK DASHBOARD - BATCH PREDICTIONS")
    print("=" * 60)
    
    # Initialize batch predictor
    predictor = BatchPredictor()
    
    # Step 1: Load model and data
    predictor.load_model_and_data()
    
    # Step 2: Prepare features
    features = predictor.prepare_features_for_prediction()
    
    # Step 3: Generate predictions
    risk_probabilities = predictor.generate_predictions()
    
    # Step 4: Generate explanations (sample)
    shap_indices, shap_values = predictor.generate_explanations(sample_size=500)
    
    # Step 5: Create patient records
    patient_records = predictor.create_patient_records(
        risk_probabilities, shap_indices, shap_values
    )
    
    # Step 6: Save dashboard data
    output_file = predictor.save_dashboard_data(patient_records)
    
    print("\n🎉 BATCH PREDICTIONS COMPLETED!")
    print(f"Dashboard data ready in: {output_file}")
    print("Ready for Next.js dashboard integration!")

if __name__ == "__main__":
    main()
