import React, { useState } from 'react';
import { BarChart, Download, Filter, Calendar } from 'lucide-react';

// Mock data - replace with API calls
const mockReports = [
  {
    id: 1,
    name: 'Daily Production Overview',
    type: 'Production',
    lastGenerated: '2025-03-15T10:00:00',
    status: 'completed'
  },
  {
    id: 2,
    name: 'Equipment Maintenance Log',
    type: 'Maintenance',
    lastGenerated: '2025-03-14T15:30:00',
    status: 'completed'
  },
  {
    id: 3,
    name: 'Energy Consumption Analysis',
    type: 'Efficiency',
    lastGenerated: '2025-03-14T08:45:00',
    status: 'completed'
  },
  {
    id: 4,
    name: 'Monthly Performance Report',
    type: 'Performance',
    lastGenerated: '2025-03-01T00:00:00',
    status: 'scheduled'
  }
];

const Reports: React.FC = () => {
  const [filterType, setFilterType] = useState('all');

  const filteredReports = mockReports.filter(report => 
    filterType === 'all' || report.type.toLowerCase() === filterType.toLowerCase()
  );

  const handleGenerateReport = (id: number) => {
    // In a real app, this would trigger report generation
    console.log(`Generating report ${id}`);
  };

  const handleDownloadReport = (id: number) => {
    // In a real app, this would download the report
    console.log(`Downloading report ${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reports</h1>
        <button className="btn btn-primary flex items-center">
          <BarChart className="h-4 w-4 mr-2" />
          Generate New Report
        </button>
      </div>

      <div className="card">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-slate-400 mr-1" />
              <span className="text-sm text-slate-600 dark:text-slate-400 mr-2">Report Type:</span>
              <select
                className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm rounded-md focus:ring-teal-500 focus:border-teal-500 p-1.5"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="production">Production</option>
                <option value="maintenance">Maintenance</option>
                <option value="efficiency">Efficiency</option>
                <option value="performance">Performance</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {filteredReports.map((report) => (
            <div key={report.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/60">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                    {report.name}
                  </h3>
                  <div className="mt-1 flex items-center text-xs text-slate-500 dark:text-slate-400">
                    <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700">
                      {report.type}
                    </span>
                    <span className="mx-2">•</span>
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>
                      Last generated: {new Date(report.lastGenerated).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleGenerateReport(report.id)}
                    className="btn btn-secondary text-sm"
                  >
                    <BarChart className="h-4 w-4 mr-1" />
                    Generate
                  </button>
                  <button
                    onClick={() => handleDownloadReport(report.id)}
                    className="btn btn-secondary text-sm"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Templates */}
      <div className="card">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="font-medium text-slate-900 dark:text-white">Report Templates</h2>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer">
            <h3 className="font-medium text-slate-900 dark:text-white">Production Overview</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Daily production metrics and KPIs
            </p>
          </div>
          <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer">
            <h3 className="font-medium text-slate-900 dark:text-white">Maintenance Log</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Equipment maintenance history and schedules
            </p>
          </div>
          <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer">
            <h3 className="font-medium text-slate-900 dark:text-white">Efficiency Analysis</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Resource utilization and efficiency metrics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;