'use client';
import React, { useState, useEffect } from 'react';
import { Database, Brain, Target, ChevronRight, Activity, Heart, TrendingUp, X, Sparkles } from 'lucide-react';

interface ModelVisualizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModelVisualizationModal({ isOpen, onClose }: ModelVisualizationModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const steps = [
    {
      id: 'data',
      title: 'EHR Data Collection',
      description: '30-180 days of patient data',
      icon: Database,
      color: 'from-emerald-400 via-blue-500 to-purple-600',
      glowColor: 'shadow-blue-500/25',
      details: ['Vitals & Labs', 'Procedures', 'Medications', 'Care Plans'],
      explanation: 'Our system ingests comprehensive patient data from Electronic Health Records, including vital signs, laboratory results, medication history, and care plans spanning 30-180 days.'
    },
    {
      id: 'processing',
      title: 'AI Processing',
      description: 'XGBoost Model Analysis',
      icon: Brain,
      color: 'from-purple-400 via-pink-500 to-red-500',
      glowColor: 'shadow-purple-500/25',
      details: ['Feature Engineering', '57+ Clinical Variables', 'Pattern Recognition', 'Risk Calculation'],
      explanation: 'Advanced XGBoost machine learning algorithms process 57+ engineered clinical features to identify complex patterns and relationships that indicate patient deterioration risk.'
    },
    {
      id: 'prediction',
      title: 'Risk Prediction',
      description: '90-day deterioration probability',
      icon: Target,
      color: 'from-orange-400 via-red-500 to-pink-600',
      glowColor: 'shadow-red-500/25',
      details: ['96.93% AUROC', 'SHAP Explanations', 'Clinical Insights', 'Action Recommendations'],
      explanation: 'The model generates precise risk probabilities with 96.93% AUROC performance, providing clinically interpretable explanations and actionable recommendations for patient care.'
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentStep((prev) => (prev + 1) % steps.length);
          setIsAnimating(false);
        }, 400);
      }, 4500);

      return () => clearInterval(interval);
    } else {
      const timer = setTimeout(() => setShowModal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-40 blur-sm"
          style={{
            left: `${10 + (i * 8)}%`,
            top: `${15 + ((i % 4) * 20)}%`,
            animationDelay: `${i * 0.3}s`,
            animation: 'float 4s ease-in-out infinite'
          }}
        />
      ))}
      {[...Array(8)].map((_, i) => (
        <Sparkles
          key={`sparkle-${i}`}
          className="absolute w-4 h-4 text-indigo-300 opacity-30"
          style={{
            left: `${20 + (i * 10)}%`,
            top: `${25 + ((i % 3) * 25)}%`,
            animationDelay: `${i * 0.5}s`,
            animation: 'pulse 3s ease-in-out infinite'
          }}
        />
      ))}
    </div>
  );

  const BackgroundGlow = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );

  if (!showModal) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <div 
          className={`relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 transform transition-all duration-500 ease-out ${
            isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'
          }`}
          style={{
            width: '90vw',
            maxWidth: '1000px',
            height: 'auto',
            maxHeight: '85vh'
          }}
          onClick={(e) => e.stopPropagation()}
        >
        {/* Background Effects */}
        <BackgroundGlow />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-white/30 transition-all duration-300 group"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Header */}
        <div className="relative p-6 pb-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 mb-3 shadow-lg shadow-blue-500/25">
              <Brain className="w-6 h-6 text-white animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
              How Our AI Model Works
            </h2>
            <p className="text-gray-600 text-sm max-w-xl mx-auto">
              Advanced machine learning pipeline for chronic care risk prediction
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-6">
          <div className="relative">
            <FloatingParticles />
            
            {/* Pipeline Flow */}
            <div className="relative z-10">
              
              {/* Step Indicators */}
              <div className="flex items-center justify-center mb-6 py-8">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = index === currentStep;
                  const isPast = index < currentStep;
                  
                  return (
                    <React.Fragment key={step.id}>
                      <div className="flex flex-col items-center py-3">
                        <div className={`
                          relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 transform border-2
                          ${isActive ? 
                            `scale-110 bg-gradient-to-br ${step.color} border-white shadow-xl ${step.glowColor}` : 
                            isPast ? 
                            'scale-100 bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-300 shadow-lg shadow-emerald-500/20' : 
                            'scale-90 bg-white/50 border-gray-200 shadow-md'
                          }
                        `}>
                          <StepIcon 
                            className={`
                              w-6 h-6 transition-all duration-300
                              ${isActive || isPast ? 'text-white drop-shadow-sm' : 'text-gray-400'}
                              ${isActive ? 'animate-pulse' : ''}
                            `} 
                          />
                          
                          {/* Pulse Rings */}
                          {isActive && (
                            <>
                              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${step.color} animate-ping opacity-20`} />
                              <div className={`absolute -inset-1 rounded-xl bg-gradient-to-br ${step.color} animate-pulse opacity-10`} />
                            </>
                          )}
                        </div>
                        
                        <div className="mt-3 text-center max-w-28">
                          <h3 className={`text-xs font-bold transition-colors duration-300 ${
                            isActive ? 'text-gray-900' : 'text-gray-600'
                          }`}>
                            {step.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1 leading-tight">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Animated Arrow */}
                      {index < steps.length - 1 && (
                        <div className="flex items-center mx-8 mb-6">
                          <div className="relative w-16 h-0.5 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 overflow-hidden">
                            {isPast && (
                              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 animate-pulse" />
                            )}
                            {index === currentStep && (
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-purple-300 opacity-50 animate-ping" />
                              </div>
                            )}
                          </div>
                          <ChevronRight className={`
                            w-4 h-4 ml-2 transition-all duration-300
                            ${isPast ? 'text-emerald-500 animate-bounce' : 
                              index === currentStep ? 'text-purple-500 animate-pulse' : 'text-gray-300'}
                          `} />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Active Step Details */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-lg">
                <div className={`transition-all duration-400 ${
                  isAnimating ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
                }`}>
                  <div className="flex items-center mb-4">
                    {React.createElement(steps[currentStep].icon, { 
                      className: `w-6 h-6 mr-3 bg-gradient-to-r ${steps[currentStep].color} bg-clip-text text-transparent` 
                    })}
                    <h4 className="text-xl font-bold text-gray-900">
                      {steps[currentStep].title}
                    </h4>
                  </div>
                  
                  <p className="text-gray-700 mb-5 text-sm leading-relaxed">
                    {steps[currentStep].explanation}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {steps[currentStep].details.map((detail, index) => (
                      <div key={index} className="flex items-center p-3 bg-white/70 backdrop-blur-sm rounded-lg border border-white/40 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${steps[currentStep].color} mr-2 animate-pulse shadow-sm`} />
                        <span className="text-xs font-medium text-gray-800">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Metrics - Compact */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-gradient-to-br from-blue-50/80 to-indigo-100/80 backdrop-blur-sm rounded-lg p-3 text-center border border-blue-200/50 shadow-sm">
                  <Activity className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-blue-900">96.93%</div>
                  <div className="text-xs text-blue-700 font-medium">Model AUROC</div>
                </div>
                <div className="bg-gradient-to-br from-red-50/80 to-pink-100/80 backdrop-blur-sm rounded-lg p-3 text-center border border-red-200/50 shadow-sm">
                  <Heart className="w-5 h-5 text-red-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-red-900">61,445</div>
                  <div className="text-xs text-red-700 font-medium">Patients Analyzed</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50/80 to-green-100/80 backdrop-blur-sm rounded-lg p-3 text-center border border-emerald-200/50 shadow-sm">
                  <TrendingUp className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-emerald-900">15K+</div>
                  <div className="text-xs text-emerald-700 font-medium">High Risk Identified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
