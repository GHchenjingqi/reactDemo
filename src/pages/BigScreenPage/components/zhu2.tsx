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
      padding: 20, // 填充
      paddingTop: 5,
      paddingBottom: 30,
      autoFit: true,
      theme: 'dark'
    });

    // 准备数据
    const data = [
      {
        title: '5🌟',
        ranges: 100,
        measures: 40,
        target: 85,
      },
      {
        title: '4🌟',
        ranges: 100,
        measures: 80,
        target: 40,
      },
      {
        title: '3🌟',
        ranges: 100,
        measures: 20,
        target: 22,
      },
      {
        title: '0-2🌟',
        ranges: 100,
        measures: 30,
        target: 10,
      },
    ];

    chart.coordinate({ transform: [{ type: 'transpose' }] });

    chart.data(data);

    chart
      .interval()
      .encode('x', 'title')
      .encode('y', 'ranges')
      .encode('color', '#071f51')
      .style('maxWidth', 30)
      .axis({
        y: {
          grid: true,
          gridLineWidth: 2,
        },
        x: {
          title: false,
        },
      });

    chart
      .interval()
      .encode('x', 'title')
      .encode('y', 'measures')
      .style('maxWidth', 15)
      .label({
        text: 'measures',
        position: 'right',
        textAlign: 'left',
        dx: 5,
      });

    chart
      .point()
      .encode('size',8)
      .encode('x', 'title')
      .encode('y', 'target')
      .encode('shape', 'line')
      .encode('color', 'red')
      .tooltip({
        title: undefined,
        items: [{ channel: 'y' }],
      });

    // 渲染可视化
    chart.render();
    return chart;
  }

  return (
    <div className='screen-chart' ref={container}></div>
  );
}