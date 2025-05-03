import React from 'react';
import { Link } from 'react-router-dom';
import { HardDrive, Clock, AlertCircle } from 'lucide-react';

interface DeviceStatusCardProps {
  device: {
    id: number;
    name: string;
    status: string;
    type: string;
    lastSeen: string;
    alerts: number;
  };
}

const DeviceStatusCard: React.FC<DeviceStatusCardProps> = ({ device }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'warning': return 'bg-amber-500';
      default: return 'bg-slate-500';
    }
  };

  const getTypeIcon = (type: string) => {
    // You could have different icons for different device types
    return <HardDrive className="h-5 w-5" />;
  };

  return (
    <div className="border-b border-slate-200 dark:border-slate-700 last:border-b-0">
      <div className="px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className={`flex-shrink-0 rounded-md p-2 ${
            device.status === 'online' 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : device.status === 'warning'
              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {getTypeIcon(device.type)}
          </div>
          <div>
            <Link 
              to={`/devices/${device.id}`}
              className="text-sm font-medium text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400"
            >
              {device.name}
            </Link>
            <div className="flex items-center mt-1">
              <div className={`h-2 w-2 rounded-full ${getStatusColor(device.status)}`}></div>
              <span className="ml-1.5 text-xs text-slate-500 dark:text-slate-400 capitalize">{device.status}</span>
              <div className="mx-2 h-0.5 w-0.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
              <Clock className="h-3 w-3 text-slate-400" />
              <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">{device.lastSeen}</span>
            </div>
          </div>
        </div>
        
        {device.alerts > 0 && (
          <div className="flex items-center text-amber-600 dark:text-amber-400">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">{device.alerts} {device.alerts === 1 ? 'alert' : 'alerts'}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceStatusCard;