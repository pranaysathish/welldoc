import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { 
  User, 
  Edit, 
  Heart, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Award,
  Target,
  TrendingUp,
  Activity,
  Save
} from 'lucide-react';
import { motion } from 'motion/react';

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Cavin Smith',
    email: 'cavin.smith@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    location: 'San Francisco, CA',
    emergencyContact: 'Jane Smith - (555) 987-6543',
    bloodType: 'O+',
    height: '6\'0"',
    weight: '160 lbs',
    allergies: 'None known'
  });

  const healthStats = {
    healthScore: 89,
    riskScore: 12,
    weeklyGoalsCompleted: 5,
    totalGoalsCompleted: 47,
    streakDays: 12,
    totalWorkouts: 156
  };

  const achievements = [
    {
      id: 1,
      title: 'Step Master',
      description: 'Reached 100k steps in a week',
      icon: '👟',
      unlocked: true,
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Heart Health Hero',
      description: 'Maintained optimal heart rate for 30 days',
      icon: '❤️',
      unlocked: true,
      date: '2024-01-22'
    },
    {
      id: 3,
      title: 'Sleep Champion',
      description: 'Perfect sleep schedule for 14 days',
      icon: '😴',
      unlocked: true,
      date: '2024-02-01'
    },
    {
      id: 4,
      title: 'Wellness Warrior',
      description: 'Complete 50 health goals',
      icon: '🏆',
      unlocked: false,
      progress: 94
    }
  ];

  const recentActivities = [
    {
      id: 1,
      activity: 'Morning run',
      duration: '32 minutes',
      calories: 280,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      activity: 'Heart rate logged',
      value: '72 bpm',
      status: 'Normal',
      timestamp: '4 hours ago'
    },
    {
      id: 3,
      activity: 'Sleep analysis',
      duration: '7.5 hours',
      quality: 'Good',
      timestamp: 'Yesterday'
    }
  ];

  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 pb-32">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-0 shadow-lg shadow-gray-200/30" style={{ backgroundColor: '#B8F2E6' }}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                <AvatarImage src="/user-avatar.jpg" />
                <AvatarFallback className="text-white text-2xl" style={{ backgroundColor: '#E6E6F5' }}>
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-left text-xl font-bold text-gray-800">{profileData.name}</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="border-gray-200 text-gray-600 hover:bg-white/50"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>
                
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{profileData.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 mt-3">
                  <Badge style={{ backgroundColor: '#D5E8D5', color: '#4a5568' }}>
                    <Heart className="w-3 h-3 mr-1" />
                    Health Score: {healthStats.healthScore}%
                  </Badge>
                  <Badge style={{ backgroundColor: '#F8F5D5', color: '#4a5568' }}>
                    <Award className="w-3 h-3 mr-1" />
                    {healthStats.streakDays} day streak
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Health Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-white border-0 shadow-lg shadow-gray-200/30">
          <CardHeader>
            <CardTitle className="text-left text-lg">Health Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-2xl" style={{ backgroundColor: '#D5E8D5' }}>
                <div className="text-2xl font-bold text-gray-800">{healthStats.healthScore}%</div>
                <div className="text-sm text-gray-600">Health Score</div>
              </div>
              <div className="text-center p-4 rounded-2xl" style={{ backgroundColor: '#F5E6E6' }}>
                <div className="text-2xl font-bold text-gray-800">{healthStats.riskScore}%</div>
                <div className="text-sm text-gray-600">Risk Score</div>
              </div>
              <div className="text-center p-4 rounded-2xl" style={{ backgroundColor: '#E6E6F5' }}>
                <div className="text-2xl font-bold text-gray-800">{healthStats.weeklyGoalsCompleted}/7</div>
                <div className="text-sm text-gray-600">Weekly Goals</div>
              </div>
              <div className="text-center p-4 rounded-2xl" style={{ backgroundColor: '#FAF0F0' }}>
                <div className="text-2xl font-bold text-gray-800">{healthStats.totalWorkouts}</div>
                <div className="text-sm text-gray-600">Total Workouts</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Personal Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-white border-0 shadow-lg shadow-gray-200/30">
          <CardHeader>
            <CardTitle className="text-left text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm">Full Name</Label>
                    <Input
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Phone</Label>
                    <Input
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm">Email</Label>
                  <Input
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm">Date of Birth</Label>
                    <Input
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Blood Type</Label>
                    <Input
                      value={profileData.bloodType}
                      onChange={(e) => handleInputChange('bloodType', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm">Height</Label>
                    <Input
                      value={profileData.height}
                      onChange={(e) => handleInputChange('height', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Weight</Label>
                    <Input
                      value={profileData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm">Location</Label>
                  <Input
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label className="text-sm">Emergency Contact</Label>
                  <Input
                    value={profileData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label className="text-sm">Allergies</Label>
                  <Input
                    value={profileData.allergies}
                    onChange={(e) => handleInputChange('allergies', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <Button 
                  onClick={handleSave}
                  className="w-full text-white"
                  style={{ backgroundColor: '#C4C4E6' }}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Phone:</span>
                    <p className="font-medium">{profileData.phone}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Date of Birth:</span>
                    <p className="font-medium">{new Date(profileData.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Blood Type:</span>
                    <p className="font-medium">{profileData.bloodType}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Height:</span>
                    <p className="font-medium">{profileData.height}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Weight:</span>
                    <p className="font-medium">{profileData.weight}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Allergies:</span>
                    <p className="font-medium">{profileData.allergies}</p>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                  <span className="text-gray-500 text-sm">Emergency Contact:</span>
                  <p className="font-medium">{profileData.emergencyContact}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-white border-0 shadow-lg shadow-gray-200/30">
          <CardHeader>
            <CardTitle className="text-left text-lg">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    achievement.unlocked
                      ? 'border-gray-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                  style={achievement.unlocked ? { backgroundColor: '#F5F0B8' } : {}}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${achievement.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                        {achievement.description}
                      </p>
                      {achievement.unlocked ? (
                        <p className="text-xs text-gray-600 mt-1">Unlocked {achievement.date}</p>
                      ) : (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} className="h-1" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-white border-0 shadow-lg shadow-gray-200/30">
          <CardHeader>
            <CardTitle className="text-left text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-xl" style={{ backgroundColor: '#F5D7D7' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#A8A8E6' }}>
                    <Activity className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{activity.activity}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      {activity.duration && <span>{activity.duration}</span>}
                      {activity.calories && <span>• {activity.calories} cal</span>}
                      {activity.value && <span>{activity.value}</span>}
                      {activity.status && <span>• {activity.status}</span>}
                      {activity.quality && <span>• {activity.quality}</span>}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{activity.timestamp}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}