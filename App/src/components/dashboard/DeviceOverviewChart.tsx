import React, { useEffect, useRef } from 'react';

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface DeviceOverviewChartProps {
  data: ChartData[];
}

const DeviceOverviewChart: React.FC<DeviceOverviewChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate total
    const total = data.reduce((acc, item) => acc + item.value, 0);
    if (total === 0) return;

    // Draw donut chart
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    const innerRadius = radius * 0.6;

    let startAngle = 0;
    
    // Draw segments
    data.forEach((item) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      
      ctx.fillStyle = item.color;
      ctx.fill();
      
      // Draw inner circle to create donut
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim() || '#f8fafc';
      if (document.documentElement.classList.contains('dark')) {
        ctx.fillStyle = '#0f172a'; // Dark mode background
      }
      ctx.fill();
      
      startAngle = endAngle;
    });

    // Draw text in center
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim() || '#0f172a';
    ctx.font = 'bold 24px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(total.toString(), centerX, centerY - 10);
    
    ctx.font = '14px Inter, system-ui, sans-serif';
    ctx.fillText('Devices', centerX, centerY + 15);

  }, [data]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="w-full md:w-1/2 h-64">
        <canvas
          ref={canvasRef}
          width={300}
          height={250}
        />
      </div>
      <div className="w-full md:w-1/2 mt-4 md:mt-0">
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-4 h-4 rounded-sm mr-2"
                style={{ backgroundColor: item.color }}
              ></div>
              <div className="flex justify-between items-center w-full">
                <span className="text-sm text-slate-700 dark:text-slate-300">{item.name}</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">{item.value}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                    ({total > 0 ? Math.round((item.value / total) * 100) : 0}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeviceOverviewChart;