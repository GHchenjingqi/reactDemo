import React, { useEffect, useRef, useState } from 'react';
import { Chart, Util } from '@antv/g2';

// 图表类型定义
type ChartType = 'interval' | 'line' | 'point' | 'area' | 'pie';

// 图表配置接口
interface ChartConfig {
  type: ChartType;
  encode: Record<string, string>;
  axis?: Record<string, any>;
  legend?: Record<string, any>;
  tooltip?: Record<string, any>;
  interactions?: string[];
  theme?: 'light' | 'dark';
}

// 组件属性
interface G2ChartProps {
  data: any[];
  config: ChartConfig;
  title?: string;
  description?: string;
  className?: string;
  style?: React.CSSProperties;
}

const G2Chart: React.FC<G2ChartProps> = ({
  data,
  config,
  title,
  description,
  className = '',
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const [chartKey, setChartKey] = useState(0); // 用于强制重绘

  // 渲染图表
  useEffect(() => {
    if (!containerRef.current) return;

    // 清理旧图表
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    // 创建新图表实例
    const container = containerRef.current;
    const initialWidth = container.offsetWidth || 400; 
    const initialHeight = container.offsetHeight || 300; 
    const chart = new Chart({
      container,
      width: initialWidth, 
      height: initialHeight,
      inset: 0, // 边距
      padding: 20, // 填充
      autoFit: true,
      theme: 'dark'
    });

    // 设置数据
    chart.data(data);

    // 根据配置创建标记
    const mark = chart[config.type]();
    
    // 设置编码
    mark.encode(config.encode);
    
    // 设置坐标轴
    if (config.axis) {
      Object.entries(config.axis).forEach(([key, value]) => {
        mark.axis(key, value);
      });
    }
    
    // 设置图例
    if (config.legend) {
      mark.legend(config.legend);
    }
    
    // 设置提示信息
    if (config.tooltip) {
      mark.tooltip(config.tooltip);
    }
    
    // 添加交互
    if (config.interactions) {
      config.interactions.forEach(interaction => {
        mark.interaction(interaction);
      });
    }
    
    // 添加动画
    mark.animate('enter', { animation: 'fade-in' })
       .animate('update', { animation: 'fade-in' });

    // 渲染图表
    chart.render();
    chartRef.current = chart;

    // 监听窗口大小变化
    const handleResize = Util.debounce(() => {
      chart.forceFit();
    }, 300);
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.destroy();
    };
  }, [data, config, chartKey]);

  // 当数据或配置变化时重绘图表
  useEffect(() => {
    setChartKey(prev => prev + 1);
  }, [data, config]);

  return (
    <div 
      className={`g2-chart-container ${className}`} 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '400px',
        ...style 
      }}
    >
      {title && <div className="chart-title">{title}</div>}
      {description && <div className="chart-description">{description}</div>}
      <div 
        ref={containerRef} 
        className="chart-wrapper" 
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default G2Chart;