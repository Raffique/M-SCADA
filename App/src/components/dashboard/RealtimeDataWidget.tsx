import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface DataPoint {
  id: number;
  name: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
}

interface RealtimeDataWidgetProps {
  data: DataPoint[];
}

const RealtimeDataWidget: React.FC<RealtimeDataWidgetProps> = ({ data }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable':
      default:
        return <Minus className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div 
          key={item.id}
          className="flex items-center justify-between p-3 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
        >
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {item.name}
          </span>
          <div className="flex items-center">
            <span className="text-sm font-medium text-slate-900 dark:text-white mr-2">
              {item.value}
            </span>
            {getTrendIcon(item.trend)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RealtimeDataWidget;