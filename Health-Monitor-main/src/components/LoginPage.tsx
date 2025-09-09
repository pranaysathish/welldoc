import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Heart, Activity, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simple validation - in real app would connect to backend
    if (email && password) {
      onLogin();
    }
  };

  const features = [
    {
      icon: Heart,
      title: 'Heart Health',
      description: 'Track your cardiovascular wellness',
      color: '#E8F4F8'
    },
    {
      icon: Activity,
      title: 'Live Monitoring',
      description: 'Real-time health insights',
      color: '#F0F9F0'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'See your health journey',
      color: '#FEF7E8'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Welcome Section - Top */}
      <div className="pt-12 pb-6 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Welcome to HealthTracker
            </h2>
            <p className="text-gray-600 mb-6">
              Your personal health companion for monitoring, tracking, and improving your wellness journey.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Login Form - Narrower and centered */}
      <div className="px-6 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="max-w-xs mx-auto">
            <Card className="bg-white border-0 shadow-lg shadow-gray-200/30" style={{ backgroundColor: '#FEFEFE' }}>
              <CardContent className="p-6">
                <h1 className="text-left text-lg font-semibold text-gray-800 mb-6">
                  Sign In
                </h1>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full rounded-xl border-gray-200 bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-xl border-gray-200 bg-gray-50"
                    />
                  </div>
                  <Button 
                    onClick={handleLogin}
                    className="w-full rounded-xl text-white h-12"
                    style={{ backgroundColor: '#A8C8E1' }}
                  >
                    Sign In
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Features Cards - Middle */}
      <div className="flex-1 px-6 max-w-md mx-auto w-full">
        <div className="grid grid-cols-1 gap-4 mb-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                <Card className="border-0 shadow-lg shadow-gray-200/30" style={{ backgroundColor: feature.color }}>
                  <CardContent className="p-5">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-white/40 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center">
        <p className="text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}