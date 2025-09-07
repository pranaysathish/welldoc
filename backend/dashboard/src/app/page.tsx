'use client';
import React, { useState, useEffect } from 'react';
import { Users, AlertTriangle, TrendingUp, Heart, Brain, Activity, Clock, Calendar } from 'lucide-react';
import RiskDistributionChart from '@/components/RiskDistributionChart';
import PatientTable from '@/components/PatientTable';
import ModelVisualizationModal from '@/components/ModelVisualizationModal';
import { RainbowButton } from '@/components/ui/rainbow-button';

interface Patient {
  patient_id: string;
  name: string;
  age: number;
  gender: string;
  risk_percentage: number;
  level: string;
  color: string;
  priority: number;
  last_encounter: string;
  conditions: {
    diabetes: number;
    hypertension: number;
    heart_disease: number;
    kidney_disease: number;
    stroke: number;
    copd: number;
    other_conditions: string[];
    total_conditions: number;
  };
}

interface DashboardData {
  patients: Patient[];
  total_count: number;
  summary?: any;
  metadata?: any;
}

export default function ChroniCareRiskDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModelModal, setShowModelModal] = useState(false);
  const [filters, setFilters] = useState({
    risk_level: '',
    limit: 50,
    age_min: undefined as number | undefined,
    age_max: undefined as number | undefined,
    gender: undefined as string | undefined
  });

  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Build query parameters
        const params = new URLSearchParams({
          limit: filters.limit.toString()
        });
        
        if (filters.risk_level) params.append('risk_level', filters.risk_level);
        if (filters.age_min) params.append('age_min', filters.age_min.toString());
        if (filters.age_max) params.append('age_max', filters.age_max.toString());
        if (filters.gender) params.append('gender', filters.gender);
        
        // Fetch patients with current filters
        const patientsResponse = await fetch(
          `http://localhost:8000/patients?${params.toString()}`
        );
        
        if (!patientsResponse.ok) {
          throw new Error('Failed to fetch patients');
        }
        
        const patientsData = await patientsResponse.json();
        
        // Fetch summary data
        const summaryResponse = await fetch('http://localhost:8000/summary');
        const summaryData = summaryResponse.ok ? await summaryResponse.json() : null;
        
        setDashboardData({
          ...patientsData,
          summary: summaryData?.summary,
          metadata: summaryData?.metadata
        });
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="mx-auto h-12 w-12 text-blue-600 animate-pulse" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Loading Dashboard...</h2>
          <p className="mt-2 text-gray-600">Fetching patient risk data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-600" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Connection Error</h2>
          <p className="mt-2 text-gray-600">Unable to connect to backend API</p>
          <p className="text-sm text-gray-500 mt-1">Make sure FastAPI server is running on localhost:8000</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:py-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-xl flex items-center justify-center">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Chronic Care Risk Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">AI-Driven Patient Risk Monitoring</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
              <div className="text-left sm:text-right">
                <p className="text-xs sm:text-sm text-gray-500">Model Performance</p>
                <p className="text-base sm:text-lg font-semibold text-emerald-600">
                  AUROC: {dashboardData.metadata?.model_auroc?.toFixed(3) || '0.969'}
                </p>
              </div>
              <RainbowButton
                onClick={() => setShowModelModal(true)}
                className="flex items-center gap-2 justify-center sm:justify-start w-full sm:w-auto text-xs sm:text-sm px-4 sm:px-6 py-2 h-8 sm:h-10"
              >
                <Brain className="w-3 h-3 sm:w-4 sm:h-4" />
                How Model Works
              </RainbowButton>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">

        {/* Summary Cards */}
        {dashboardData.summary && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-center">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                <div className="ml-2 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Total Patients</p>
                  <p className="text-lg sm:text-2xl font-semibold text-gray-900">
                    {dashboardData.summary.risk_distribution ? 
                      Object.values(dashboardData.summary.risk_distribution).reduce((sum: number, item: any) => sum + item.count, 0).toLocaleString() : 
                      '0'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
                <div className="ml-2 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Critical Risk</p>
                  <p className="text-lg sm:text-2xl font-semibold text-gray-900">
                    {dashboardData.summary.critical_risk_alerts?.toLocaleString() || '0'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-center">
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                <div className="ml-2 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Avg Risk Score</p>
                  <p className="text-lg sm:text-2xl font-semibold text-gray-900">
                    {dashboardData.summary.average_risk_score?.toFixed(1) || '0'}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-center">
                <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                <div className="ml-2 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Model Accuracy</p>
                  <p className="text-lg sm:text-2xl font-semibold text-gray-900">
                    {dashboardData.metadata?.model_auroc ? `${(dashboardData.metadata.model_auroc * 100).toFixed(1)}%` : '96.9%'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Risk Distribution Chart */}
        {dashboardData.summary && (
          <div className="mt-8 mb-8">
            <RiskDistributionChart data={dashboardData.summary.risk_distribution} />
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center space-x-3">
              <label className="text-sm font-semibold text-gray-900 min-w-fit">Risk Level:</label>
              <select
                value={filters.risk_level}
                onChange={(e) => setFilters(prev => ({ ...prev, risk_level: e.target.value }))}
                className="border border-gray-300 rounded-md px-4 py-2 pr-10 text-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[140px] appearance-none"
                style={{ color: 'black', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6,9 12,15 18,9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
              >
                <option value="" style={{ color: 'black' }}>All Risk Levels</option>
                <option value="Critical Risk" style={{ color: 'black' }}>Critical Risk</option>
                <option value="High Risk" style={{ color: 'black' }}>High Risk</option>
                <option value="Medium Risk" style={{ color: 'black' }}>Medium Risk</option>
                <option value="Low Risk" style={{ color: 'black' }}>Low Risk</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-3">
              <label className="text-sm font-semibold text-gray-900 min-w-fit">Per Page:</label>
              <select
                value={filters.limit}
                onChange={(e) => setFilters(prev => ({ ...prev, limit: parseInt(e.target.value) }))}
                className="border border-gray-300 rounded-md px-4 py-2 pr-10 text-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[80px] appearance-none"
                style={{ color: 'black', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6,9 12,15 18,9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
              >
                <option value={25} style={{ color: 'black' }}>25</option>
                <option value={50} style={{ color: 'black' }}>50</option>
                <option value={100} style={{ color: 'black' }}>100</option>
                <option value={200} style={{ color: 'black' }}>200</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <label className="text-sm font-semibold text-gray-900 min-w-fit">Age:</label>
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '') {
                    setFilters(prev => ({ ...prev, age_min: undefined, age_max: undefined }));
                  } else if (value === '18-50') {
                    setFilters(prev => ({ ...prev, age_min: 18, age_max: 50 }));
                  } else if (value === '51-70') {
                    setFilters(prev => ({ ...prev, age_min: 51, age_max: 70 }));
                  } else if (value === '71+') {
                    setFilters(prev => ({ ...prev, age_min: 71, age_max: undefined }));
                  }
                }}
                className="border border-gray-300 rounded-md px-4 py-2 pr-10 text-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[100px] appearance-none"
                style={{ color: 'black', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6,9 12,15 18,9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
              >
                <option value="" style={{ color: 'black' }}>All Ages</option>
                <option value="18-50" style={{ color: 'black' }}>18-50</option>
                <option value="51-70" style={{ color: 'black' }}>51-70</option>
                <option value="71+" style={{ color: 'black' }}>71+</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <label className="text-sm font-semibold text-gray-900 min-w-fit">Gender:</label>
              <select
                value={filters.gender}
                onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}
                className="border border-gray-300 rounded-md px-4 py-2 pr-10 text-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[100px] appearance-none"
                style={{ color: 'black', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6,9 12,15 18,9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
              >
                <option value="" style={{ color: 'black' }}>All</option>
                <option value="Male" style={{ color: 'black' }}>Male</option>
                <option value="Female" style={{ color: 'black' }}>Female</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Patient Table */}
        <div className="mt-8 mb-12">
          <PatientTable 
            patients={dashboardData?.patients || []}
            totalCount={dashboardData?.total_count || 0}
          />
        </div>
      </main>

      {/* Model Visualization Modal */}
      <ModelVisualizationModal 
        isOpen={showModelModal} 
        onClose={() => setShowModelModal(false)} 
      />
    </div>
  );
}
