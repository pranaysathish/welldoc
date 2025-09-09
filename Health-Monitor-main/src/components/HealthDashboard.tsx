import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Heart, Droplet, Footprints, Moon, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import Papa from 'papaparse';
import exampleImage from 'figma:asset/43bd404770cc506112f5def30ddcca4e5c8c10c6.png';

export function HealthDashboard() {
  const healthMetrics = [
    {
      title: 'Risk Score',
      value: 12,
      unit: '%',
      status: 'Low Risk',
      color: '#F9E8E8',
      icon: Heart,
      progress: 88
    },
    {
      title: 'Health Score',
      value: 89,
      unit: '%',
      status: 'Excellent',
      color: '#E8F5E8',
      icon: Activity,
      progress: 89
    },
    {
      title: 'Deterioration Risk',
      value: 8,
      unit: '%',
      status: 'Very Low',
      color: '#FEF7E8',
      icon: Heart,
      progress: 8
    }
  ];

  // vitals will be fetched from CSV
  const [vitals, setVitals] = useState([]);
  const [steps, setSteps] = useState<number>(0);
  const goal = 10000;

  useEffect(() => {
    const fetchData = () => {
      Papa.parse("sample_watch_health.csv", {
        download: true,
        header: true,
        complete: (results) => {
          const row = results.data[0]; // get latest row (or filter by user_id if needed)
          const stepValue = parseInt(row.steps) || 0;
          setSteps(stepValue);

          const updatedVitals = [
            {
              title: "Heart Rate",
              value: parseFloat(row.heart_rate).toFixed(2),
              unit: "bpm",
              status: "Normal",
              color: "#F9E8E8",
              icon: Heart,
            },
            {
              title: "SpO2",
              value: parseFloat(row.spo2).toFixed(2),
              unit: "%",
              status: "Normal",
              color: "#E8F4F8",
              icon: Droplet,
            },
            {
              title: "Steps",
              value: parseInt(row.steps).toFixed(0), // keep steps as text/number directly
              unit: "steps",
              status: "Goal: 10k",
              color: "#E8F5E8",
              icon: Footprints,
            },
            {
              title: "Sleep",
              value: parseFloat(row.sleep_hours).toFixed(2),
              unit: "hrs",
              status: "Good",
              color: "#E8F4F8",
              icon: Moon,
            },
            {
              title: "Activity Level",
              value: row.activity_level, // text like "Highly Active"
              unit: "",
              status: row.activity_level,
              color: "#FEF7E8",
              icon: Activity,
            },
          ];

          setVitals(updatedVitals);
        },
      });
    };

    fetchData(); // run once on mount
  }, []);

  const progress = Math.min(((steps / goal) * 100).toFixed(0), 100);

  return (
    <div className="space-y-4 pb-24">
      {/* Main Health Scores - More Compact */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800 px-1">Health Overview</h2>
        <div className="grid grid-cols-3 gap-3">
          {healthMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg shadow-gray-200/30" style={{ backgroundColor: metric.color }}>
                  <CardContent className="p-3">
                    <div className="text-center space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mx-auto">
                        <IconComponent className="w-4 h-4 text-gray-700" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-800">{metric.value}<span className="text-sm">{metric.unit}</span></div>
                        <p className="text-xs text-gray-600 font-medium">{metric.title}</p>
                        <p className="text-xs text-gray-500">{metric.status}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Current Vitals */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 px-1">Current Vitals</h2>
        <div className="grid grid-cols-2 gap-3">
          {vitals.map((vital, index) => {
            const IconComponent = vital.icon;
            return (
              <motion.div
                key={vital.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (index + 3) * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="border-0 shadow-lg shadow-gray-200/30 h-32" style={{ backgroundColor: vital.color }}>
                  <CardContent className="p-4 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-gray-700" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-baseline space-x-1 mb-1">
                        <span className="text-xl font-bold text-gray-800">
                          {typeof vital.value === 'number' && vital.value > 1000 
                            ? vital.value.toLocaleString() 
                            : vital.value}
                        </span>
                        <span className="text-xs text-gray-600">{vital.unit}</span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">{vital.title}</p>
                      <p className="text-xs text-gray-400">{vital.status}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Today's Activity Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="border-0 shadow-lg shadow-gray-200/30" style={{ backgroundColor: '#B8F2E6' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Today's Activity</h3>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-gray-700" />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{steps}</div>
                <div className="text-xs text-gray-500">Steps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">3.2</div>
                <div className="text-xs text-gray-500">Miles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">420</div>
                <div className="text-xs text-gray-500">Calories</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Daily Goal Progress</span>
                <span className="text-sm font-medium text-gray-800">{progress}%</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Health Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Card className="border-0 shadow-lg shadow-gray-200/30" style={{ backgroundColor: '#FFF2CC' }}>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">AI Health Insights</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-xl">
                <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#E8F5E8' }}></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Great heart rate variability</p>
                  <p className="text-xs text-gray-500">Your recovery is on track. Keep up the good work!</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-xl">
                <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#E8F4F8' }}></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Optimal sleep pattern</p>
                  <p className="text-xs text-gray-500">You've maintained consistent sleep for 5 days.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-xl">
                <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#FEF7E8' }}></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Increase daily steps</p>
                  <p className="text-xs text-gray-500">You're 1,753 steps away from your daily goal.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
