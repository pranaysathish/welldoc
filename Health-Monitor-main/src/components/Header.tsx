import { Bell, Menu, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  onOpenNotifications: () => void;
  onOpenMenu: () => void;
}

export function Header({ onOpenNotifications, onOpenMenu }: HeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100" style={{ backgroundColor: '#FFF2CC' }}>
      <div className="px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#B8F2E6' }}>
              <Heart className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <h1 className="text-left text-lg font-bold text-gray-800">HealthTracker</h1>
              <p className="text-left text-xs text-gray-600">Good morning, Cavin!</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={onOpenNotifications}
              className="relative w-10 h-10 rounded-2xl flex items-center justify-center transition-colors"
              style={{ backgroundColor: '#E6E6FA' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5 text-gray-700" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">3</span>
              </div>
            </motion.button>
            
            <motion.button
              onClick={onOpenMenu}
              className="w-10 h-10 rounded-2xl flex items-center justify-center transition-colors"
              style={{ backgroundColor: '#FFE4E1' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}