import pandas as pd
import numpy as np

print("🏥 AI-DRIVEN CHRONIC CARE RISK PREDICTION ENGINE")
print("=" * 60)
print("STEP 1: LOADING AND EXPLORING DATASET")
print("=" * 60)

# Load dataset
df = pd.read_csv('dataset/ehr_cleaned_dataset.csv')
print(f"✓ Dataset loaded: {df.shape[0]:,} patients, {df.shape[1]} features")

# Show key temporal columns
temporal_cols = ['first_encounter', 'last_encounter', 'deceaseddatetime', 
                'vaccine_dates', 'procedure_dates']
print(f"\n📅 Key Temporal Columns Found:")
for col in temporal_cols:
    if col in df.columns:
        non_null = df[col].notna().sum()
        print(f"   {col}: {non_null:,} patients have data")

# Show mortality distribution (our target)
print(f"\n🎯 Target Variable (Mortality):")
mortality_dist = df['mortality'].value_counts()
print(f"   Alive (0): {mortality_dist[0]:,} patients ({mortality_dist[0]/len(df)*100:.1f}%)")
print(f"   Deceased (1): {mortality_dist[1]:,} patients ({mortality_dist[1]/len(df)*100:.1f}%)")

print(f"\n📊 Dataset Overview:")
print(f"   Total Columns: {len(df.columns)}")
print(f"   Memory Usage: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")

# Show sample of important clinical features
clinical_cols = ['Body_Mass_Index', 'Glucose', 'Hemoglobin_A1c_Hemoglobin_total_in_Blood', 
                'Total_Cholesterol', 'conditions']
print(f"\n🩺 Sample Clinical Features:")
for col in clinical_cols:
    if col in df.columns:
        non_null = df[col].notna().sum()
        print(f"   {col}: {non_null:,} patients have data")
