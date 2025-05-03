import React from 'react';
import { Bell, Clock } from 'lucide-react';

interface Alarm {
  id: number;
  device: string;
  message: string;
  level: string;
  time: string;
}

interface AlarmsSummaryProps {
  alarms: Alarm[];
}

const AlarmsSummary: React.FC<AlarmsSummaryProps> = ({ alarms }) => {
  const getAlarmColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600 dark:text-red-400';
      case 'warning': return 'text-amber-600 dark:text-amber-400';
      case 'info': return 'text-blue-600 dark:text-blue-400';
      default: return 'text-slate-600 dark:text-slate-400';
    }
  };

  const getAlarmIcon = (level: string) => {
    switch (level) {
      case 'critical':
        return <Bell className={`h-5 w-5 ${getAlarmColor(level)}`} />;
      case 'warning':
        return <Bell className={`h-5 w-5 ${getAlarmColor(level)}`} />;
      case 'info':
        return <Bell className={`h-5 w-5 ${getAlarmColor(level)}`} />;
      default:
        return <Bell className={`h-5 w-5 ${getAlarmColor(level)}`} />;
    }
  };

  return (
    <div className="space-y-2">
      {alarms.length > 0 ? (
        alarms.map((alarm) => (
          <div 
            key={alarm.id} 
            className="p-3 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">
                {getAlarmIcon(alarm.level)}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${getAlarmColor(alarm.level)}`}>
                  {alarm.device}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {alarm.message}
                </p>
                <div className="flex items-center mt-2 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="h-3 w-3 mr-1" />
                  {alarm.time}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-4 text-slate-500 dark:text-slate-400">
          <p>No active alarms</p>
        </div>
      )}
      
      {alarms.length > 0 && (
        <div className="mt-4 text-center">
          <a 
            href="/alarms" 
            className="text-sm font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
          >
            View all alarms
          </a>
        </div>
      )}
    </div>
  );
};

export default AlarmsSummary;