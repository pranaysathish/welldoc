import { Heart, Droplet, Activity, Moon, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { motion } from 'motion/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

// Mock data for charts
const heartRateData = [
  { date: 'Mon', value: 68, resting: 65 },
  { date: 'Tue', value: 75, resting: 66 },
  { date: 'Wed', value: 72, resting: 64 },
  { date: 'Thu', value: 78, resting: 67 },
  { date: 'Fri', value: 71, resting: 65 },
  { date: 'Sat', value: 74, resting: 66 },
  { date: 'Sun', value: 69, resting: 64 },
];

const spo2Data = [
  { date: 'Mon', value: 98 },
  { date: 'Tue', value: 97 },
  { date: 'Wed', value: 98 },
  { date: 'Thu', value: 99 },
  { date: 'Fri', value: 98 },
  { date: 'Sat', value: 97 },
  { date: 'Sun', value: 98 },
];

const scoresData = [
  { date: 'Week 1', health: 85, risk: 15 },
  { date: 'Week 2', health: 87, risk: 13 },
  { date: 'Week 3', health: 89, risk: 11 },
  { date: 'Week 4', health: 91, risk: 9 },
];

const healthTrendsData = [
  { date: 'Jan', glucose: 95, weight: 72, activity: 65, sleep: 7.5 },
  { date: 'Feb', glucose: 92, weight: 71.5, activity: 70, sleep: 7.8 },
  { date: 'Mar', glucose: 88, weight: 71, activity: 75, sleep: 8.0 },
  { date: 'Apr', glucose: 90, weight: 70.5, activity: 78, sleep: 7.9 },
];

const riskFactors = [
  { factor: 'Blood Pressure', risk: 15, color: '#ef4444' },
  { factor: 'Cholesterol', risk: 8, color: '#f97316' },
  { factor: 'BMI', risk: 12, color: '#eab308' },
  { factor: 'Stress Level', risk: 20, color: '#22c55e' },
  { factor: 'Sleep Quality', risk: 5, color: '#3b82f6' },
];

export function AnalysisPage() {
  return (
    <div className="space-y-6 pb-32">
      <div className="space-y-4">
        <h2 className="text-left text-lg font-semibold text-gray-800 px-1">Health Analysis</h2>
        
        <Tabs defaultValue="vitals" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100/50 rounded-2xl p-1">
            <TabsTrigger value="vitals" className="rounded-xl">Vitals & Scores</TabsTrigger>
            <TabsTrigger value="trends" className="rounded-xl">Health Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="vitals" className="space-y-4 mt-6">
            {/* Heart Rate Trends */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-0 shadow-lg shadow-gray-200/30" style={{ backgroundColor: '#FDF2F2' }}>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <div className="w-8 h-8 rounded-xl bg-white/30 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-gray-700" />
                    </div>
                    <span>Heart Rate Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={heartRateData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="date" />
                        <YAxis domain={[60, 85]} />
                        <Tooltip 
                          contentStyle={{ 
                            background: 'rgba(255, 255, 255, 0.95)', 
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                          }} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#f87171" 
                          fillOpacity={0.3} 
                          fill="#f87171"
                          strokeWidth={3}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="resting" 
                          stroke="#dc2626" 
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-between items-center mt-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#f87171' }}></div>
                      <span className="text-gray-600">Current HR</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-1 rounded-full" style={{ backgroundColor: '#dc2626' }}></div>
                      <span className="text-gray-600">Resting HR</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-800">72 bpm</div>
                      <div className="text-xs" style={{ color: '#E8F5E8' }}>↓ 3 from yesterday</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* SpO2 Trends */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg shadow-gray-200/30" style={{ backgroundColor: '#F0F9FF' }}>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <div className="w-8 h-8 rounded-xl bg-white/30 flex items-center justify-center">
                      <Droplet className="w-4 h-4 text-gray-700" />
                    </div>
                    <span>Blood Oxygen (SpO2)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={spo2Data}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="date" />
                        <YAxis domain={[95, 100]} />
                        <Tooltip 
                          contentStyle={{ 
                            background: 'rgba(255, 255, 255, 0.95)', 
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#3b82f6" 
                          strokeWidth={3}
                          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">98%</div>
                      <div className="text-xs text-gray-500">Current</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">97.8%</div>
                      <div className="text-xs text-gray-500">7-day avg</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium" style={{ color: '#E8F5E8' }}>Normal</div>
                      <div className="text-xs text-gray-500">Status</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Health & Risk Scores */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg shadow-gray-200/30" style={{ backgroundColor: '#F0FDF4' }}>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <div className="w-8 h-8 rounded-xl bg-white/30 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-gray-700" />
                    </div>
                    <span>Health & Risk Scores</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={scoresData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ 
                            background: 'rgba(255, 255, 255, 0.95)', 
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                          }} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="health" 
                          stroke="#10b981" 
                          fillOpacity={0.3} 
                          fill="#10b981"
                          strokeWidth={3}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="risk" 
                          stroke="#f59e0b" 
                          fillOpacity={0.3} 
                          fill="#f59e0b"
                          strokeWidth={3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4 mt-6">
            {/* Health Trends */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-0 shadow-lg shadow-gray-200/30" style={{ backgroundColor: '#FAFAFA' }}>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <div className="w-8 h-8 rounded-xl bg-white/30 flex items-center justify-center">
                      <Activity className="w-4 h-4 text-gray-700" />
                    </div>
                    <span>Health Trends Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={healthTrendsData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ 
                            background: 'rgba(255, 255, 255, 0.95)', 
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                          }} 
                        />
                        <Line type="monotone" dataKey="glucose" stroke="#ef4444" strokeWidth={2} name="Glucose" />
                        <Line type="monotone" dataKey="activity" stroke="#3b82f6" strokeWidth={2} name="Activity %" />
                        <Line type="monotone" dataKey="sleep" stroke="#8b5cf6" strokeWidth={2} name="Sleep (hrs)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <span className="text-xs text-gray-600">Glucose</span>
                      </div>
                      <div className="text-lg font-bold text-gray-800">90 mg/dL</div>
                      <div className="text-xs" style={{ color: '#8AAF8A' }}>↓ 5 this month</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <span className="text-xs text-gray-600">Activity</span>
                      </div>
                      <div className="text-lg font-bold text-gray-800">78%</div>
                      <div className="text-xs" style={{ color: '#8AAF8A' }}>↑ 13% this month</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                        <span className="text-xs text-gray-600">Sleep</span>
                      </div>
                      <div className="text-lg font-bold text-gray-800">7.9 hrs</div>
                      <div className="text-xs" style={{ color: '#8AAF8A' }}>↑ 0.4 this month</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Risk Factor Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg shadow-gray-200/30" style={{ backgroundColor: '#FFFBF0' }}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Risk Factor Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={riskFactors} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis type="number" domain={[0, 25]} />
                        <YAxis dataKey="factor" type="category" width={80} />
                        <Tooltip 
                          contentStyle={{ 
                            background: 'rgba(255, 255, 255, 0.95)', 
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                          }} 
                        />
                        <Bar dataKey="risk" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-2">
                    {riskFactors.map((factor, index) => (
                      <div key={factor.factor} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: factor.color }}></div>
                          <span className="text-sm text-gray-700">{factor.factor}</span>
                        </div>
                        <div className="text-sm font-medium text-gray-800">{factor.risk}% risk</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Advanced Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg shadow-gray-200/30" style={{ backgroundColor: '#FDF2F2' }}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Advanced Data Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/60 rounded-xl">
                      <h4 className="font-semibold text-gray-800 mb-2">Cardiovascular Health</h4>
                      <p className="text-sm text-gray-600 mb-3">Your heart rate variability indicates excellent cardiovascular fitness.</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ width: '92%', backgroundColor: '#D5E8D5' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Poor</span>
                        <span className="font-medium">92% - Excellent</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white/60 rounded-xl">
                      <h4 className="font-semibold text-gray-800 mb-2">Sleep Quality Index</h4>
                      <p className="text-sm text-gray-600 mb-3">Consistent sleep patterns with good deep sleep phases.</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ width: '87%', backgroundColor: '#E6E6F5' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Poor</span>
                        <span className="font-medium">87% - Very Good</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white/60 rounded-xl">
                      <h4 className="font-semibold text-gray-800 mb-2">Metabolic Health</h4>
                      <p className="text-sm text-gray-600 mb-3">Glucose levels are well-controlled with improving trends.</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ width: '89%', backgroundColor: '#F0F8FF' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Poor</span>
                        <span className="font-medium">89% - Very Good</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}