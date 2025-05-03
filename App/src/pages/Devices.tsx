import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, Filter, Download } from 'lucide-react';

// Mock data - would be fetched from your Go backend
const mockDevices = [
  { id: '1', name: 'PLC Controller A', type: 'PLC', ip: '192.168.1.101', status: 'online', location: 'Plant 1, Line A' },
  { id: '2', name: 'Temperature Sensor B', type: 'Sensor', ip: '192.168.1.102', status: 'warning', location: 'Plant 1, Line B' },
  { id: '3', name: 'Conveyor Motor C', type: 'Motor', ip: '192.168.1.103', status: 'offline', location: 'Plant 1, Line C' },
  { id: '4', name: 'Flow Meter D', type: 'Meter', ip: '192.168.1.104', status: 'online', location: 'Plant 2, Line A' },
  { id: '5', name: 'Pressure Gauge E', type: 'Gauge', ip: '192.168.1.105', status: 'online', location: 'Plant 2, Line B' },
  { id: '6', name: 'Level Sensor F', type: 'Sensor', ip: '192.168.1.106', status: 'warning', location: 'Plant 2, Line C' },
  { id: '7', name: 'PLC Controller G', type: 'PLC', ip: '192.168.1.107', status: 'online', location: 'Plant 3, Line A' },
  { id: '8', name: 'HVAC Controller H', type: 'Controller', ip: '192.168.1.108', status: 'online', location: 'Plant 3, Line B' },
];

const Devices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredDevices = mockDevices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          device.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || device.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'status-online';
      case 'offline': return 'status-offline';
      case 'warning': return 'status-warning';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Devices</h1>
        <button className="btn btn-primary flex items-center">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Device
        </button>
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
                placeholder="Search devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-slate-400 mr-1" />
                <span className="text-sm text-slate-600 dark:text-slate-400 mr-2">Status:</span>
                <select
                  className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm rounded-md focus:ring-teal-500 focus:border-teal-500 p-1.5"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="online">Online</option>
                  <option value="warning">Warning</option>
                  <option value="offline">Offline</option>
                </select>
              </div>

              <button className="btn btn-secondary flex items-center text-sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-grid w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>IP Address</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.length > 0 ? (
                filteredDevices.map((device) => (
                  <tr key={device.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60">
                    <td>
                      <Link 
                        to={`/devices/${device.id}`}
                        className="font-medium text-teal-600 hover:text-teal-700"
                      >
                        {device.name}
                      </Link>
                    </td>
                    <td>{device.type}</td>
                    <td>{device.ip}</td>
                    <td>{device.location}</td>
                    <td>
                      <span className={`status-badge ${getStatusColor(device.status)}`}>
                        {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <button 
                          className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
                          title="Edit device"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button 
                          className="text-slate-600 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
                          title="Delete device"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-slate-500 dark:text-slate-400">
                    No devices match your search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing {filteredDevices.length} of {mockDevices.length} devices
          </p>
          <div className="flex items-center space-x-2">
            <button
              className="btn btn-secondary px-3 py-1 text-sm disabled:opacity-50"
              disabled={true}
            >
              Previous
            </button>
            <span className="text-sm text-slate-600 dark:text-slate-400">Page 1 of 1</span>
            <button
              className="btn btn-secondary px-3 py-1 text-sm disabled:opacity-50"
              disabled={true}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devices;