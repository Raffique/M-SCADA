import React from 'react';
import GaugeChart from 'react-gauge-chart';
import { Droplet, Wind, Zap, FlaskConical } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  min: number;
  max: number;
  warning?: number;
  critical?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  icon,
  min,
  max,
  warning = 0.7,
  critical = 0.9
}) => {
  const percentage = (value - min) / (max - min);
  
  const getColor = (percent: number) => {
    if (percent >= critical) return '#ef4444';
    if (percent >= warning) return '#f59e0b';
    return '#10b981';
  };

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400">
            {icon}
          </div>
          <h3 className="ml-3 font-medium text-slate-900 dark:text-white">{title}</h3>
        </div>
        <span className="text-sm text-slate-500 dark:text-slate-400">{unit}</span>
      </div>
      
      <div className="h-32">
        <GaugeChart
          id={`gauge-${title}`}
          nrOfLevels={20}
          percent={percentage}
          colors={[getColor(percentage)]}
          arcWidth={0.3}
          textColor="transparent"
        />
      </div>
      
      <div className="text-center mt-2">
        <span className="text-2xl font-bold text-slate-900 dark:text-white">
          {value.toFixed(1)}
        </span>
        <span className="ml-1 text-sm text-slate-500 dark:text-slate-400">
          {unit}
        </span>
      </div>
    </div>
  );
};

const SystemMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Tank Level"
        value={75.5}
        unit="%"
        icon={<Droplet className="h-5 w-5" />}
        min={0}
        max={100}
      />
      <MetricCard
        title="Flow Rate"
        value={42.3}
        unit="m³/h"
        icon={<Wind className="h-5 w-5" />}
        min={0}
        max={100}
      />
      <MetricCard
        title="Power Usage"
        value={8.7}
        unit="kW"
        icon={<Zap className="h-5 w-5" />}
        min={0}
        max={15}
      />
      <MetricCard
        title="pH Level"
        value={6.8}
        unit="pH"
        icon={<FlaskConical className="h-5 w-5" />}
        min={0}
        max={14}
        warning={0.6}
        critical={0.8}
      />
    </div>
  );
};

export default SystemMetrics;