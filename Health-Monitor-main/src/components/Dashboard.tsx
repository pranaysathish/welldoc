import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { 
  Heart, 
  TrendingUp, 
  AlertTriangle, 
  Settings, 
  Bell, 
  Calendar,
  Activity,
  Zap,
  Shield,
  Target,
  Award,
  Smartphone,
  Star,
  Flame,
  Trophy
} from 'lucide-react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface DashboardProps {
  onBack: () => void;
  onOpenDeviceModal: () => void;
  onOpenGoalsModal: () => void;
}

// Mock data for the charts
const healthData = [
  { date: 'Jan 1', healthScore: 85, riskScore: 15 },
  { date: 'Jan 8', healthScore: 87, riskScore: 13 },
  { date: 'Jan 15', healthScore: 82, riskScore: 18 },
  { date: 'Jan 22', healthScore: 89, riskScore: 11 },
  { date: 'Jan 29', healthScore: 91, riskScore: 9 },
  { date: 'Feb 5', healthScore: 88, riskScore: 12 },
  { date: 'Feb 12', healthScore: 93, riskScore: 7 },
  { date: 'Today', healthScore: 95, riskScore: 5 },
];

export function Dashboard({ onBack, onOpenDeviceModal, onOpenGoalsModal }: DashboardProps) {
  const [timeRange, setTimeRange] = useState('30 days');
  
  const healthScore = 95;
  const riskScore = 5;
  const deteriorationProb = 8;
  const currentLevel = 12;
  const currentXP = 2847;
  const nextLevelXP = 3000;
  const xpProgress = (currentXP / nextLevelXP) * 100;

  const getScoreColor = (score: number, isRisk = false) => {
    if (isRisk) {
      if (score <= 10) return 'text-green-600';
      if (score <= 25) return 'text-yellow-600';
      return 'text-red-600';
    } else {
      if (score >= 90) return 'text-green-600';
      if (score >= 70) return 'text-yellow-600';
      return 'text-red-600';
    }
  };

  const getScoreBg = (score: number, isRisk = false) => {
    if (isRisk) {
      if (score <= 10) return 'from-green-500 to-emerald-500';
      if (score <= 25) return 'from-yellow-500 to-orange-500';
      return 'from-red-500 to-pink-500';
    } else {
      if (score >= 90) return 'from-green-500 to-emerald-500';
      if (score >= 70) return 'from-yellow-500 to-orange-500';
      return 'from-red-500 to-pink-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-teal-200/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-48 h-48 bg-cyan-200/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, -30, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8"
        >
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <Avatar className="w-12 h-12 ring-4 ring-teal-200">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white">
                  DR
                </AvatarFallback>
              </Avatar>
              {/* Level indicator */}
              <motion.div
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                animate={{ 
                  boxShadow: [
                    '0 0 0 0 rgba(168, 85, 247, 0.7)',
                    '0 0 0 8px rgba(168, 85, 247, 0)',
                    '0 0 0 0 rgba(168, 85, 247, 0)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-xs font-bold text-white">{currentLevel}</span>
              </motion.div>
            </motion.div>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-slate-800">Dr. Sarah Chen</h1>
                <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
                  <Trophy className="w-3 h-3 mr-1" />
                  Level {currentLevel} Expert
                </Badge>
              </div>
              <p className="text-slate-600">Welcome back to your health dashboard</p>
              
              {/* XP Progress Bar */}
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-xs text-slate-500">XP:</span>
                <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    style={{ width: `${xpProgress}%` }}
                    animate={{ 
                      boxShadow: [
                        '0 0 10px rgba(168, 85, 247, 0.5)',
                        '0 0 20px rgba(168, 85, 247, 0.8)',
                        '0 0 10px rgba(168, 85, 247, 0.5)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <span className="text-xs text-slate-500">{currentXP}/{nextLevelXP}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-white/70 backdrop-blur-sm border border-white/30 rounded-lg text-sm"
            >
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last 180 days</option>
            </select>
            <Button variant="outline" size="sm" className="bg-white/70 backdrop-blur-sm border-white/30">
              <Bell className="w-4 h-4 mr-2" />
              Alerts
            </Button>
            <Button variant="outline" size="sm" className="bg-white/70 backdrop-blur-sm border-white/30">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {/* Health Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)'
            }}
          >
            <Card className="backdrop-blur-md bg-white/70 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
              {/* Glow effect for excellent score */}
              {healthScore >= 90 && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"
                  animate={{ 
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getScoreBg(healthScore)} flex items-center justify-center shadow-lg`}>
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +3%
                  </Badge>
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-1">Health Score</h3>
                <div className="flex items-baseline space-x-2">
                  <span className={`text-3xl font-bold ${getScoreColor(healthScore)}`}>
                    {healthScore}%
                  </span>
                  <span className="text-sm text-slate-500">Excellent</span>
                </div>
                <Progress value={healthScore} className="mt-3 h-2" />
              </CardContent>
            </Card>
          </motion.div>

          {/* Risk Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)'
            }}
          >
            <Card className="backdrop-blur-md bg-white/70 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getScoreBg(riskScore, true)} flex items-center justify-center shadow-lg`}>
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <TrendingUp className="w-3 h-3 mr-1 rotate-180" />
                    -2%
                  </Badge>
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-1">Risk Score</h3>
                <div className="flex items-baseline space-x-2">
                  <span className={`text-3xl font-bold ${getScoreColor(riskScore, true)}`}>
                    {riskScore}%
                  </span>
                  <span className="text-sm text-slate-500">Low Risk</span>
                </div>
                <Progress value={100 - riskScore} className="mt-3 h-2" />
              </CardContent>
            </Card>
          </motion.div>

          {/* Deterioration Probability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)'
            }}
          >
            <Card className="backdrop-blur-md bg-gradient-to-br from-orange-50/70 to-yellow-50/70 border-orange-200/30 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-lg">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    Monitor
                  </Badge>
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-1">Deterioration Risk</h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-orange-600">
                    {deteriorationProb}%
                  </span>
                  <span className="text-sm text-slate-500">Very Low</span>
                </div>
                <Progress value={deteriorationProb} className="mt-3 h-2" />
              </CardContent>
            </Card>
          </motion.div>

          {/* Gamification Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)'
            }}
          >
            <Card className="backdrop-blur-md bg-gradient-to-br from-purple-50/70 to-pink-50/70 border-purple-200/30 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
              {/* Animated glow for leveling card */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg"
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(168, 85, 247, 0.3)',
                        '0 0 30px rgba(168, 85, 247, 0.5)',
                        '0 0 20px rgba(168, 85, 247, 0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Award className="w-6 h-6 text-white" />
                  </motion.div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    Level {currentLevel}
                  </Badge>
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-1">Wellness Points</h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-purple-600">
                    {currentXP.toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-500">Expert</span>
                </div>
                <Progress value={xpProgress} className="mt-3 h-2" />
                <p className="text-xs text-slate-500 mt-1">
                  {nextLevelXP - currentXP} XP to Level {currentLevel + 1}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts and Data */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Trend Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="xl:col-span-2"
          >
            <Card className="backdrop-blur-md bg-white/70 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-teal-500" />
                  <span>Health Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={healthData}>
                      <defs>
                        <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          background: 'rgba(255, 255, 255, 0.9)', 
                          backdropFilter: 'blur(10px)',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="healthScore" 
                        stroke="#14b8a6" 
                        fillOpacity={1} 
                        fill="url(#healthGradient)"
                        strokeWidth={3}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="riskScore" 
                        stroke="#f59e0b" 
                        fillOpacity={1} 
                        fill="url(#riskGradient)"
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Side Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            {/* Notifications */}
            <Card className="backdrop-blur-md bg-white/70 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-orange-500" />
                  <span>Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  className="p-3 bg-green-50/50 rounded-lg border border-green-200/30"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-3">
                    <motion.div 
                      className="w-2 h-2 bg-green-500 rounded-full mt-2"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div>
                      <p className="text-sm font-medium text-green-800">Health Improvement</p>
                      <p className="text-xs text-green-600">Your health score increased by 3% this week!</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  className="p-3 bg-blue-50/50 rounded-lg border border-blue-200/30"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-3">
                    <motion.div 
                      className="w-2 h-2 bg-blue-500 rounded-full mt-2"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Data Sync</p>
                      <p className="text-xs text-blue-600">All devices synced successfully</p>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>

            {/* Device Status */}
            <Card className="backdrop-blur-md bg-white/70 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="w-5 h-5 text-cyan-500" />
                    <span>Connected Devices</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={onOpenDeviceModal}
                    className="text-teal-600 hover:text-teal-700"
                  >
                    Manage
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <motion.div
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-teal-50/50 to-cyan-50/50 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Apple Watch</p>
                        <p className="text-xs text-slate-500">Last sync: 2 min ago</p>
                      </div>
                    </div>
                    <motion.div 
                      className="w-2 h-2 bg-green-500 rounded-full"
                      animate={{ 
                        boxShadow: [
                          '0 0 5px rgba(34, 197, 94, 0.5)',
                          '0 0 10px rgba(34, 197, 94, 0.8)',
                          '0 0 5px rgba(34, 197, 94, 0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  
                  <motion.div
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Activity className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">EHR System</p>
                        <p className="text-xs text-slate-500">Connected</p>
                      </div>
                    </div>
                    <motion.div 
                      className="w-2 h-2 bg-green-500 rounded-full"
                      animate={{ 
                        boxShadow: [
                          '0 0 5px rgba(34, 197, 94, 0.5)',
                          '0 0 10px rgba(34, 197, 94, 0.8)',
                          '0 0 5px rgba(34, 197, 94, 0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* 3D Medical Visual */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="backdrop-blur-md bg-white/70 border-white/20 shadow-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1645685491865-42a4fbbc9912?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtZWRpY2FsJTIwZGFzaGJvYXJkJTIwYW5hbHl0aWNzJTIwM2R8ZW58MXx8fHwxNzU3MjY3MTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="3D Medical Analytics"
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="text-sm font-medium">AI Health Insights</p>
                      <p className="text-xs opacity-80">Powered by ML algorithms</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="backdrop-blur-md bg-white/70 border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col space-y-2 bg-white/50 border-white/30 hover:bg-white/70 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <Calendar className="w-6 h-6 text-teal-600 relative z-10" />
                    <span className="text-sm relative z-10">Schedule Checkup</span>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    onClick={onOpenGoalsModal}
                    className="h-20 flex-col space-y-2 bg-white/50 border-white/30 hover:bg-white/70 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <Target className="w-6 h-6 text-purple-600 relative z-10" />
                    <span className="text-sm relative z-10">View Goals</span>
                    {/* Notification dot */}
                    <motion.div
                      className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col space-y-2 bg-white/50 border-white/30 hover:bg-white/70 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <Zap className="w-6 h-6 text-yellow-600 relative z-10" />
                    <span className="text-sm relative z-10">View Reports</span>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col space-y-2 bg-white/50 border-white/30 hover:bg-white/70 relative overflow-hidden group"
                    onClick={onOpenDeviceModal}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <Smartphone className="w-6 h-6 text-blue-600 relative z-10" />
                    <span className="text-sm relative z-10">Add Device</span>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col space-y-2 bg-white/50 border-white/30 hover:bg-white/70 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <Flame className="w-6 h-6 text-emerald-600 relative z-10" />
                    <span className="text-sm relative z-10">Daily Streak</span>
                    {/* Streak counter */}
                    <div className="absolute top-1 right-1 px-1 py-0.5 bg-orange-500 text-white text-xs rounded">7</div>
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}