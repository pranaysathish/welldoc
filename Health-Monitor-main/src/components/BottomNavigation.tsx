import { Home, BarChart3, Calendar, User } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'analysis', label: 'Analysis', icon: BarChart3 },
    { id: 'hospitals', label: 'Hospitals', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-gray-100" style={{ backgroundColor: '#D4F8D4' }}>
      <div className="bg-white/80 backdrop-blur-lg border-t border-gray-200/50 px-4 py-2">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
                  isActive ? 'text-gray-700' : 'text-gray-400'
                }`}
                whileTap={{ scale: 0.95 }}
                animate={isActive ? { y: -2 } : { y: 0 }}
              >
                <div className={`p-2 rounded-full transition-all duration-200 ${
                  isActive 
                    ? 'shadow-lg shadow-gray-200/50' 
                    : 'bg-transparent'
                }`}
                style={isActive ? { backgroundColor: '#E8F4F8' } : {}}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-xs mt-1 font-medium">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}