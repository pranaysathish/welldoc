import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  Bell, 
  Heart, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  X, 
  Trash2
} from 'lucide-react';
import { motion } from 'motion/react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'health' | 'appointment' | 'achievement' | 'alert' | 'info';
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Heart Rate Alert',
      message: 'Your resting heart rate has decreased by 3 bpm this week - great improvement!',
      type: 'health',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: false,
      priority: 'medium'
    },
    {
      id: '2',
      title: 'Appointment Reminder',
      message: 'Your cardiology appointment with Dr. Johnson is tomorrow at 10:00 AM.',
      type: 'appointment',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      priority: 'high'
    },
    {
      id: '3',
      title: 'Goal Achievement!',
      message: 'Congratulations! You\'ve reached your weekly step goal of 70,000 steps.',
      type: 'achievement',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      read: true,
      priority: 'medium'
    },
    {
      id: '4',
      title: 'Sleep Quality Improvement',
      message: 'Your sleep quality has improved by 15% over the past week. Keep it up!',
      type: 'health',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      read: true,
      priority: 'low'
    },
    {
      id: '5',
      title: 'Data Sync Issue',
      message: 'Unable to sync data from your Apple Watch. Please check connection.',
      type: 'alert',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      read: false,
      priority: 'high'
    },
    {
      id: '6',
      title: 'Weekly Health Report',
      message: 'Your weekly health summary is ready. Tap to view insights and recommendations.',
      type: 'info',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      priority: 'low'
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'health': return Heart;
      case 'appointment': return Calendar;
      case 'achievement': return TrendingUp;
      case 'alert': return AlertTriangle;
      case 'info': return Info;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'health': return 'from-red-400 to-pink-500';
      case 'appointment': return 'from-blue-400 to-cyan-500';
      case 'achievement': return 'from-green-400 to-emerald-500';
      case 'alert': return 'from-orange-400 to-amber-500';
      case 'info': return 'from-purple-400 to-violet-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - timestamp.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return `${diffInDays}d ago`;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-hidden bg-white/95 backdrop-blur-lg border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl font-bold text-gray-800">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Bell className="w-4 h-4 text-white" />
            </div>
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white">
                {unreadCount}
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Stay updated with your health alerts, appointments, and achievements.
          </DialogDescription>
        </DialogHeader>

        {/* Action Buttons */}
        <div className="flex space-x-2 mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="flex-1 text-xs"
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            Mark All Read
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearAll}
            disabled={notifications.length === 0}
            className="flex-1 text-xs"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Clear All
          </Button>
        </div>

        <ScrollArea className="h-96">
          <div className="space-y-3 pr-4">
            {notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No notifications</p>
              </div>
            ) : (
              notifications.map((notification, index) => {
                const IconComponent = getNotificationIcon(notification.type);
                const iconColor = getNotificationColor(notification.type);
                
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className={`border-0 shadow-lg shadow-gray-200/50 transition-all duration-200 cursor-pointer ${
                        notification.read 
                          ? 'bg-white/70' 
                          : 'bg-gradient-to-r from-blue-50/50 to-cyan-50/50 ring-2 ring-blue-200/30'
                      }`}
                      style={notification.read ? {} : { backgroundColor: '#B8F2E6' }}
                      onClick={() => !notification.read && markAsRead(notification.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${iconColor} flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className={`text-sm font-semibold truncate ${
                                notification.read ? 'text-gray-700' : 'text-gray-900'
                              }`}>
                                {notification.title}
                              </h4>
                              <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                                <Badge className={`text-xs ${getPriorityColor(notification.priority)}`}>
                                  {notification.priority}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                  className="w-6 h-6 p-0 text-gray-400 hover:text-red-500"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            
                            <p className={`text-xs leading-relaxed mb-2 ${
                              notification.read ? 'text-gray-500' : 'text-gray-700'
                            }`}>
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-400">
                                {getTimeAgo(notification.timestamp)}
                              </span>
                              
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>
        </ScrollArea>

        {notifications.length > 0 && (
          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              {notifications.length} total notification{notifications.length !== 1 ? 's' : ''}
              {unreadCount > 0 && ` • ${unreadCount} unread`}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}