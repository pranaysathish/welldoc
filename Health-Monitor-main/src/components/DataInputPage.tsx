import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Upload, Watch, FileText, ArrowRight, SkipForward } from 'lucide-react';
import { motion } from 'motion/react';

interface DataInputPageProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function DataInputPage({ onComplete, onSkip }: DataInputPageProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionToggle = (option: string) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const handleContinue = () => {
    // Here you would process the selected data import options
    console.log('Selected import options:', selectedOptions);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="pt-16 pb-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-left text-2xl font-semibold text-gray-800 mb-3">
              Import Your Health Data
            </h1>
            <p className="text-left text-gray-600">
              Connect your health data sources to get personalized insights and tracking.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 max-w-md mx-auto w-full">
        <div className="space-y-6">
          {/* CSV Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card 
              className={`border-0 shadow-lg shadow-gray-200/30 cursor-pointer transition-all duration-200 ${
                selectedOptions.includes('csv') ? 'ring-2 ring-blue-300' : ''
              }`}
              style={{ backgroundColor: '#E8F4F8' }}
              onClick={() => handleOptionToggle('csv')}
            >
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-white/40 flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Upload Lab Reports</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Import your lab results from CSV files for comprehensive health analysis
                  </p>
                  
                  {selectedOptions.includes('csv') ? (
                    <div className="border-2 border-dashed border-blue-300 rounded-xl p-4 mb-4 bg-blue-50">
                      <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm text-blue-600">
                        Drop CSV files here or click to browse
                      </p>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 mb-4">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        Click to enable CSV upload
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Watch Connection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card 
              className={`border-0 shadow-lg shadow-gray-200/30 cursor-pointer transition-all duration-200 ${
                selectedOptions.includes('watch') ? 'ring-2 ring-pink-300' : ''
              }`}
              style={{ backgroundColor: '#F9E8E8' }}
              onClick={() => handleOptionToggle('watch')}
            >
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Watch className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Connect Wearable</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Sync data from your smartwatch or fitness tracker automatically
                  </p>
                  
                  {selectedOptions.includes('watch') && (
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                        <span className="text-sm text-gray-700">Apple Watch</span>
                        <Button size="sm" variant="outline" className="rounded-lg">
                          Connect
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                        <span className="text-sm text-gray-700">Fitbit</span>
                        <Button size="sm" variant="outline" className="rounded-lg">
                          Connect
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                        <span className="text-sm text-gray-700">Samsung Galaxy</span>
                        <Button size="sm" variant="outline" className="rounded-lg">
                          Connect
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Manual Entry Option */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card 
              className={`border-0 shadow-lg shadow-gray-200/30 cursor-pointer transition-all duration-200 ${
                selectedOptions.includes('manual') ? 'ring-2 ring-green-300' : ''
              }`}
              style={{ backgroundColor: '#F0F9F0' }}
              onClick={() => handleOptionToggle('manual')}
            >
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-white/40 flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Manual Entry</h3>
                  <p className="text-sm text-gray-600">
                    Enter your health data manually for complete control over your information
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            onClick={handleContinue}
            className="w-full rounded-xl text-white h-12 flex items-center justify-center"
            style={{ backgroundColor: '#A8C8E1' }}
            disabled={selectedOptions.length === 0}
          >
            Continue to Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          <Button 
            onClick={onSkip}
            variant="ghost"
            className="w-full rounded-xl h-12 text-gray-600 hover:bg-gray-100"
          >
            <SkipForward className="w-4 h-4 mr-2" />
            Skip for Now
          </Button>
        </motion.div>
        
        <p className="text-xs text-gray-500 text-center">
          You can always add data sources later from your profile settings
        </p>
      </div>
    </div>
  );
}