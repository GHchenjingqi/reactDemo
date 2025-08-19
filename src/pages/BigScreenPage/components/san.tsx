import { Chart } from '@antv/g2';
import { useEffect, useRef } from 'react';

export default function G2Demo() {
  const container = useRef<HTMLDivElement>(null);
  const chart = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chart.current && container.current) {
      chart.current = renderBarChart(container.current);
    }

    return () => {
      if (chart.current) {
        chart.current.destroy();
        chart.current = null;
      }
    };
  }, []);

  // 渲染条形图
  function renderBarChart(container: HTMLElement) {
    const initialWidth = container.offsetWidth || 400;
    const initialHeight = container.offsetHeight || 300;


    const chart = new Chart({
      container,
      width: initialWidth,
      height: initialHeight,
      inset: 0, // 边距
      padding: 20, 
      paddingTop:50,
      autoFit: true,
      theme: 'dark'
    });

    // 准备数据
    const data = [
      { item: 'Design', type: 'a', score: 70 },
      { item: 'Design', type: 'b', score: 30 },
      { item: 'Development', type: 'a', score: 60 },
      { item: 'Development', type: 'b', score: 70 },
      { item: 'Marketing', type: 'a', score: 50 },
      { item: 'Technology', type: 'b', score: 40 },
      { item: 'Support', type: 'a', score: 30 },
      { item: 'Support', type: 'b', score: 40 },
      { item: 'Sales', type: 'a', score: 60 },
      { item: 'Sales', type: 'b', score: 40 },
      { item: 'UX', type: 'a', score: 50 },
      { item: 'UX', type: 'b', score: 60 },
    ];

    chart.coordinate({ type: 'polar' });

    chart
      .data(data)
      .scale('x', { padding: 0.5, align: 0 })
      .scale('y', { tickCount: 5 })
      .axis('x', { grid: true })
      .axis('y', { zIndex: 1, title: false });

    chart
      .area()
      .encode('x', 'item')
      .encode('y', 'score')
      .encode('color', 'type')
      .encode('shape', 'smooth')
      .style('fillOpacity', 0.5)
      .scale('y', { domainMax: 80 });

    chart
      .line()
      .encode('x', 'item')
      .encode('y', 'score')
      .encode('color', 'type')
      .style('lineWidth', 2);

    chart.interaction('tooltip', { crosshairsLineDash: [4, 4]})
    
    chart.legend({ position: 'bottom-right' });

    // 渲染可视化
    chart.render();
    return chart;
  }

  return (
    <div className='screen-chart' ref={container}></div>
  );
}