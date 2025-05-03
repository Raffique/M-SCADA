import React, { useEffect, useRef } from 'react';

interface DeviceDataChartProps {
  data: Array<Record<string, any>>;
  dataKey: string;
  nameKey: string;
  color?: string;
}

const DeviceDataChart: React.FC<DeviceDataChartProps> = ({ 
  data, 
  dataKey, 
  nameKey,
  color = '#0D9488' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !data || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Find min and max values for scaling
    const values = data.map(item => Number(item[dataKey]));
    const min = Math.min(...values) * 0.9; // Add 10% padding
    const max = Math.max(...values) * 1.1; // Add 10% padding

    // Calculate dimensions
    const padding = 40;
    const chartWidth = canvas.width - (padding * 2);
    const chartHeight = canvas.height - (padding * 2);

    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#CBD5E1'; // slate-300
    ctx.lineWidth = 1;
    
    // Y-axis
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    
    // X-axis
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Draw grid lines
    const gridCount = 5;
    ctx.beginPath();
    ctx.strokeStyle = '#E2E8F0'; // slate-200
    ctx.lineWidth = 0.5;
    
    // Horizontal grid lines
    for (let i = 1; i < gridCount; i++) {
      const y = padding + (chartHeight * i / gridCount);
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
    }
    ctx.stroke();

    // Draw line chart
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';

    // Calculate points
    data.forEach((item, index) => {
      const value = Number(item[dataKey]);
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((value - min) / (max - min)) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw points
    data.forEach((item, index) => {
      const value = Number(item[dataKey]);
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((value - min) / (max - min)) * chartHeight;
      
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw labels
    ctx.fillStyle = '#64748B'; // slate-500
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    
    // X-axis labels (times) - show a few, not all
    const labelCount = Math.min(6, data.length);
    for (let i = 0; i < labelCount; i++) {
      const index = Math.floor(i * (data.length - 1) / (labelCount - 1));
      const item = data[index];
      const time = new Date(item[nameKey]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = canvas.height - padding + 15;
      
      ctx.fillText(time, x, y);
    }

    // Y-axis labels (values)
    ctx.textAlign = 'right';
    for (let i = 0; i <= gridCount; i++) {
      const value = min + (max - min) * (i / gridCount);
      const y = canvas.height - padding - (i / gridCount) * chartHeight;
      
      ctx.fillText(value.toFixed(1), padding - 5, y + 3);
    }

  }, [data, dataKey, nameKey, color]);

  return (
    <div className="w-full h-full">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      ></canvas>
    </div>
  );
};

export default DeviceDataChart;