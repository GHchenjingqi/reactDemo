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

    const data = [
      { item: '事例一', count: 40, percent: 0.4 },
      { item: '事例二', count: 21, percent: 0.21 },
      { item: '事例三', count: 17, percent: 0.17 },
      { item: '事例四', count: 13, percent: 0.13 },
      { item: '事例五', count: 9, percent: 0.09 },
    ];

    const chart = new Chart({
      container,
      width: initialWidth, 
      height: initialHeight,
      autoFit: true,
      theme: 'dark'
    });

    chart.coordinate({ type: 'theta', outerRadius: 0.8 });
    chart
      .interval()
      .data(data)
      .transform({ type: 'stackY' })
      .encode('y', 'percent')
      .encode('color', 'item')
      .legend('color', { position: 'left', layout: { justifyContent: 'flex-start'} })
      .label({
        position: 'outside',
        text: (data) => `${data.item}: ${data.percent * 100}%`,
      })
      .tooltip((data) => ({
        name: data.item,
        value: `${data.percent * 100}%`,
      }));


    // 渲染可视化
    chart.render();
    return chart;
  }

  return (
    <div className='screen-chart' ref={container}></div>
  );
}