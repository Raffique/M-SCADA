import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface TimeRange {
  label: string;
  hours: number;
}

const timeRanges: TimeRange[] = [
  { label: 'Last Hour', hours: 1 },
  { label: 'Last 6 Hours', hours: 6 },
  { label: 'Last 24 Hours', hours: 24 },
  { label: 'Last Week', hours: 168 }
];

const generateMockData = (hours: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      time: format(time, 'HH:mm'),
      pressure: Math.random() * 10 + 45,
      flow: Math.random() * 20 + 30,
      level: Math.random() * 15 + 60
    });
  }
  
  return data;
};

const LiveCharts: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>(timeRanges[1]);
  const [selectedMetrics, setSelectedMetrics] = useState({
    pressure: true,
    flow: true,
    level: true
  });
  
  const data = generateMockData(selectedRange.hours);
  
  const chartData = {
    labels: data.map(d => d.time),
    datasets: [
      selectedMetrics.pressure && {
        label: 'Pressure (PSI)',
        data: data.map(d => d.pressure),
        borderColor: '#0ea5e9',
        backgroundColor: '#0ea5e9',
        tension: 0.4
      },
      selectedMetrics.flow && {
        label: 'Flow Rate (m³/h)',
        data: data.map(d => d.flow),
        borderColor: '#10b981',
        backgroundColor: '#10b981',
        tension: 0.4
      },
      selectedMetrics.level && {
        label: 'Tank Level (%)',
        data: data.map(d => d.level),
        borderColor: '#f59e0b',
        backgroundColor: '#f59e0b',
        tension: 0.4
      }
    ].filter(Boolean)
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="card">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="font-medium text-slate-900 dark:text-white">Live System Metrics</h2>
          
          <div className="flex flex-wrap items-center gap-4">
            <select
              className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md text-sm"
              value={selectedRange.hours}
              onChange={(e) => setSelectedRange(
                timeRanges.find(r => r.hours === Number(e.target.value)) || timeRanges[0]
              )}
            >
              {timeRanges.map((range) => (
                <option key={range.hours} value={range.hours}>
                  {range.label}
                </option>
              ))}
            </select>
            
            <div className="flex items-center gap-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-teal-600"
                  checked={selectedMetrics.pressure}
                  onChange={(e) => setSelectedMetrics({
                    ...selectedMetrics,
                    pressure: e.target.checked
                  })}
                />
                <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">Pressure</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-teal-600"
                  checked={selectedMetrics.flow}
                  onChange={(e) => setSelectedMetrics({
                    ...selectedMetrics,
                    flow: e.target.checked
                  })}
                />
                <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">Flow</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-teal-600"
                  checked={selectedMetrics.level}
                  onChange={(e) => setSelectedMetrics({
                    ...selectedMetrics,
                    level: e.target.checked
                  })}
                />
                <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">Level</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="h-[400px]">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default LiveCharts;