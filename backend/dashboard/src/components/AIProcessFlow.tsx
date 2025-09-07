'use client';
import React, { useState, useEffect } from 'react';
import { Database, Brain, Target, ChevronRight, Activity, Heart, TrendingUp } from 'lucide-react';

export default function AIProcessFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      id: 'data',
      title: 'EHR Data Collection',
      description: '30-180 days of patient data',
      icon: Database,
      color: 'from-blue-500 to-blue-600',
      details: ['Vitals & Labs', 'Procedures', 'Medications', 'Care Plans']
    },
    {
      id: 'processing',
      title: 'AI Processing',
      description: 'XGBoost Model Analysis',
      icon: Brain,
      color: 'from-purple-500 to-purple-600',
      details: ['Feature Engineering', '57+ Clinical Variables', 'Pattern Recognition', 'Risk Calculation']
    },
    {
      id: 'prediction',
      title: 'Risk Prediction',
      description: '90-day deterioration probability',
      icon: Target,
      color: 'from-red-500 to-red-600',
      details: ['96.93% AUROC', 'SHAP Explanations', 'Clinical Insights', 'Action Recommendations']
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const DataFlowParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 2) * 40}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: '2s'
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-8 shadow-lg relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>
      
      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          AI-Powered Risk Prediction Pipeline
        </h2>
        <p className="text-gray-600">
          Real-time processing of patient data through our advanced machine learning engine
        </p>
      </div>

      {/* Main Flow */}
      <div className="relative">
        <DataFlowParticles />
        
        <div className="flex items-center justify-between relative z-10">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isPast = index < currentStep;
            
            return (
              <div key={step.id} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="relative">
                  <div className={`
                    w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 transform
                    ${isActive ? 'scale-110 shadow-xl' : 'scale-100 shadow-md'}
                    ${isActive ? `bg-gradient-to-br ${step.color}` : 
                      isPast ? 'bg-gradient-to-br from-green-500 to-green-600' : 
                      'bg-white border-2 border-gray-300'}
                  `}>
                    <StepIcon 
                      className={`
                        w-8 h-8 transition-colors duration-300
                        ${isActive || isPast ? 'text-white' : 'text-gray-400'}
                      `} 
                    />
                    
                    {/* Pulse Animation for Active Step */}
                    {isActive && (
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} animate-ping opacity-20`} />
                    )}
                  </div>
                  
                  {/* Step Label */}
                  <div className="mt-4 text-center">
                    <h3 className={`
                      font-semibold transition-colors duration-300
                      ${isActive ? 'text-gray-900' : 'text-gray-600'}
                    `}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="flex-1 flex items-center mx-4">
                    <div className="w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 relative">
                      {isPast && (
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 animate-pulse" />
                      )}
                      {index === currentStep && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" />
                      )}
                    </div>
                    <ChevronRight className={`
                      w-5 h-5 ml-2 transition-colors duration-300
                      ${isPast ? 'text-green-500' : 
                        index === currentStep ? 'text-blue-500' : 'text-gray-400'}
                    `} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Active Step Details */}
        <div className="mt-12 bg-white rounded-lg p-6 shadow-md border relative z-10">
          <div className={`
            transition-all duration-500 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}
          `}>
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              {React.createElement(steps[currentStep].icon, { className: 'w-5 h-5 mr-2' })}
              {steps[currentStep].title} Details
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {steps[currentStep].details.map((detail, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${steps[currentStep].color} mr-2`} />
                  <span className="text-sm text-gray-700">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-6 grid grid-cols-3 gap-4 relative z-10">
          <div className="bg-white rounded-lg p-4 shadow-sm border text-center">
            <Activity className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">96.93%</div>
            <div className="text-sm text-gray-600">AUROC</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border text-center">
            <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">61,445</div>
            <div className="text-sm text-gray-600">Patients</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border text-center">
            <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">15K+</div>
            <div className="text-sm text-gray-600">High Risk</div>
          </div>
        </div>
      </div>
    </div>
  );
}
