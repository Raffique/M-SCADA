import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface SystemStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down';
}

interface SystemStatusWidgetProps {
  systems: SystemStatus[];
}

const SystemStatusWidget: React.FC<SystemStatusWidgetProps> = ({ systems }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'down':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational':
        return 'Operational';
      case 'degraded':
        return 'Degraded';
      case 'down':
        return 'Down';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-3">
      {systems.map((system, index) => (
        <div 
          key={index}
          className="flex items-center justify-between p-3 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
        >
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {system.name}
          </span>
          <div className="flex items-center">
            {getStatusIcon(system.status)}
            <span className={`ml-1.5 text-sm ${
              system.status === 'operational'
                ? 'text-green-600 dark:text-green-400'
                : system.status === 'degraded'
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {getStatusText(system.status)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SystemStatusWidget;