#!/usr/bin/env python3
"""
FastAPI Backend for Chronic Care Risk Dashboard
==============================================

Serves patient risk data and predictions to the Next.js frontend.
Provides RESTful endpoints for cohort overview and individual patient details.
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Dict, Any
import json
import uvicorn
from pathlib import Path

# Initialize FastAPI app
app = FastAPI(
    title="Chronic Care Risk Prediction API",
    description="AI-driven risk prediction backend for chronic care patients",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Next.js default ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global data storage
dashboard_data = None

def load_dashboard_data():
    """Load dashboard data from JSON file"""
    global dashboard_data
    
    try:
        data_file = Path("../dashboard_data.json")
        if not data_file.exists():
            data_file = Path("dashboard_data.json")  # Try current directory
            
        with open(data_file, 'r') as f:
            dashboard_data = json.load(f)
            
        print(f"✅ Loaded dashboard data: {dashboard_data['metadata']['total_patients']} patients")
        return True
        
    except Exception as e:
        print(f"❌ Error loading dashboard data: {e}")
        return False

# Load data on startup
@app.on_event("startup")
async def startup_event():
    success = load_dashboard_data()
    if not success:
        print("⚠️  Warning: Dashboard data not loaded. Some endpoints may not work.")

# ============================================================================
# API ENDPOINTS
# ============================================================================

@app.get("/")
async def root():
    """API health check and info"""
    return {
        "message": "Chronic Care Risk Prediction API",
        "status": "healthy",
        "version": "1.0.0",
        "endpoints": [
            "/patients - Get all patients with optional filtering",
            "/patients/{patient_id} - Get individual patient details", 
            "/summary - Get cohort summary statistics",
            "/metadata - Get model and dataset metadata"
        ]
    }

@app.get("/metadata")
async def get_metadata():
    """Get model and dataset metadata"""
    if not dashboard_data:
        raise HTTPException(status_code=503, detail="Dashboard data not available")
    
    return dashboard_data["metadata"]

@app.get("/summary")
async def get_summary():
    """Get cohort summary statistics"""
    if not dashboard_data:
        raise HTTPException(status_code=503, detail="Dashboard data not available")
    
    return {
        "metadata": dashboard_data["metadata"],
        "summary": dashboard_data["summary"]
    }

@app.get("/patients")
async def get_patients(
    risk_level: Optional[str] = Query(None, description="Filter by risk level: Low Risk, Medium Risk, High Risk, Critical Risk"),
    min_risk: Optional[float] = Query(None, description="Minimum risk percentage (0-100)"),
    max_risk: Optional[float] = Query(None, description="Maximum risk percentage (0-100)"),
    age_min: Optional[int] = Query(None, description="Minimum age"),
    age_max: Optional[int] = Query(None, description="Maximum age"),
    gender: Optional[str] = Query(None, description="Filter by gender: male, female"),
    limit: Optional[int] = Query(100, description="Maximum number of patients to return"),
    offset: Optional[int] = Query(0, description="Number of patients to skip (for pagination)")
):
    """
    Get list of patients with optional filtering and pagination
    
    Returns patient list suitable for cohort dashboard view
    """
    if not dashboard_data:
        raise HTTPException(status_code=503, detail="Dashboard data not available")
    
    patients = dashboard_data["patients"]
    
    # Apply filters
    filtered_patients = patients
    
    if risk_level:
        filtered_patients = [p for p in filtered_patients if p["level"] == risk_level]
    
    if min_risk is not None:
        filtered_patients = [p for p in filtered_patients if p["risk_percentage"] >= min_risk]
        
    if max_risk is not None:
        filtered_patients = [p for p in filtered_patients if p["risk_percentage"] <= max_risk]
        
    if age_min is not None:
        filtered_patients = [p for p in filtered_patients if p["age"] >= age_min]
        
    if age_max is not None:
        filtered_patients = [p for p in filtered_patients if p["age"] <= age_max]
        
    if gender:
        filtered_patients = [p for p in filtered_patients if p["gender"].lower() == gender.lower()]
    
    # Sort by risk (highest first) for clinical priority
    filtered_patients.sort(key=lambda x: x["risk_percentage"], reverse=True)
    
    # Apply pagination
    total_count = len(filtered_patients)
    paginated_patients = filtered_patients[offset:offset + limit]
    
    return {
        "patients": paginated_patients,
        "total_count": total_count,
        "returned_count": len(paginated_patients),
        "offset": offset,
        "limit": limit,
        "filters_applied": {
            "risk_level": risk_level,
            "min_risk": min_risk,
            "max_risk": max_risk,
            "age_min": age_min,
            "age_max": age_max,
            "gender": gender
        }
    }

@app.get("/patients/{patient_id}")
async def get_patient_details(patient_id: str):
    """
    Get detailed information for a specific patient
    
    Returns complete patient data including risk factors and explanations
    """
    if not dashboard_data:
        raise HTTPException(status_code=503, detail="Dashboard data not available")
    
    # Find patient by ID
    patient = None
    for p in dashboard_data["patients"]:
        if p["patient_id"] == patient_id:
            patient = p
            break
    
    if not patient:
        raise HTTPException(status_code=404, detail=f"Patient {patient_id} not found")
    
    # Add some computed fields for the detail view
    enhanced_patient = patient.copy()
    
    # Risk trend simulation (for demo purposes)
    enhanced_patient["risk_trend"] = [
        {"date": "2024-01-01", "risk": max(0.05, patient["risk_percentage"] - 5)},
        {"date": "2024-01-15", "risk": max(0.05, patient["risk_percentage"] - 3)},
        {"date": "2024-02-01", "risk": max(0.05, patient["risk_percentage"] - 1)},
        {"date": "2024-02-15", "risk": patient["risk_percentage"]},
    ]
    
    # Clinical recommendations based on risk factors
    recommendations = []
    if patient["risk_percentage"] > 50:
        recommendations.extend([
            "Urgent: Schedule immediate clinical evaluation",
            "Consider hospitalization or intensive monitoring",
            "Review all medications and dosages"
        ])
    elif patient["risk_percentage"] > 25:
        recommendations.extend([
            "Schedule follow-up within 1-2 weeks",
            "Monitor vital signs closely",
            "Review chronic disease management plan"
        ])
    elif patient["risk_percentage"] > 10:
        recommendations.extend([
            "Routine follow-up in 1 month",
            "Continue current treatment plan",
            "Monitor for symptom changes"
        ])
    else:
        recommendations.extend([
            "Continue routine care",
            "Annual wellness visit",
            "Maintain healthy lifestyle"
        ])
    
    enhanced_patient["recommendations"] = recommendations
    
    return enhanced_patient

@app.get("/patients/high-risk/alerts")
async def get_high_risk_alerts():
    """Get list of patients requiring immediate attention"""
    if not dashboard_data:
        raise HTTPException(status_code=503, detail="Dashboard data not available")
    
    # Get high and critical risk patients
    high_risk_patients = [
        p for p in dashboard_data["patients"] 
        if p["priority"] >= 3  # High Risk (3) and Critical Risk (4)
    ]
    
    # Sort by risk (highest first)
    high_risk_patients.sort(key=lambda x: x["risk_percentage"], reverse=True)
    
    return {
        "alert_count": len(high_risk_patients),
        "critical_count": len([p for p in high_risk_patients if p["priority"] == 4]),
        "high_count": len([p for p in high_risk_patients if p["priority"] == 3]),
        "patients": high_risk_patients[:20]  # Top 20 for alerts
    }

@app.get("/analytics/risk-distribution")
async def get_risk_distribution():
    """Get risk distribution analytics for charts"""
    if not dashboard_data:
        raise HTTPException(status_code=503, detail="Dashboard data not available")
    
    patients = dashboard_data["patients"]
    
    # Risk level distribution
    risk_levels = dashboard_data["summary"]["risk_distribution"]
    
    # Age-based risk analysis
    age_groups = {"18-35": [], "36-50": [], "51-65": [], "66-80": [], "80+": []}
    
    for patient in patients:
        age = patient["age"]
        if age <= 35:
            age_groups["18-35"].append(patient["risk_percentage"])
        elif age <= 50:
            age_groups["36-50"].append(patient["risk_percentage"])
        elif age <= 65:
            age_groups["51-65"].append(patient["risk_percentage"])
        elif age <= 80:
            age_groups["66-80"].append(patient["risk_percentage"])
        else:
            age_groups["80+"].append(patient["risk_percentage"])
    
    # Calculate average risk by age group
    age_risk_analysis = {}
    for group, risks in age_groups.items():
        if risks:
            age_risk_analysis[group] = {
                "count": len(risks),
                "avg_risk": round(sum(risks) / len(risks), 1),
                "max_risk": round(max(risks), 1)
            }
        else:
            age_risk_analysis[group] = {"count": 0, "avg_risk": 0, "max_risk": 0}
    
    return {
        "risk_distribution": risk_levels,
        "age_analysis": age_risk_analysis,
        "total_patients": len(patients)
    }

# ============================================================================
# MAIN EXECUTION
# ============================================================================

if __name__ == "__main__":
    print("🏥 Starting Chronic Care Risk Prediction API...")
    print("📊 Dashboard: http://localhost:8000")
    print("📖 API Docs: http://localhost:8000/docs")
    print("🔄 Interactive Docs: http://localhost:8000/redoc")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
