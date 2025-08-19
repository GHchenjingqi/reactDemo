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
      paddingTop: 50,
      autoFit: true,
      theme: 'dark'
    });

    // 准备数据
    const data = [
      { time: '10:10', call: 4, waiting: 2, people: 2 },
      { time: '10:15', call: 2, waiting: 6, people: 3 },
      { time: '10:20', call: 13, waiting: 2, people: 5 },
      { time: '10:25', call: 9, waiting: 9, people: 1 },
      { time: '10:30', call: 5, waiting: 2, people: 3 },
      { time: '10:35', call: 8, waiting: 2, people: 1 },
      { time: '10:40', call: 13, waiting: 1, people: 2 },
    ];
    chart.data(data);
    chart
      .interval()
      .encode('x', 'time')
      .encode('y', 'waiting')
      .encode('color', () => 'waiting')
      .encode('series', () => 'waiting')
      .axis('y', { title: 'Waiting' });

    chart
      .interval()
      .encode('x', 'time')
      .encode('y', 'people')
      .encode('color', () => 'people')
      .encode('series', () => 'people')
      .scale('y', { independent: true })
      .axis('y', { position: 'right', grid: null, title: 'People' });


    // 渲染可视化
    chart.render();
    return chart;
  }

  return (
    <div className='screen-chart' ref={container}></div>
  );
}