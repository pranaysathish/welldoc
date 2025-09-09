import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { 
  MessageCircle, 
  Target, 
  TrendingUp, 
  Lightbulb, 
  Send, 
  Sparkles,
  Heart,
  Activity,
  Moon,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';

interface AICoachModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export function AICoachModal({ isOpen, onClose }: AICoachModalProps) {
  const [activeTab, setActiveTab] = useState('insights');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Health Coach. How can I help you improve your health today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (activeTab === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeTab]);

  const insights = [
    {
      id: 1,
      title: 'Heart Rate Variability Improving',
      description: 'Your HRV has increased by 12% this week, indicating better recovery and stress management.',
      category: 'Recovery',
      priority: 'high',
      icon: Heart,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 2,
      title: 'Sleep Pattern Optimization',
      description: 'Consider going to bed 30 minutes earlier to reach your optimal 8-hour sleep target.',
      category: 'Sleep',
      priority: 'medium',
      icon: Moon,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 3,
      title: 'Activity Level Recommendation',
      description: 'You\'re consistently meeting your step goals. Try adding 15 minutes of strength training.',
      category: 'Fitness',
      priority: 'low',
      icon: Activity,
      color: 'from-orange-400 to-amber-500'
    }
  ];

  const goals = [
    {
      id: 1,
      title: 'Reach 10,000 Daily Steps',
      progress: 82,
      target: '10,000 steps',
      current: '8,200 steps',
      timeframe: 'Today',
      status: 'on-track'
    },
    {
      id: 2,
      title: 'Improve Sleep Quality',
      progress: 75,
      target: '8 hours',
      current: '7.5 hours avg',
      timeframe: 'This Week',
      status: 'good'
    },
    {
      id: 3,
      title: 'Lower Resting Heart Rate',
      progress: 60,
      target: '60 bpm',
      current: '65 bpm',
      timeframe: 'This Month',
      status: 'needs-attention'
    }
  ];

  const tips = [
    {
      id: 1,
      title: 'Hydration Reminder',
      description: 'Drink a glass of water when you wake up to kickstart your metabolism.',
      category: 'Nutrition',
      icon: '💧'
    },
    {
      id: 2,
      title: 'Posture Check',
      description: 'Set hourly reminders to check and correct your posture, especially during desk work.',
      category: 'Ergonomics',
      icon: '🪑'
    },
    {
      id: 3,
      title: 'Stress Management',
      description: 'Try the 4-7-8 breathing technique: inhale for 4, hold for 7, exhale for 8.',
      category: 'Mental Health',
      icon: '🧘‍♂️'
    },
    {
      id: 4,
      title: 'Recovery Time',
      description: 'Your body needs 48 hours between intense workouts targeting the same muscle groups.',
      category: 'Fitness',
      icon: '💪'
    }
  ];

  const progressReview = {
    weeklyImprovement: 15,
    monthlyTrend: 'upward',
    achievements: [
      'Consistent 7-day workout streak',
      'Improved sleep quality by 20%',
      'Reduced average stress levels'
    ],
    areasToImprove: [
      'Increase daily water intake',
      'Add more strength training',
      'Improve posture during work hours'
    ]
  };

  // Call Gemini API
  const getAIResponse = async (input: string): Promise<string> => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `You are a medical assistant and a qualified doctor.
- You should answer questions related to medical records, healthcare, or medicine with helpful, accurate information.  
- If the question is unrelated, respond with: "I can only assist with medical-related queries."  
- However, you may respond politely to basic greetings or small talk (e.g., "hello", "hi", "how are you?", "good morning").' Input: ${input}`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500
            }
          })
        }
      );

      const data = await response.json();
      let text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
      text = text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

      return text || "Sorry, I couldn’t generate a response.";
    } catch (error) {
      console.error("Chat error:", error);
      return "Sorry, I couldn’t generate a response.";
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: chatInput,
      isUser: true,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    // Show temporary "typing..." bubble
    const typingMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: "Thinking...",
      isUser: false,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, typingMessage]);

    // Get AI response
    const aiText = await getAIResponse(chatInput);

    // Replace "Typing..." with real response
    setChatMessages((prev) =>
      prev.map((msg) =>
        msg.id === typingMessage.id ? { ...msg, text: aiText } : msg
      )
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'needs-attention': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-hidden bg-white/95 backdrop-blur-lg border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl font-bold text-gray-800">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span>AI Health Coach</span>
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Get personalized health insights, track your goals, and chat with your AI health coach.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100/50 rounded-2xl p-1 mb-4">
            <TabsTrigger value="insights" className="rounded-xl text-xs">
              <Lightbulb className="w-3 h-3 mr-1" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="goals" className="rounded-xl text-xs">
              <Target className="w-3 h-3 mr-1" />
              Goals
            </TabsTrigger>
            <TabsTrigger value="tips" className="rounded-xl text-xs">
              <Award className="w-3 h-3 mr-1" />
              Tips
            </TabsTrigger>
            <TabsTrigger value="chat" className="rounded-xl text-xs">
              <MessageCircle className="w-3 h-3 mr-1" />
              Chat
            </TabsTrigger>
          </TabsList>

          <div className="h-96 overflow-hidden">
            <TabsContent value="insights" className="h-full">
              <ScrollArea className="h-full">
                <div className="space-y-3 pr-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Smart Health Insights</h3>
                  {insights.map((insight, index) => {
                    const IconComponent = insight.icon;
                    return (
                      <motion.div
                        key={insight.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className={`bg-gradient-to-r ${insight.color.replace('400', '50').replace('500', '50')} border-0`}>
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${insight.color} flex items-center justify-center flex-shrink-0`}>
                                <IconComponent className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="text-sm font-semibold text-gray-800 truncate">{insight.title}</h4>
                                  <Badge className={`text-xs ${getPriorityColor(insight.priority)}`}>
                                    {insight.priority}
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">{insight.description}</p>
                                <Badge className="mt-2 bg-white/70 text-gray-600 text-xs">
                                  {insight.category}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="goals" className="h-full">
              <ScrollArea className="h-full">
                <div className="space-y-3 pr-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Personal Goals</h3>
                  {goals.map((goal, index) => (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-white/70 border-0 shadow-lg shadow-gray-200/50">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-semibold text-gray-800">{goal.title}</h4>
                              <Badge className={getStatusColor(goal.status)}>
                                {goal.progress}%
                              </Badge>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <motion.div 
                                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${goal.progress}%` }}
                                  transition={{ duration: 1, delay: index * 0.2 }}
                                />
                              </div>
                              
                              <div className="flex justify-between text-xs text-gray-600">
                                <span>{goal.current}</span>
                                <span>{goal.target}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">{goal.timeframe}</span>
                              <span className={`font-medium ${getStatusColor(goal.status)}`}>
                                {goal.status.replace('-', ' ')}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="tips" className="h-full">
              <ScrollArea className="h-full">
                <div className="space-y-3 pr-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Health Tips & Recommendations</h3>
                  {tips.map((tip, index) => (
                    <motion.div
                      key={tip.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-white/70 border-0 shadow-lg shadow-gray-200/50">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="text-2xl">{tip.icon}</div>
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-gray-800 mb-1">{tip.title}</h4>
                              <p className="text-xs text-gray-600 leading-relaxed mb-2">{tip.description}</p>
                              <Badge className="bg-blue-100 text-blue-700 text-xs">
                                {tip.category}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-0">
                      <CardContent className="p-4">
                        <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                          Weekly Progress Review
                        </h4>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">Overall Improvement</span>
                            <span className="text-sm font-bold text-green-600">+{progressReview.weeklyImprovement}%</span>
                          </div>
                          
                          <div>
                            <h5 className="text-xs font-medium text-gray-700 mb-1">Achievements</h5>
                            {progressReview.achievements.map((achievement, i) => (
                              <div key={i} className="flex items-center space-x-2 text-xs text-gray-600">
                                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                                <span>{achievement}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div>
                            <h5 className="text-xs font-medium text-gray-700 mb-1">Focus Areas</h5>
                            {progressReview.areasToImprove.map((area, i) => (
                              <div key={i} className="flex items-center space-x-2 text-xs text-gray-600">
                                <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                                <span>{area}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="chat" className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4 max-h-80">
                <div className="space-y-3 pr-2 pb-2">
                  {chatMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-2xl ${
                        message.isUser 
                          ? 'bg-blue-500 text-white rounded-br-md' 
                          : 'bg-gray-100 text-gray-800 rounded-bl-md'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.isUser ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              </div>
              
              <div className="flex space-x-2 mt-auto">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask me anything about your health..."
                  className="flex-1 bg-white/70 border-gray-200 rounded-xl"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}