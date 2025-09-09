import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Check, Smartphone, Watch, Activity, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface DeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const devices = [
  {
    id: 'fitbit',
    name: 'Fitbit',
    icon: '🏃‍♂️',
    color: 'from-green-500 to-emerald-500',
    description: 'Track steps, heart rate, and sleep',
    connected: false
  },
  {
    id: 'apple',
    name: 'Apple HealthKit',
    icon: '🍎',
    color: 'from-gray-600 to-gray-800',
    description: 'Comprehensive health data integration',
    connected: true
  },
  {
    id: 'googlefit',
    name: 'Google Fit',
    icon: '💪',
    color: 'from-blue-500 to-cyan-500',
    description: 'Activity tracking and wellness insights',
    connected: false
  },
  {
    id: 'garmin',
    name: 'Garmin',
    icon: '⌚',
    color: 'from-blue-600 to-indigo-600',
    description: 'Advanced fitness and health monitoring',
    connected: false
  },
  {
    id: 'samsung',
    name: 'Samsung Health',
    icon: '📱',
    color: 'from-purple-500 to-pink-500',
    description: 'Holistic health and fitness tracking',
    connected: false
  },
  {
    id: 'whoop',
    name: 'WHOOP',
    icon: '🔴',
    color: 'from-red-500 to-orange-500',
    description: 'Recovery, strain, and sleep optimization',
    connected: false
  }
];

export function DeviceModal({ isOpen, onClose }: DeviceModalProps) {
  const [connectingDevices, setConnectingDevices] = useState<Set<string>>(new Set());
  const [connectedDevices, setConnectedDevices] = useState<Set<string>>(
    new Set(devices.filter(d => d.connected).map(d => d.id))
  );

  const handleConnect = async (deviceId: string) => {
    setConnectingDevices(prev => new Set(prev).add(deviceId));
    
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setConnectingDevices(prev => {
      const newSet = new Set(prev);
      newSet.delete(deviceId);
      return newSet;
    });
    
    setConnectedDevices(prev => new Set(prev).add(deviceId));
  };

  const handleDisconnect = (deviceId: string) => {
    setConnectedDevices(prev => {
      const newSet = new Set(prev);
      newSet.delete(deviceId);
      return newSet;
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto backdrop-blur-xl bg-white/90 border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Connect Your Devices
          </DialogTitle>
          <p className="text-slate-600">
            Connect your wearable devices and health apps to get comprehensive insights into your health data.
          </p>
        </DialogHeader>

        {/* Hero Image */}
        <div className="relative mb-6 rounded-2xl overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1638947604157-d259d219eeee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxob2xvZ3JhcGhpYyUyMG1lZGljYWwlMjBpbnRlcmZhY2UlMjBmdXR1cmlzdGljfGVufDF8fHx8MTc1NzI2NzE2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Futuristic Health Interface"
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white text-center"
            >
              <Activity className="w-8 h-8 mx-auto mb-2" />
              <p className="font-medium">Sync Your Health Ecosystem</p>
            </motion.div>
          </div>
        </div>

        {/* Connected Devices Summary */}
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50/50 to-emerald-50/50 rounded-xl border border-green-200/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-green-800">
                  {connectedDevices.size} Device{connectedDevices.size !== 1 ? 's' : ''} Connected
                </p>
                <p className="text-sm text-green-600">
                  Your health data will be synced automatically
                </p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700">
              <Zap className="w-3 h-3 mr-1" />
              Auto-sync enabled
            </Badge>
          </div>
        </div>

        {/* Device Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.map((device, index) => {
            const isConnecting = connectingDevices.has(device.id);
            const isConnected = connectedDevices.has(device.id);

            return (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full transition-all duration-300 hover:shadow-lg ${
                  isConnected 
                    ? 'bg-gradient-to-br from-green-50/70 to-emerald-50/70 border-green-200/50' 
                    : 'backdrop-blur-sm bg-white/70 border-white/30 hover:bg-white/80'
                }`}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${device.color} flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl">{device.icon}</span>
                    </div>
                    
                    <h3 className="font-bold text-slate-800 mb-2">{device.name}</h3>
                    <p className="text-sm text-slate-600 mb-4">{device.description}</p>
                    
                    {isConnected ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center space-x-2 p-2 bg-green-100/50 rounded-lg">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-700">Connected</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDisconnect(device.id)}
                          className="w-full bg-white/50 border-green-200/50 text-green-700 hover:bg-green-50/50"
                        >
                          Disconnect
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleConnect(device.id)}
                        disabled={isConnecting}
                        className={`w-full ${
                          isConnecting 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : `bg-gradient-to-r ${device.color} hover:shadow-lg text-white`
                        }`}
                      >
                        {isConnecting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                        ) : (
                          <Smartphone className="w-4 h-4 mr-2" />
                        )}
                        {isConnecting ? 'Connecting...' : 'Connect'}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-6 p-4 bg-blue-50/50 rounded-xl border border-blue-200/30">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Watch className="w-3 h-3 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-1">Data Privacy & Security</h4>
              <p className="text-sm text-blue-700">
                Your health data is encrypted and securely stored. We only access data necessary for health insights 
                and never share your information with third parties without your explicit consent.
              </p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-4">
          <Button 
            onClick={onClose}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}