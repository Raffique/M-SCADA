import React, { useState } from 'react';
import { Bell, Filter, Search, CheckCircle } from 'lucide-react';

// Mock data - replace with API calls
const mockAlarms = [
  {
    id: 1,
    device: 'PLC Controller A',
    message: 'High temperature warning',
    severity: 'warning',
    timestamp: '2025-03-15T10:24:18',
    acknowledged: false
  },
  {
    id: 2,
    device: 'Temperature Sensor B',
    message: 'Connection lost',
    severity: 'critical',
    timestamp: '2025-03-15T09:15:36',
    acknowledged: false
  },
  {
    id: 3,
    device: 'Flow Meter D',
    message: 'Low flow rate detected',
    severity: 'warning',
    timestamp: '2025-03-15T08:48:30',
    acknowledged: true
  }
];

const Alarms: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterAcknowledged, setFilterAcknowledged] = useState('all');

  const filteredAlarms = mockAlarms.filter(alarm => {
    const matchesSearch = 
      alarm.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alarm.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = filterSeverity === 'all' || alarm.severity === filterSeverity;
    const matchesAcknowledged = filterAcknowledged === 'all' || 
      (filterAcknowledged === 'acknowledged' ? alarm.acknowledged : !alarm.acknowledged);
    
    return matchesSearch && matchesSeverity && matchesAcknowledged;
  });

  const handleAcknowledge = (id: number) => {
    // In a real app, this would make an API call
    console.log(`Acknowledging alarm ${id}`);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      case 'warning': return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30';
      case 'info': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      default: return 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Alarms</h1>
      </div>

      <div className="card">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="Search alarms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-slate-400 mr-1" />
                <span className="text-sm text-slate-600 dark:text-slate-400 mr-2">Severity:</span>
                <select
                  className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm rounded-md focus:ring-teal-500 focus:border-teal-500 p-1.5"
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="critical">Critical</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                </select>
              </div>

              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-slate-400 mr-1" />
                <span className="text-sm text-slate-600 dark:text-slate-400 mr-2">Status:</span>
                <select
                  className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm rounded-md focus:ring-teal-500 focus:border-teal-500 p-1.5"
                  value={filterAcknowledged}
                  onChange={(e) => setFilterAcknowledged(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="unacknowledged">Unacknowledged</option>
                  <option value="acknowledged">Acknowledged</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {filteredAlarms.length > 0 ? (
            filteredAlarms.map((alarm) => (
              <div key={alarm.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/60">
                <div className="flex items-start">
                  <div className={`p-2 rounded-md mr-3 ${getSeverityColor(alarm.severity)}`}>
                    <Bell className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                          {alarm.device}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                          {alarm.message}
                        </p>
                      </div>
                      {!alarm.acknowledged && (
                        <button
                          onClick={() => handleAcknowledge(alarm.id)}
                          className="text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 flex items-center"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Acknowledge
                        </button>
                      )}
                    </div>
                    <div className="mt-2 flex items-center text-xs text-slate-500 dark:text-slate-400">
                      <span className={`px-2 py-1 rounded-full ${getSeverityColor(alarm.severity)}`}>
                        {alarm.severity.charAt(0).toUpperCase() + alarm.severity.slice(1)}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{new Date(alarm.timestamp).toLocaleString()}</span>
                      {alarm.acknowledged && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="flex items-center text-green-600 dark:text-green-400">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Acknowledged
                          </span>
                        </>
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
            Showing {filteredAlarms.length} of {mockAlarms.length} alarms
          </p>
        </div>
      </div>
    </div>
  );
};

export default Alarms;