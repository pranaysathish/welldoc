import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Trophy, Star, Zap, Gift, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
  xpEarned: number;
  rewards: string[];
}

// Confetti component
const Confetti = ({ delay = 0 }: { delay?: number }) => {
  const colors = ['#14b8a6', '#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];
  
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}
      initial={{ 
        x: Math.random() * 400 - 200,
        y: -20,
        rotate: 0,
        scale: 1
      }}
      animate={{ 
        x: Math.random() * 600 - 300,
        y: 400,
        rotate: 360,
        scale: 0
      }}
      transition={{ 
        duration: 3,
        delay: delay,
        ease: "easeOut"
      }}
    />
  );
};

// Firework component
const Firework = ({ delay = 0 }: { delay?: number }) => {
  return (
    <motion.div
      className="absolute w-1 h-1"
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 20, opacity: 0 }}
      transition={{ duration: 1, delay }}
    >
      <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
    </motion.div>
  );
};

export function LevelUpModal({ isOpen, onClose, newLevel, xpEarned, rewards }: LevelUpModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [playSound, setPlaySound] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      setPlaySound(true);
      
      // Stop confetti after 3 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md backdrop-blur-xl bg-gradient-to-br from-purple-50/90 to-pink-50/90 border-purple-200/30 overflow-hidden">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <Confetti key={i} delay={i * 0.1} />
            ))}
            {[...Array(5)].map((_, i) => (
              <Firework key={i} delay={i * 0.5} />
            ))}
          </div>
        )}

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg"
          animate={{ 
            boxShadow: [
              '0 0 20px rgba(168, 85, 247, 0.4)',
              '0 0 40px rgba(168, 85, 247, 0.6)',
              '0 0 20px rgba(168, 85, 247, 0.4)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <div className="relative z-10 text-center py-8">
          {/* Level Up Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 15,
              delay: 0.2 
            }}
            className="mb-6"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Level Up Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              LEVEL UP!
            </h1>
            <p className="text-lg text-slate-700 mb-4">
              Congratulations! You've reached
            </p>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                delay: 0.8 
              }}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white shadow-lg"
            >
              <Star className="w-6 h-6" />
              <span className="text-2xl font-bold">Level {newLevel}</span>
              <Star className="w-6 h-6" />
            </motion.div>
          </motion.div>

          {/* XP Earned */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="mb-6"
          >
            <Badge className="bg-yellow-100 text-yellow-700 px-4 py-2 text-lg">
              <Zap className="w-5 h-5 mr-2" />
              +{xpEarned} XP Earned
            </Badge>
          </motion.div>

          {/* Rewards */}
          {rewards.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mb-6"
            >
              <h3 className="text-lg font-bold text-slate-700 mb-3 flex items-center justify-center space-x-2">
                <Gift className="w-5 h-5" />
                <span>New Rewards Unlocked!</span>
              </h3>
              
              <div className="space-y-2">
                {rewards.map((reward, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + index * 0.2 }}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-white/70 rounded-lg border border-purple-200/30"
                  >
                    <Award className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-slate-700">{reward}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Achievement Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="mb-8"
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-white/50 rounded-lg border border-white/30">
                <div className="text-2xl font-bold text-teal-600">
                  {Math.floor(newLevel * 127 + 2847)}
                </div>
                <div className="text-xs text-slate-600">Total XP</div>
              </div>
              
              <div className="p-3 bg-white/50 rounded-lg border border-white/30">
                <div className="text-2xl font-bold text-purple-600">{newLevel}</div>
                <div className="text-xs text-slate-600">Level</div>
              </div>
              
              <div className="p-3 bg-white/50 rounded-lg border border-white/30">
                <div className="text-2xl font-bold text-orange-600">
                  {Math.floor(newLevel * 1.5 + 3)}
                </div>
                <div className="text-xs text-slate-600">Achievements</div>
              </div>
            </div>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 }}
          >
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Continue Your Journey
            </Button>
          </motion.div>
        </div>

        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-4 left-4 w-8 h-8 bg-yellow-400/20 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute bottom-4 right-4 w-6 h-6 bg-purple-400/20 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            y: [0, -10, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute top-1/2 right-8 w-4 h-4 bg-pink-400/20 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 10, 0]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </DialogContent>
    </Dialog>
  );
}