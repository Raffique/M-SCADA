import React from 'react';
import { Clock } from 'lucide-react';
import SystemMetrics from '../components/dashboard/SystemMetrics';
import LiveCharts from '../components/dashboard/LiveCharts';
import GISMap from '../components/dashboard/GISMap';
import AlarmsSummary from '../components/dashboard/AlarmsSummary';
import SystemStatusWidget from '../components/dashboard/SystemStatusWidget';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
          <Clock className="inline-block h-4 w-4 mr-1" />
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>

      {/* System Metrics */}
      <SystemMetrics />

      {/* Live Charts */}
      <LiveCharts />

      {/* Map and Status Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GISMap />
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
              <h2 className="font-medium text-slate-900 dark:text-white">Active Alarms</h2>
            </div>
            <div className="p-4">
              <AlarmsSummary 
                alarms={[
                  { id: 1, device: 'Pump Station B', message: 'High pressure warning', level: 'warning', time: '10 minutes ago' },
                  { id: 2, device: 'Storage Tank C', message: 'Connection lost', level: 'critical', time: '1 hour ago' }
                ]} 
              />
            </div>
          </div>

          <div className="card">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
              <h2 className="font-medium text-slate-900 dark:text-white">System Status</h2>
            </div>
            <div className="p-4">
              <SystemStatusWidget 
                systems={[
                  { name: 'SCADA Server', status: 'operational' },
                  { name: 'Data Collection', status: 'operational' },
                  { name: 'Communication', status: 'degraded' },
                  { name: 'Database', status: 'operational' }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;