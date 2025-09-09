import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Target, 
  Trophy, 
  Zap, 
  Calendar, 
  Heart, 
  Activity, 
  Clock, 
  Award,
  Star,
  Flame,
  CheckCircle,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';

interface GoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLevelUp: () => void;
}

const dailyGoals = [
  {
    id: 'steps',
    title: '10,000 Steps',
    description: 'Take 10,000 steps today',
    progress: 8750,
    target: 10000,
    xp: 50,
    icon: Activity,
    color: 'from-green-500 to-emerald-500',
    completed: false
  },
  {
    id: 'heartrate',
    title: 'Heart Rate Zone',
    description: 'Spend 30 minutes in target heart rate zone',
    progress: 25,
    target: 30,
    xp: 40,
    icon: Heart,
    color: 'from-red-500 to-pink-500',
    completed: false
  },
  {
    id: 'sleep',
    title: 'Quality Sleep',
    description: 'Get 8 hours of quality sleep',
    progress: 8,
    target: 8,
    xp: 30,
    icon: Clock,
    color: 'from-purple-500 to-indigo-500',
    completed: true
  }
];

const weeklyGoals = [
  {
    id: 'workout',
    title: 'Weekly Workouts',
    description: 'Complete 5 workout sessions',
    progress: 3,
    target: 5,
    xp: 200,
    icon: Zap,
    color: 'from-orange-500 to-yellow-500',
    completed: false
  },
  {
    id: 'meditation',
    title: 'Mindfulness',
    description: 'Meditate for 10 minutes, 7 days',
    progress: 4,
    target: 7,
    xp: 150,
    icon: Star,
    color: 'from-cyan-500 to-blue-500',
    completed: false
  }
];

const achievements = [
  {
    id: 'first_week',
    title: 'First Week Champion',
    description: 'Complete your first week of health tracking',
    unlocked: true,
    date: '2024-01-15',
    rarity: 'common',
    xp: 100
  },
  {
    id: 'step_master',
    title: 'Step Master',
    description: 'Reach 50,000 steps in a week',
    unlocked: true,
    date: '2024-01-22',
    rarity: 'rare',
    xp: 300
  },
  {
    id: 'health_guru',
    title: 'Health Guru',
    description: 'Maintain 90%+ health score for 30 days',
    unlocked: false,
    date: null,
    rarity: 'legendary',
    xp: 1000
  },
  {
    id: 'streak_warrior',
    title: 'Streak Warrior',
    description: '14-day goal completion streak',
    unlocked: true,
    date: '2024-02-01',
    rarity: 'epic',
    xp: 500
  }
];

export function GoalsModal({ isOpen, onClose, onLevelUp }: GoalsModalProps) {
  const [completingGoal, setCompletingGoal] = useState<string | null>(null);

  const completeGoal = async (goalId: string, xpReward: number) => {
    setCompletingGoal(goalId);
    
    // Simulate goal completion
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setCompletingGoal(null);
    
    // Trigger level up if enough XP
    if (Math.random() > 0.5) {
      setTimeout(() => onLevelUp(), 500);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500';
      case 'rare': return 'from-blue-400 to-blue-500';
      case 'epic': return 'from-purple-400 to-purple-500';
      case 'legendary': return 'from-yellow-400 to-yellow-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto backdrop-blur-xl bg-white/90 border-white/20">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Health Goals & Achievements
          </DialogTitle>
          <p className="text-slate-600">
            Complete goals to earn XP, level up, and unlock achievements!
          </p>
        </DialogHeader>

        <Tabs defaultValue="goals" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="goals" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Goals</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span>Achievements</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="goals" className="space-y-6">
            {/* Daily Goals */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-teal-500" />
                <span>Daily Goals</span>
                <Badge className="bg-teal-100 text-teal-700">
                  Resets in 6h 32m
                </Badge>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dailyGoals.map((goal, index) => {
                  const IconComponent = goal.icon;
                  const isCompleting = completingGoal === goal.id;
                  const progressPercent = (goal.progress / goal.target) * 100;
                  
                  return (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className={`relative overflow-hidden transition-all duration-300 ${
                        goal.completed 
                          ? 'bg-gradient-to-br from-green-50/70 to-emerald-50/70 border-green-200/50 shadow-lg shadow-green-500/20' 
                          : 'backdrop-blur-sm bg-white/70 border-white/30 hover:shadow-lg hover:shadow-teal-500/10'
                      }`}>
                        {goal.completed && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                          >
                            <CheckCircle className="w-5 h-5 text-white" />
                          </motion.div>
                        )}
                        
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center shadow-lg`}>
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-slate-800">{goal.title}</h4>
                              <p className="text-sm text-slate-600">{goal.description}</p>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-slate-600">Progress</span>
                              <span className="text-sm font-medium">
                                {goal.progress}/{goal.target}
                              </span>
                            </div>
                            <Progress 
                              value={progressPercent} 
                              className="h-3"
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Badge className="bg-yellow-100 text-yellow-700">
                              <Star className="w-3 h-3 mr-1" />
                              {goal.xp} XP
                            </Badge>
                            
                            {!goal.completed && progressPercent >= 100 && (
                              <Button
                                size="sm"
                                onClick={() => completeGoal(goal.id, goal.xp)}
                                disabled={isCompleting}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl"
                              >
                                {isCompleting ? (
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                  />
                                ) : (
                                  <>
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Complete
                                  </>
                                )}
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Weekly Goals */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span>Weekly Goals</span>
                <Badge className="bg-orange-100 text-orange-700">
                  Resets in 3 days
                </Badge>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {weeklyGoals.map((goal, index) => {
                  const IconComponent = goal.icon;
                  const progressPercent = (goal.progress / goal.target) * 100;
                  
                  return (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (index + dailyGoals.length) * 0.1 }}
                    >
                      <Card className="backdrop-blur-sm bg-white/70 border-white/30 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center shadow-lg`}>
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-slate-800">{goal.title}</h4>
                              <p className="text-sm text-slate-600">{goal.description}</p>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-slate-600">Progress</span>
                              <span className="text-sm font-medium">
                                {goal.progress}/{goal.target}
                              </span>
                            </div>
                            <Progress value={progressPercent} className="h-3" />
                          </div>
                          
                          <Badge className="bg-yellow-100 text-yellow-700">
                            <Star className="w-3 h-3 mr-1" />
                            {goal.xp} XP
                          </Badge>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`relative overflow-hidden transition-all duration-300 ${
                    achievement.unlocked
                      ? `bg-gradient-to-br from-${achievement.rarity === 'legendary' ? 'yellow' : achievement.rarity === 'epic' ? 'purple' : achievement.rarity === 'rare' ? 'blue' : 'gray'}-50/70 border-${achievement.rarity === 'legendary' ? 'yellow' : achievement.rarity === 'epic' ? 'purple' : achievement.rarity === 'rare' ? 'blue' : 'gray'}-200/50 shadow-lg`
                      : 'backdrop-blur-sm bg-white/30 border-white/20 grayscale'
                  }`}>
                    {achievement.unlocked && (
                      <motion.div
                        className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${getRarityColor(achievement.rarity)} opacity-20 rounded-bl-3xl`}
                        animate={{ 
                          boxShadow: [
                            '0 0 20px rgba(59, 130, 246, 0.5)',
                            '0 0 40px rgba(59, 130, 246, 0.8)',
                            '0 0 20px rgba(59, 130, 246, 0.5)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getRarityColor(achievement.rarity)} flex items-center justify-center shadow-lg ${!achievement.unlocked && 'grayscale opacity-50'}`}>
                          <Trophy className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className={`font-bold ${achievement.unlocked ? 'text-slate-800' : 'text-slate-400'}`}>
                              {achievement.title}
                            </h4>
                            <Badge 
                              className={`text-xs ${
                                achievement.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-700' :
                                achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-700' :
                                achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-700' :
                                'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {achievement.rarity}
                            </Badge>
                          </div>
                          <p className={`text-sm ${achievement.unlocked ? 'text-slate-600' : 'text-slate-400'}`}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge className={`${achievement.unlocked ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                          <Star className="w-3 h-3 mr-1" />
                          {achievement.xp} XP
                        </Badge>
                        
                        {achievement.unlocked && achievement.date && (
                          <span className="text-xs text-slate-500">
                            Unlocked {achievement.date}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Close Button */}
        <div className="flex justify-end pt-6 border-t border-white/20">
          <Button 
            onClick={onClose}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}