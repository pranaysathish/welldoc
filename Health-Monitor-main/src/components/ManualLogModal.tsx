import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { 
  Heart, 
  Droplet, 
  Footprints, 
  Moon, 
  Activity, 
  TestTube, 
  Scale,
  Thermometer,
  Plus,
  Save
} from 'lucide-react';
import { motion } from 'motion/react';

interface ManualLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ManualLogModal({ isOpen, onClose }: ManualLogModalProps) {
  const [activeCategory, setActiveCategory] = useState('vitals');
  const [formData, setFormData] = useState({
    heartRate: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    spo2: '',
    temperature: '',
    weight: '',
    glucose: '',
    steps: '',
    calories: '',
    distance: '',
    sleep: '',
    mood: 5,
    energy: 5,
    stress: 3
  });

  const categories = [
    { id: 'vitals', name: 'Vitals', icon: Heart },
    { id: 'activity', name: 'Activity', icon: Activity },
    { id: 'wellness', name: 'Wellness', icon: Moon }
  ];

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log('Saving manual log data:', formData);
    onClose();
  };

  const vitalFields = [
    {
      key: 'heartRate',
      label: 'Heart Rate',
      unit: 'bpm',
      icon: Heart,
      color: 'from-red-400 to-pink-500',
      placeholder: '72'
    },
    {
      key: 'spo2',
      label: 'Blood Oxygen (SpO2)',
      unit: '%',
      icon: Droplet,
      color: 'from-blue-400 to-cyan-500',
      placeholder: '98'
    },
    {
      key: 'temperature',
      label: 'Body Temperature',
      unit: '°F',
      icon: Thermometer,
      color: 'from-orange-400 to-amber-500',
      placeholder: '98.6'
    },
    {
      key: 'glucose',
      label: 'Blood Glucose',
      unit: 'mg/dL',
      icon: TestTube,
      color: 'from-teal-400 to-cyan-500',
      placeholder: '95'
    }
  ];

  const activityFields = [
    {
      key: 'steps',
      label: 'Steps',
      unit: 'steps',
      icon: Footprints,
      color: 'from-green-400 to-emerald-500',
      placeholder: '8000'
    },
    {
      key: 'calories',
      label: 'Calories Burned',
      unit: 'cal',
      icon: Activity,
      color: 'from-orange-400 to-red-500',
      placeholder: '420'
    },
    {
      key: 'distance',
      label: 'Distance',
      unit: 'miles',
      icon: Footprints,
      color: 'from-purple-400 to-violet-500',
      placeholder: '3.2'
    },
    {
      key: 'weight',
      label: 'Weight',
      unit: 'lbs',
      icon: Scale,
      color: 'from-indigo-400 to-blue-500',
      placeholder: '160'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto bg-white/95 backdrop-blur-lg border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">Manual Health Log</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Log your health data manually by entering vitals, activity, and wellness information.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100/50 rounded-2xl p-1 mb-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id} 
                  className="rounded-xl flex items-center space-x-1"
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm">{category.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value="vitals" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {vitalFields.map((field, index) => {
                const IconComponent = field.icon;
                return (
                  <motion.div
                    key={field.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`bg-gradient-to-r ${field.color.replace('400', '50').replace('500', '50')} border-0 shadow-sm`} style={{ backgroundColor: '#B8F2E6' }}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${field.color} flex items-center justify-center`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <Label className="text-sm font-medium text-gray-800">{field.label}</Label>
                            <p className="text-xs text-gray-500">Enter current {field.label.toLowerCase()}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            value={formData[field.key as keyof typeof formData]}
                            onChange={(e) => handleInputChange(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            className="flex-1 bg-white/70 border-white/50 rounded-xl"
                          />
                          <Badge className="bg-white/70 text-gray-600">
                            {field.unit}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}

              {/* Blood Pressure */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-0 shadow-sm" style={{ backgroundColor: '#FFF2CC' }}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <Label className="text-sm font-medium text-gray-800">Blood Pressure</Label>
                        <p className="text-xs text-gray-500">Systolic / Diastolic</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 items-center">
                      <Input
                        type="number"
                        value={formData.bloodPressureSystolic}
                        onChange={(e) => handleInputChange('bloodPressureSystolic', e.target.value)}
                        placeholder="120"
                        className="bg-white/70 border-white/50 rounded-xl"
                      />
                      <div className="text-center text-gray-400 font-bold">/</div>
                      <Input
                        type="number"
                        value={formData.bloodPressureDiastolic}
                        onChange={(e) => handleInputChange('bloodPressureDiastolic', e.target.value)}
                        placeholder="80"
                        className="bg-white/70 border-white/50 rounded-xl"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {activityFields.map((field, index) => {
                const IconComponent = field.icon;
                return (
                  <motion.div
                    key={field.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`bg-gradient-to-r ${field.color.replace('400', '50').replace('500', '50')} border-0 shadow-sm`} style={{ backgroundColor: '#FFE4E1' }}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${field.color} flex items-center justify-center`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <Label className="text-sm font-medium text-gray-800">{field.label}</Label>
                            <p className="text-xs text-gray-500">Today's {field.label.toLowerCase()}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            value={formData[field.key as keyof typeof formData]}
                            onChange={(e) => handleInputChange(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            className="flex-1 bg-white/70 border-white/50 rounded-xl"
                          />
                          <Badge className="bg-white/70 text-gray-600">
                            {field.unit}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}

              {/* Sleep Hours */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-0 shadow-sm" style={{ backgroundColor: '#D4F8D4' }}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center">
                        <Moon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <Label className="text-sm font-medium text-gray-800">Sleep Duration</Label>
                        <p className="text-xs text-gray-500">Hours of sleep last night</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        step="0.5"
                        value={formData.sleep}
                        onChange={(e) => handleInputChange('sleep', e.target.value)}
                        placeholder="7.5"
                        className="flex-1 bg-white/70 border-white/50 rounded-xl"
                      />
                      <Badge className="bg-white/70 text-gray-600">
                        hours
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="wellness" className="space-y-4">
            {/* Mood Slider */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-0 shadow-sm" style={{ backgroundColor: '#E6E6FA' }}>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-800">Mood Level</Label>
                      <Badge className="bg-white/70 text-gray-600">
                        {formData.mood}/10
                      </Badge>
                    </div>
                    <Slider
                      value={[formData.mood]}
                      onValueChange={(value) => handleInputChange('mood', value[0])}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>😞 Poor</span>
                      <span>😊 Excellent</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Energy Slider */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-0 shadow-sm" style={{ backgroundColor: '#B8F2E6' }}>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-800">Energy Level</Label>
                      <Badge className="bg-white/70 text-gray-600">
                        {formData.energy}/10
                      </Badge>
                    </div>
                    <Slider
                      value={[formData.energy]}
                      onValueChange={(value) => handleInputChange('energy', value[0])}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>🔋 Low</span>
                      <span>⚡ High</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stress Slider */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-0 shadow-sm" style={{ backgroundColor: '#FFF2CC' }}>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-800">Stress Level</Label>
                      <Badge className="bg-white/70 text-gray-600">
                        {formData.stress}/10
                      </Badge>
                    </div>
                    <Slider
                      value={[formData.stress]}
                      onValueChange={(value) => handleInputChange('stress', value[0])}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>😌 Relaxed</span>
                      <span>😰 Stressed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t border-gray-100">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1 border-gray-200 hover:bg-gray-50 rounded-xl"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Log
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}