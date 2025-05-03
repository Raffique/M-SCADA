import React, { useState } from 'react';
import { Bell, Clock, CheckCircle } from 'lucide-react';

interface Alarm {
  id: number;
  timestamp: string;
  message: string;
  severity: string;
  acknowledged: boolean;
}

interface DeviceAlarmHistoryProps {
  alarms: Alarm[];
}

const DeviceAlarmHistory: React.FC<DeviceAlarmHistoryProps> = ({ alarms }) => {
  const [filter, setFilter] = useState('all');

  const filteredAlarms = alarms.filter(alarm => {
    if (filter === 'all') return true;
    if (filter === 'unacknowledged') return !alarm.acknowledged;
    return alarm.severity === filter;
  });

  const getAlarmColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      case 'warning': return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30';
      case 'info': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      default: return 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700';
    }
  };

  const handleAcknowledge = (id: number) => {
    // In a real app, you would send this to your backend
    console.log(`Acknowledging alarm ${id}`);
  };

  return (
    <div className="card">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-slate-900 dark:text-white">Alarm History</h2>
          
          <div className="flex items-center space-x-2">
            <label htmlFor="alarm-filter" className="text-sm text-slate-600 dark:text-slate-400">
              Filter:
            </label>
            <select
              id="alarm-filter"
              className="text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 p-1"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Alarms</option>
              <option value="unacknowledged">Unacknowledged</option>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </select>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        {filteredAlarms.length > 0 ? (
          filteredAlarms.map((alarm) => (
            <div key={alarm.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/60">
              <div className="flex items-start">
                <div className={`p-2 rounded-md mr-3 ${getAlarmColor(alarm.severity)}`}>
                  <Bell className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {alarm.message}
                    </p>
                    {!alarm.acknowledged && (
                      <button
                        onClick={() => handleAcknowledge(alarm.id)}
                        className="text-xs text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 flex items-center"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Acknowledge
                      </button>
                    )}
                  </div>
                  <div className="mt-1 flex items-center text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(alarm.timestamp).toLocaleString()}
                    {alarm.acknowledged && (
                      <span className="ml-2 flex items-center text-green-600 dark:text-green-400">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Acknowledged
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-slate-500 dark:text-slate-400">
            No alarms match your filter criteria
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing {filteredAlarms.length} of {alarms.length} alarms
        </p>
      </div>
    </div>
  );
};

export default DeviceAlarmHistory;