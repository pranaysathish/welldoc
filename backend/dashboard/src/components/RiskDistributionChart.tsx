import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface RiskDistributionChartProps {
  data: {
    [key: string]: {
      count: number;
      percentage: number;
    };
  };
}

const COLORS = {
  'Low Risk': '#10B981',
  'Medium Risk': '#F59E0B', 
  'High Risk': '#F97316',
  'Critical Risk': '#EF4444'
};

export default function RiskDistributionChart({ data }: RiskDistributionChartProps) {
  // Transform data for charts
  const chartData = Object.entries(data).map(([level, stats]) => ({
    level: level.replace(' Risk', ''),
    count: stats.count,
    percentage: stats.percentage,
    fill: COLORS[level as keyof typeof COLORS]
  }));

  const pieData = Object.entries(data).map(([level, stats]) => ({
    name: level,
    value: stats.count,
    percentage: stats.percentage,
    fill: COLORS[level as keyof typeof COLORS]
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Risk Distribution Analysis</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-4 text-center">Patient Count by Risk Level</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="level" 
                tick={{ fontSize: 12 }}
                interval={0}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `${value.toLocaleString()} patients`, 
                  'Count'
                ]}
                labelFormatter={(label: string) => `${label} Risk`}
              />
              <Bar 
                dataKey="count" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-4 text-center">Risk Distribution Breakdown</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value.toLocaleString()} patients`, 'Count']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
        {Object.entries(data).map(([level, stats]) => (
          <div key={level} className="text-center">
            <div 
              className="w-4 h-4 rounded mx-auto mb-2"
              style={{ backgroundColor: COLORS[level as keyof typeof COLORS] }}
            ></div>
            <div className="text-sm font-medium text-gray-900">{level}</div>
            <div className="text-lg font-bold text-gray-700">{stats.count.toLocaleString()}</div>
            <div className="text-xs text-gray-500">{stats.percentage}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
