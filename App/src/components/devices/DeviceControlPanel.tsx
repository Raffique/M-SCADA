import React, { useState } from 'react';
import { HardDrive, Power, RefreshCw, Shield, AlertCircle, Settings, Save } from 'lucide-react';

interface DeviceControlPanelProps {
  device: any; // You would use a more specific type in a real application
}

const DeviceControlPanel: React.FC<DeviceControlPanelProps> = ({ device }) => {
  const [loading, setLoading] = useState(false);
  const [controls, setControls] = useState({
    motorSpeed: device.tags?.find((tag: any) => tag.name === 'Motor Speed')?.value || '1450',
    temperature: device.tags?.find((tag: any) => tag.name === 'Temperature')?.value || '78.5',
  });

  const handleControlChange = (name: string, value: string) => {
    setControls(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setLoading(true);
    // Simulate API call to update device
    setTimeout(() => {
      setLoading(false);
      // Show success notification here
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h2 className="font-medium text-slate-900 dark:text-white">Device Controls</h2>
          <div className="flex space-x-2">
            <button 
              className="btn btn-secondary flex items-center text-sm"
              disabled={loading}
            >
              <RefreshCw className="h-4 w-4 mr-1.5" />
              Refresh
            </button>
            <button 
              className="btn btn-primary flex items-center text-sm"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 mr-1.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-1.5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 p-2 rounded-md mr-3">
                  <Power className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-slate-900 dark:text-white">Power Control</h3>
              </div>
              
              <div className="space-y-3">
                <button className="w-full btn btn-primary">
                  Start Device
                </button>
                <button className="w-full btn btn-secondary">
                  Stop Device
                </button>
                <button className="w-full btn btn-secondary">
                  Restart Device
                </button>
              </div>
            </div>

            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 p-2 rounded-md mr-3">
                  <Settings className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-slate-900 dark:text-white">Parameter Control</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="motorSpeed" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Motor Speed (RPM)
                  </label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      id="motorSpeed"
                      min="0"
                      max="3000"
                      step="10"
                      value={controls.motorSpeed}
                      onChange={(e) => handleControlChange('motorSpeed', e.target.value)}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="ml-3 w-16 text-center text-sm font-medium text-slate-900 dark:text-white">
                      {controls.motorSpeed}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="temperature" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Temperature Setpoint (°F)
                  </label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      id="temperature"
                      min="50"
                      max="100"
                      step="0.5"
                      value={controls.temperature}
                      onChange={(e) => handleControlChange('temperature', e.target.value)}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="ml-3 w-16 text-center text-sm font-medium text-slate-900 dark:text-white">
                      {controls.temperature}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="font-medium text-slate-900 dark:text-white">Maintenance Controls</h2>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-3 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <Shield className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-2" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Run Diagnostics
              </span>
            </button>
            
            <button className="p-3 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <HardDrive className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-2" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Update Firmware
              </span>
            </button>
            
            <button className="p-3 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <AlertCircle className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-2" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Reset Alarms
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceControlPanel;