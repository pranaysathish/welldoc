# WellDoc: AI-Driven Risk Prediction Engine for Chronic Care Patients

## 🏥 Overview  

Advanced AI-powered healthcare dashboard that predicts patient deterioration risk within 90 days using comprehensive EHR data analysis.  

---

### 📂 Dataset  
[Download Dataset](https://drive.google.com/file/d/1BLG4k2LofotczI9fVY_GsurUza4wyaBr/view?usp=sharing)  

---

### 🔗 Colab Files  
1. [Colab Notebook 1](https://colab.research.google.com/drive/1pNbrIoYDd_tDAx3DCDOUqH8iEnLpFp92?usp=sharing)  
2. [Colab Notebook 2](https://colab.research.google.com/drive/1V4EFzjT0Eg6vSthxrKnWOdVilYdeaCS-?usp=sharing)  


## 🎯 Key Features
- **96.93% AUROC** - Exceptional model performance
- **61,445 patients** processed with real-time predictions
- **Interactive Dashboard** with patient cohort management
- **SHAP Explainability** for clinical interpretability
- **Comprehensive Condition Detection** across 6+ chronic conditions

## 🚀 Architecture
```
EHR Data → Feature Engineering → XGBoost Model → Risk Predictions → Dashboard
```

### Tech Stack
- **Backend**: FastAPI + Python
- **Frontend**: Next.js + TypeScript + Tailwind CSS
- **ML Pipeline**: XGBoost, SHAP, Pandas, Scikit-learn
- **Database**: CSV-based EHR dataset

## 📊 Model Performance
- **AUROC**: 96.93%
- **AUPRC**: 88.43%
- **Cohort AUROC**: 95.48%
- **Patients Processed**: 61,445
- **High-Risk Identified**: 15,264

## 🏃‍♂️ Quick Start

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd backend/dashboard
npm install
npm run dev
```

### Generate Predictions
```bash
cd model
python batch_predictions.py
```

## 🎨 Dashboard Features
- **Risk-based Patient Filtering**
- **Interactive Patient Details**
- **Clinical Recommendations**
- **Condition-based Analytics**
- **Real-time Risk Scoring**

## 📈 Clinical Impact
- Early intervention for high-risk patients
- Reduced hospitalization rates
- Improved chronic care management
- Data-driven clinical decisions

## 🔬 Model Explainability
Uses SHAP (SHapley Additive exPlanations) to provide:
- Global feature importance
- Patient-level risk factors
- Clinician-friendly explanations

## 📁 Project Structure
```
welldoc-3/
├── model/                 # ML pipeline & training
├── backend/              # FastAPI server
├── backend/dashboard/    # Next.js frontend
├── dataset/             # EHR data
└── dashboard_data.json  # Generated predictions
```

## 🏆 Competition Submission
Built for AI-driven healthcare challenge with focus on:
- Clinical applicability
- Model interpretability  
- Production readiness
- Healthcare workflow integration

---
**Built with ❤️ for better healthcare outcomes**
