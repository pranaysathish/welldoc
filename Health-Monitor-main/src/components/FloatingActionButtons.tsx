import { Plus, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface FloatingActionButtonsProps {
  onOpenManualLog: () => void;
  onOpenAICoach: () => void;
}

export function FloatingActionButtons({ onOpenManualLog, onOpenAICoach }: FloatingActionButtonsProps) {
  return (
    <div className="fixed bottom-24 left-0 right-0 z-40 pointer-events-none">
      <div className="flex justify-between items-end px-6 max-w-md mx-auto">
        {/* AI Coach Button - Left */}
        <motion.button
          onClick={onOpenAICoach}
          className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center pointer-events-auto"
          style={{ backgroundColor: '#B8F2E6' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            boxShadow: [
              '0 10px 25px rgba(232, 244, 248, 0.3)',
              '0 15px 35px rgba(232, 244, 248, 0.4)',
              '0 10px 25px rgba(232, 244, 248, 0.3)'
            ]
          }}
          transition={{ 
            boxShadow: { duration: 2, repeat: Infinity },
            hover: { duration: 0.2 },
            tap: { duration: 0.1 }
          }}
        >
          <MessageCircle className="w-6 h-6 text-gray-700" />
        </motion.button>

        {/* Manual Log Button - Right */}
        <motion.button
          onClick={onOpenManualLog}
          className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center pointer-events-auto"
          style={{ backgroundColor: '#D4F8D4' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            boxShadow: [
              '0 10px 25px rgba(232, 245, 232, 0.3)',
              '0 15px 35px rgba(232, 245, 232, 0.4)',
              '0 10px 25px rgba(232, 245, 232, 0.3)'
            ]
          }}
          transition={{ 
            boxShadow: { duration: 2, repeat: Infinity, delay: 1 },
            hover: { duration: 0.2 },
            tap: { duration: 0.1 }
          }}
        >
          <Plus className="w-8 h-8 text-gray-700" />
        </motion.button>
      </div>
    </div>
  );
}