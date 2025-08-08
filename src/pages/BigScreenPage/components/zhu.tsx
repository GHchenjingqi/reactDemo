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
      autoFit: true,
      theme: 'dark'
    });

    // 准备数据
    const data = [
      { genre: '周一', sold: 275 },
      { genre: '周二', sold: 115 },
      { genre: '周三', sold: 120 },
      { genre: '周四', sold: 250 },
      { genre: '周五', sold: 170 },
      { genre: '周六', sold: 350 },
      { genre: '周日', sold: 150 },
    ];

    // 声明可视化
    chart
      .interval() // 创建一个 Interval 标记
      .data(data) // 绑定数据
      .encode('x', 'genre') // 编码 x 通道
      .encode('y', 'sold') // 编码 y 通道
      .encode('key', 'genre') // 指定 key
      .style({
        width: 10,
        inset: 0.5, // 设置柱子内边距比例（0-1），实现居中效果
        maxWidth:10 // 限制最大宽度
      })
      .animate('update', { duration: 500 }); // 指定更新动画的时间

    // 渲染可视化
    chart.render();
    return chart;
  }

  return (
    <div className='screen-chart' ref={container}></div>
  );
}