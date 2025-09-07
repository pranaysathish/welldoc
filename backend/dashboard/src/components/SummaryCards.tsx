import { Users, AlertTriangle, TrendingUp, Activity } from 'lucide-react';

interface SummaryCardsProps {
  summary: {
    risk_distribution: {
      [key: string]: {
        count: number;
        percentage: number;
      };
    };
    high_risk_alerts: number;
    critical_risk_alerts: number;
  };
  totalPatients: number;
}

export default function SummaryCards({ summary, totalPatients }: SummaryCardsProps) {
  const cards = [
    {
      title: 'Total Patients',
      value: totalPatients.toLocaleString(),
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Critical Risk',
      value: summary.critical_risk_alerts.toString(),
      subtitle: `${summary.risk_distribution['Critical Risk']?.percentage || 0}%`,
      icon: AlertTriangle,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'High Risk',
      value: (summary.high_risk_alerts - summary.critical_risk_alerts).toString(),
      subtitle: `${summary.risk_distribution['High Risk']?.percentage || 0}%`,
      icon: TrendingUp,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Low Risk',
      value: summary.risk_distribution['Low Risk']?.count?.toString() || '0',
      subtitle: `${summary.risk_distribution['Low Risk']?.percentage || 0}%`,
      icon: Activity,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <div key={index} className={`${card.bgColor} rounded-lg p-6 shadow-sm`}>
          <div className="flex items-center">
            <div className={`${card.color} rounded-lg p-3`}>
              <card.icon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <div className="flex items-baseline">
                <p className={`text-2xl font-semibold ${card.textColor}`}>
                  {card.value}
                </p>
                {card.subtitle && (
                  <p className="ml-2 text-sm text-gray-500">
                    {card.subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
