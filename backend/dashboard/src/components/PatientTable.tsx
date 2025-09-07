import React, { useState, useEffect } from 'react';
import { Eye, Brain, AlertTriangle, Heart, TrendingUp, Activity, Calendar, User, ChevronRight } from 'lucide-react';

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

interface PatientTableProps {
  patients: Patient[];
  totalCount: number;
}

export default function PatientTable({ patients, totalCount }: PatientTableProps) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (selectedPatient) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPatient]);

  const getRiskBadge = (patient: Patient) => {
    const colorClasses = {
      green: 'bg-green-100 text-green-800',
      yellow: 'bg-yellow-100 text-yellow-800', 
      orange: 'bg-orange-100 text-orange-800',
      red: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        colorClasses[patient.color as keyof typeof colorClasses] || 'bg-gray-100 text-gray-800'
      }`}>
        {patient.level}
      </span>
    );
  };

  const getAllConditions = (conditions: Patient['conditions']) => {
    const activeConditions = [];
    if (conditions.diabetes) activeConditions.push('Diabetes');
    if (conditions.hypertension) activeConditions.push('Hypertension');
    if (conditions.heart_disease) activeConditions.push('Heart Disease');
    if (conditions.kidney_disease) activeConditions.push('Kidney Disease');
    if (conditions.stroke) activeConditions.push('Stroke');
    if (conditions.copd) activeConditions.push('COPD');
    
    // Add other conditions if they exist
    if (conditions.other_conditions && conditions.other_conditions.length > 0) {
      conditions.other_conditions.forEach(condition => {
        // Capitalize first letter and clean up the condition name
        const cleanCondition = condition.charAt(0).toUpperCase() + condition.slice(1).toLowerCase();
        activeConditions.push(cleanCondition);
      });
    }
    
    return activeConditions;
  };

  const getConditionsBadges = (conditions: Patient['conditions'], showAll = false) => {
    const activeConditions = getAllConditions(conditions);
    const displayConditions = showAll ? activeConditions : activeConditions.slice(0, 2);
    
    return displayConditions.map((condition, index) => (
      <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800 mr-1 mb-1">
        {condition}
      </span>
    ));
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Patient Risk Overview</h3>
        <p className="text-sm text-gray-600">
          Showing {patients.length} of {totalCount.toLocaleString()} patients, sorted by risk level
        </p>
      </div>
      
      {/* Mobile Card View */}
      <div className="block sm:hidden">
        <div className="divide-y divide-gray-200">
          {patients.map((patient) => (
            <div 
              key={patient.patient_id}
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => setSelectedPatient(patient)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8">
                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      {patient.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {patient.age}y • {patient.gender}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    {patient.risk_percentage}%
                  </div>
                  {getRiskBadge(patient)}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {getConditionsBadges(patient.conditions)}
                  {patient.conditions.total_conditions > 2 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800">
                      +{patient.conditions.total_conditions - 2} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {patient.last_encounter || 'No recent visits'}
                  </div>
                  <div className="flex items-center text-blue-600">
                    View Details
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Risk Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age/Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Conditions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Encounter
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">View Details</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr 
                key={patient.patient_id} 
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setSelectedPatient(patient)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {patient.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {patient.patient_id}
                      </div>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-lg font-semibold text-gray-900">
                      {patient.risk_percentage}%
                    </div>
                    <div className="ml-2">
                      {getRiskBadge(patient)}
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <span className="font-medium">{patient.age}y</span>
                    <span className="ml-2 text-gray-500 capitalize">{patient.gender}</span>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap">
                    {getConditionsBadges(patient.conditions)}
                    {patient.conditions.total_conditions > 2 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800">
                        +{patient.conditions.total_conditions - 2} more
                      </span>
                    )}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {patient.last_encounter || 'No recent visits'}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 flex items-center">
                    View Details
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-slideUp">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Patient Details: {selectedPatient.name}
              </h3>
              <button 
                onClick={() => setSelectedPatient(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-light transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Basic Info */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Patient Overview</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Risk Score:</span>
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-gray-900">{selectedPatient.risk_percentage}%</span>
                          <div className="ml-2">{getRiskBadge(selectedPatient)}</div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Age:</span>
                        <span className="text-sm text-black font-medium">{selectedPatient.age} years old</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Gender:</span>
                        <span className="text-sm font-medium text-black capitalize">{selectedPatient.gender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Patient ID:</span>
                        <span className="text-sm text-gray-500">{selectedPatient.patient_id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Last Visit:</span>
                        <span className="text-sm text-gray-500">{selectedPatient.last_encounter || 'No recent visits'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Active Conditions</h4>
                    <div className="flex flex-wrap gap-2">
                      {getConditionsBadges(selectedPatient.conditions, true)}
                      {getAllConditions(selectedPatient.conditions).length === 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800">
                          No chronic conditions recorded
                        </span>
                      )}
                    </div>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800">
                        Total: {selectedPatient.conditions.total_conditions} conditions
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column - Clinical Details */}
                <div className="space-y-4">
                  {/* AI Risk Analysis */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-md font-semibold text-blue-900 mb-3 flex items-center">
                      <Brain className="w-4 h-4 mr-2" />
                      AI Risk Analysis
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg border p-3">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Clinical Reasoning</h5>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {selectedPatient.risk_percentage > 80 ? 
                            "High-risk profile with multiple chronic comorbidities. Requires immediate attention and proactive management." :
                            selectedPatient.risk_percentage > 50 ?
                            "Moderate risk driven by chronic conditions. Regular monitoring recommended." :
                            "Lower risk profile. Routine preventive care and lifestyle modifications important."
                          }
                        </p>
                      </div>

                      <div className="bg-white rounded-lg border p-3">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Risk Factors</h5>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <span className="text-xs text-gray-600 w-16">Baseline:</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-1.5 mx-2">
                              <div className="bg-gray-400 h-1.5 rounded-full" style={{width: '15%'}}></div>
                            </div>
                            <span className="text-xs text-gray-600">15%</span>
                          </div>
                          
                          {selectedPatient.conditions.diabetes === 1 && (
                            <div className="flex items-center">
                              <span className="text-xs text-red-600 w-16">Diabetes:</span>
                              <div className="flex-1 bg-red-100 rounded-full h-1.5 mx-2">
                                <div className="bg-red-500 h-1.5 rounded-full" style={{width: '70%'}}></div>
                              </div>
                              <span className="text-xs text-red-600">+25%</span>
                            </div>
                          )}
                          
                          {selectedPatient.conditions.heart_disease === 1 && (
                            <div className="flex items-center">
                              <span className="text-xs text-red-600 w-16">Heart:</span>
                              <div className="flex-1 bg-red-100 rounded-full h-1.5 mx-2">
                                <div className="bg-red-500 h-1.5 rounded-full" style={{width: '60%'}}></div>
                              </div>
                              <span className="text-xs text-red-600">+20%</span>
                            </div>
                          )}
                          
                          <div className="border-t pt-2 mt-2">
                            <div className="flex items-center font-semibold">
                              <span className="text-xs text-gray-700 w-16">Final:</span>
                              <div className="flex-1 bg-blue-100 rounded-full h-2 mx-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                  style={{width: `${Math.min(selectedPatient.risk_percentage, 100)}%`}}
                                ></div>
                              </div>
                              <span className="text-xs text-blue-600 font-bold">{selectedPatient.risk_percentage}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clinical Action Plan */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="text-md font-semibold text-amber-900 mb-3 flex items-center">
                      <Activity className="w-4 h-4 mr-2" />
                      Action Plan
                    </h4>
                    
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                          <AlertTriangle className="w-3 h-3 mr-1 text-red-500" />
                          Immediate Actions
                        </h5>
                        <ul className="text-xs text-gray-700 space-y-1 ml-4">
                          {selectedPatient.priority >= 4 ? (
                            <>
                              <li>• Schedule immediate clinical evaluation</li>
                              <li>• Consider emergency referral if needed</li>
                              <li>• Review all medications</li>
                            </>
                          ) : selectedPatient.priority >= 3 ? (
                            <>
                              <li>• Schedule urgent follow-up within 48 hours</li>
                              <li>• Conduct vital signs assessment</li>
                              <li>• Order necessary lab work</li>
                            </>
                          ) : (
                            <>
                              <li>• Contact patient within 1-2 weeks</li>
                              <li>• Schedule routine monitoring</li>
                              <li>• Reinforce medication adherence</li>
                            </>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                          <Heart className="w-3 h-3 mr-1 text-blue-500" />
                          Care Plan
                        </h5>
                        <ul className="text-xs text-gray-700 space-y-1 ml-4">
                          {selectedPatient.conditions.diabetes === 1 && (
                            <li>• Diabetes management - A1C target &lt;7%</li>
                          )}
                          {selectedPatient.conditions.hypertension === 1 && (
                            <li>• BP optimization - target &lt;130/80</li>
                          )}
                          <li>• Lifestyle modification support</li>
                          <li>• Regular follow-up scheduling</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end border-t border-gray-200 pt-4">
                <button 
                  onClick={() => setSelectedPatient(null)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
