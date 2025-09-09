import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  User, 
  Settings, 
  FileText, 
  Shield, 
  HelpCircle, 
  LogOut,
  Bell,
  Moon,
  Smartphone,
  Download,
  Share,
  Heart,
  X
} from 'lucide-react';
import { motion } from 'motion/react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const menuItems = [
    {
      id: 'profile',
      label: 'Edit Profile',
      icon: User,
      color: 'from-blue-400 to-cyan-500',
      description: 'Update personal information'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      color: 'from-gray-400 to-gray-500',
      description: 'App preferences and configuration'
    },
    {
      id: 'devices',
      label: 'Connected Devices',
      icon: Smartphone,
      color: 'from-green-400 to-emerald-500',
      description: 'Manage wearables and sensors'
    },
    {
      id: 'notifications',
      label: 'Notification Settings',
      icon: Bell,
      color: 'from-orange-400 to-amber-500',
      description: 'Customize alerts and reminders'
    },
    {
      id: 'privacy',
      label: 'Privacy & Security',
      icon: Shield,
      color: 'from-purple-400 to-violet-500',
      description: 'Data protection and permissions'
    },
    {
      id: 'export',
      label: 'Export Health Data',
      icon: Download,
      color: 'from-teal-400 to-cyan-500',
      description: 'Download your health records'
    },
    {
      id: 'share',
      label: 'Share with Doctor',
      icon: Share,
      color: 'from-pink-400 to-rose-500',
      description: 'Share reports with healthcare providers'
    },
    {
      id: 'reports',
      label: 'Health Reports',
      icon: FileText,
      color: 'from-indigo-400 to-blue-500',
      description: 'View and download reports'
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: HelpCircle,
      color: 'from-yellow-400 to-orange-500',
      description: 'Get help and contact support'
    }
  ];

  const userInfo = {
    name: 'Cavin Smith',
    email: 'cavin.smith@email.com',
    memberSince: 'Member since 2023',
    healthScore: 89,
    avatar: '/user-avatar.jpg'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto bg-white/95 backdrop-blur-lg border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">Menu</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Access your profile settings, health data, and app preferences.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* User Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg shadow-gray-200/50" style={{ backgroundColor: '#B8F2E6' }}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16 border-3 border-white shadow-lg">
                    <AvatarImage src={userInfo.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-lg">
                      {userInfo.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{userInfo.name}</h3>
                    <p className="text-sm text-gray-600">{userInfo.email}</p>
                    <p className="text-xs text-gray-500 mt-1">{userInfo.memberSince}</p>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className="bg-green-100 text-green-700 flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>Health Score: {userInfo.healthScore}%</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Menu Items */}
          <div className="space-y-3">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <Button
                    variant="ghost"
                    className="w-full p-4 h-auto justify-start bg-white/70 hover:bg-gray-50 border border-gray-100 rounded-2xl transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4 w-full">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-gray-800">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                    </div>
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* App Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-0 shadow-lg shadow-gray-200/50">
              <CardContent className="p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">Quick Settings</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center">
                        <Moon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Dark Mode</p>
                        <p className="text-xs text-gray-500">Toggle theme</p>
                      </div>
                    </div>
                    <div className="w-10 h-6 bg-gray-200 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                        <Bell className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Push Notifications</p>
                        <p className="text-xs text-gray-500">Health alerts</p>
                      </div>
                    </div>
                    <div className="w-10 h-6 bg-blue-500 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* App Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-center space-y-2"
          >
            <p className="text-xs text-gray-500">HealthTracker Pro v2.1.0</p>
            <p className="text-xs text-gray-400">Made with ❤️ for your health</p>
          </motion.div>

          {/* Logout Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Button
              variant="outline"
              className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-2xl"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}