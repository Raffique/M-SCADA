import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, DownloadCloud, Edit, Trash2, RefreshCw, Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import DeviceDataChart from '../components/devices/DeviceDataChart';
import DeviceControlPanel from '../components/devices/DeviceControlPanel';
import DeviceTagsTable from '../components/devices/DeviceTagsTable';
import DeviceAlarmHistory from '../components/devices/DeviceAlarmHistory';

// Mock device data - would be fetched from your Go backend
const deviceData = {
  '1': {
    id: '1',
    name: 'PLC Controller A',
    type: 'PLC',
    model: 'Siemens S7-1200',
    ip: '192.168.1.101',
    status: 'online',
    location: 'Plant 1, Line A',
    lastConnected: '2025-03-15T14:32:10',
    description: 'Main production line controller',
    tags: [
      { id: 1, name: 'Temperature', address: 'DB1.DBW0', dataType: 'REAL', value: '78.5', unit: '°F', access: 'Read/Write' },
      { id: 2, name: 'Pressure', address: 'DB1.DBW4', dataType: 'REAL', value: '34.2', unit: 'PSI', access: 'Read/Write' },
      { id: 3, name: 'Flow Rate', address: 'DB1.DBW8', dataType: 'REAL', value: '12.3', unit: 'GPM', access: 'Read/Write' },
      { id: 4, name: 'Motor Speed', address: 'DB2.DBW0', dataType: 'INT', value: '1450', unit: 'RPM', access: 'Read/Write' },
      { id: 5, name: 'Production Count', address: 'DB3.DBD0', dataType: 'DINT', value: '24589', unit: 'units', access: 'Read Only' },
      { id: 6, name: 'System Status', address: 'DB4.DBX0.0', dataType: 'BOOL', value: 'TRUE', unit: '', access: 'Read Only' },
    ],
    alarms: [
      { id: 1, timestamp: '2025-03-15T10:24:18', message: 'High temperature warning', severity: 'warning', acknowledged: true },
      { id: 2, timestamp: '2025-03-14T22:15:36', message: 'Connection restored', severity: 'info', acknowledged: true },
      { id: 3, timestamp: '2025-03-14T22:05:12', message: 'Connection lost', severity: 'critical', acknowledged: true },
      { id: 4, timestamp: '2025-03-13T15:48:30', message: 'Flow rate below minimum threshold', severity: 'warning', acknowledged: false },
    ],
    chartData: {
      temperature: Array.from({ length: 24 }, (_, i) => ({
        time: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
        value: 70 + Math.random() * 15
      })),
      pressure: Array.from({ length: 24 }, (_, i) => ({
        time: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
        value: 30 + Math.random() * 10
      })),
      flowRate: Array.from({ length: 24 }, (_, i) => ({
        time: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
        value: 10 + Math.random() * 5
      }))
    }
  },
  '2': {
    id: '2',
    name: 'Temperature Sensor B',
    type: 'Sensor',
    model: 'Omega RTD PT100',
    ip: '192.168.1.102',
    status: 'warning',
    location: 'Plant 1, Line B',
    lastConnected: '2025-03-15T14:30:22',
    description: 'Process temperature monitoring sensor',
    tags: [
      { id: 1, name: 'Temperature', address: 'AIN0', dataType: 'REAL', value: '92.7', unit: '°F', access: 'Read Only' },
      { id: 2, name: 'Battery Level', address: 'SYS0', dataType: 'INT', value: '67', unit: '%', access: 'Read Only' },
    ],
    alarms: [
      { id: 1, timestamp: '2025-03-15T13:12:05', message: 'High temperature threshold exceeded', severity: 'warning', acknowledged: false },
      { id: 2, timestamp: '2025-03-15T08:45:19', message: 'Battery level low', severity: 'warning', acknowledged: true },
      { id: 3, timestamp: '2025-03-14T09:22:48', message: 'Device restarted', severity: 'info', acknowledged: true },
    ],
    chartData: {
      temperature: Array.from({ length: 24 }, (_, i) => ({
        time: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
        value: 85 + Math.random() * 15
      })),
    }
  }
};

const DeviceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [device, setDevice] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch device details
    const fetchDevice = async () => {
      setLoading(true);
      try {
        // In a real app, this would be a fetch call to your Go backend
        // const response = await fetch(`/api/devices/${id}`);
        // const data = await response.json();
        
        // Using mock data for now
        setTimeout(() => {
          if (id && deviceData[id]) {
            setDevice(deviceData[id]);
          }
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching device:', error);
        setLoading(false);
      }
    };

    fetchDevice();
  }, [id]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call to refresh device data
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <Wifi className="h-5 w-5 text-green-500" />;
      case 'offline':
        return <WifiOff className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!device) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-slate-900 dark:text-white">Device not found</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">The device you're looking for doesn't exist or you don't have access to it.</p>
        <Link to="/devices" className="mt-4 inline-block btn btn-primary">
          Return to Devices
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button and header */}
      <div>
        <Link to="/devices" className="inline-flex items-center text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Devices
        </Link>
        
        <div className="mt-2 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{device.name}</h1>
            <div className="ml-2 flex-shrink-0">
              <span className={`status-badge ${device.status === 'online' ? 'status-online' : device.status === 'warning' ? 'status-warning' : 'status-offline'}`}>
                {getStatusIcon(device.status)}
                <span className="ml-1">{device.status.charAt(0).toUpperCase() + device.status.slice(1)}</span>
              </span>
            </div>
          </div>
          
          <div className="mt-2 sm:mt-0 flex space-x-2">
            <button 
              className="btn btn-secondary flex items-center text-sm"
              onClick={handleRefresh}
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button className="btn btn-secondary flex items-center text-sm">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </button>
            <button className="btn btn-danger flex items-center text-sm">
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </button>
          </div>
        </div>
      </div>
      
      {/* Device info card */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          <div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Device Type</h3>
            <p className="mt-1 text-sm text-slate-900 dark:text-white">{device.type}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Model</h3>
            <p className="mt-1 text-sm text-slate-900 dark:text-white">{device.model}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">IP Address</h3>
            <p className="mt-1 text-sm text-slate-900 dark:text-white">{device.ip}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Location</h3>
            <p className="mt-1 text-sm text-slate-900 dark:text-white">{device.location}</p>
          </div>
          <div className="md:col-span-2 lg:col-span-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Description</h3>
            <p className="mt-1 text-sm text-slate-900 dark:text-white">{device.description}</p>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-700">
        <nav className="-mb-px flex space-x-6">
          <button
            className={`py-2 px-1 text-sm font-medium border-b-2 ${
              activeTab === 'overview'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-2 px-1 text-sm font-medium border-b-2 ${
              activeTab === 'control'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
            onClick={() => setActiveTab('control')}
          >
            Control
          </button>
          <button
            className={`py-2 px-1 text-sm font-medium border-b-2 ${
              activeTab === 'tags'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
            onClick={() => setActiveTab('tags')}
          >
            Tags
          </button>
          <button
            className={`py-2 px-1 text-sm font-medium border-b-2 ${
              activeTab === 'alarms'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
            onClick={() => setActiveTab('alarms')}
          >
            Alarms
          </button>
        </nav>
      </div>
      
      {/* Tab content */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="card p-4">
              <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Device Metrics</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {device.chartData && Object.keys(device.chartData).map((key) => (
                  <div key={key} className="card border border-slate-200 dark:border-slate-700">
                    <div className="p-3 border-b border-slate-200 dark:border-slate-700">
                      <h3 className="text-sm font-medium text-slate-900 dark:text-white capitalize">{key}</h3>
                    </div>
                    <div className="p-4 h-64">
                      <DeviceDataChart 
                        data={device.chartData[key]} 
                        dataKey="value" 
                        nameKey="time"
                        color="#0D9488"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="card">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-medium text-slate-900 dark:text-white">Device Information</h2>
              </div>
              <div className="p-4">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                  <div>
                    <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Last Connected</dt>
                    <dd className="mt-1 text-sm text-slate-900 dark:text-white">
                      {new Date(device.lastConnected).toLocaleString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Status</dt>
                    <dd className="mt-1 text-sm text-slate-900 dark:text-white capitalize">{device.status}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Device ID</dt>
                    <dd className="mt-1 text-sm text-slate-900 dark:text-white">{device.id}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Tags</dt>
                    <dd className="mt-1 text-sm text-slate-900 dark:text-white">{device.tags.length}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}
        
        {/* Control Tab */}
        {activeTab === 'control' && (
          <DeviceControlPanel device={device} />
        )}
        
        {/* Tags Tab */}
        {activeTab === 'tags' && (
          <DeviceTagsTable tags={device.tags} />
        )}
        
        {/* Alarms Tab */}
        {activeTab === 'alarms' && (
          <DeviceAlarmHistory alarms={device.alarms} />
        )}
      </div>
    </div>
  );
};

export default DeviceDetail;