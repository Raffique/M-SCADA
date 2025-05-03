import React, { useState, useEffect } from 'react';
import { Bell, Clock, HardDrive, AlertTriangle } from 'lucide-react';
import DeviceStatusCard from '../components/dashboard/DeviceStatusCard';
import DeviceOverviewChart from '../components/dashboard/DeviceOverviewChart';
import AlarmsSummary from '../components/dashboard/AlarmsSummary';
import RealtimeDataWidget from '../components/dashboard/RealtimeDataWidget';
import SystemStatusWidget from '../components/dashboard/SystemStatusWidget';

// Mock data - would be fetched from your Go backend
const mockDeviceStatus = [
  { id: 1, name: 'PLC Controller A', status: 'online', type: 'plc', lastSeen: '2 mins ago', alerts: 0 },
  { id: 2, name: 'Temperature Sensor B', status: 'warning', type: 'sensor', lastSeen: '1 min ago', alerts: 2 },
  { id: 3, name: 'Conveyor Motor C', status: 'offline', type: 'motor', lastSeen: '2 hours ago', alerts: 1 },
  { id: 4, name: 'Flow Meter D', status: 'online', type: 'meter', lastSeen: 'just now', alerts: 0 },
  { id: 5, name: 'Pressure Gauge E', status: 'online', type: 'gauge', lastSeen: '5 mins ago', alerts: 0 },
];

const mockAlarms = [
  { id: 1, device: 'Temperature Sensor B', message: 'High temperature threshold exceeded', level: 'warning', time: '10 minutes ago' },
  { id: 2, device: 'Conveyor Motor C', message: 'Connection lost', level: 'critical', time: '2 hours ago' },
  { id: 3, device: 'Flow Meter D', message: 'Low flow rate detected', level: 'warning', time: '1 hour ago' },
];

const Dashboard: React.FC = () => {
  const [deviceCount, setDeviceCount] = useState({ total: 0, online: 0, warning: 0, offline: 0 });
  
  useEffect(() => {
    // Calculate device counts from mock data
    // In a real app, this would be fetched from the backend
    const counts = mockDeviceStatus.reduce(
      (acc, device) => {
        acc.total++;
        acc[device.status]++;
        return acc;
      },
      { total: 0, online: 0, warning: 0, offline: 0 }
    );
    
    setDeviceCount(counts);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
          <Clock className="inline-block h-4 w-4 mr-1" />
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center">
            <div className="rounded-full p-2 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300">
              <HardDrive className="h-6 w-6" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Devices</p>
              <p className="text-xl font-semibold text-slate-900 dark:text-white">{deviceCount.total}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center">
            <div className="rounded-full p-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300">
              <HardDrive className="h-6 w-6" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Online Devices</p>
              <p className="text-xl font-semibold text-green-600 dark:text-green-400">{deviceCount.online}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center">
            <div className="rounded-full p-2 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Warning Status</p>
              <p className="text-xl font-semibold text-amber-600 dark:text-amber-400">{deviceCount.warning}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center">
            <div className="rounded-full p-2 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300">
              <Bell className="h-6 w-6" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Alarms</p>
              <p className="text-xl font-semibold text-red-600 dark:text-red-400">{mockAlarms.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Status Section */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
              <h2 className="font-medium text-slate-900 dark:text-white">Device Overview</h2>
            </div>
            <div className="p-4">
              <DeviceOverviewChart 
                data={[
                  { name: 'Online', value: deviceCount.online, color: '#10B981' },
                  { name: 'Warning', value: deviceCount.warning, color: '#F59E0B' },
                  { name: 'Offline', value: deviceCount.offline, color: '#EF4444' },
                ]}
              />
            </div>
          </div>
          
          <div className="mt-6 card">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
              <h2 className="font-medium text-slate-900 dark:text-white">Device Status</h2>
            </div>
            <div>
              {mockDeviceStatus.map((device) => (
                <DeviceStatusCard key={device.id} device={device} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="card">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
              <h2 className="font-medium text-slate-900 dark:text-white">Alarms</h2>
            </div>
            <div className="p-4">
              <AlarmsSummary alarms={mockAlarms} />
            </div>
          </div>

          <div className="card">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
              <h2 className="font-medium text-slate-900 dark:text-white">Realtime Data</h2>
            </div>
            <div className="p-4">
              <RealtimeDataWidget 
                data={[
                  { id: 1, name: 'Temperature', value: '78.5°F', trend: 'up' },
                  { id: 2, name: 'Pressure', value: '34.2 PSI', trend: 'stable' },
                  { id: 3, name: 'Flow Rate', value: '12.3 GPM', trend: 'down' },
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
                  { name: 'Database', status: 'operational' },
                  { name: 'API Gateway', status: 'operational' },
                  { name: 'Notification Service', status: 'degraded' },
                  { name: 'Device Connector', status: 'operational' },
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