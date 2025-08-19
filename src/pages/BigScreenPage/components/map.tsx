import React, { useEffect, useRef } from 'react';
import { Scene, PolygonLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';

function loadAmap(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if ((window as any).AMap) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=initAmap`;
        script.onerror = reject;
        (window as any).initAmap = () => resolve();
        document.head.appendChild(script);
    });
}
export default function MapChart() {
    const sceneRef = useRef<Scene | null>(null); // 用于保存 scene 实例
    const containerRef = useRef<HTMLDivElement>(null); // 容器引用

    useEffect(() => {
        if (!containerRef.current) return;
        loadAmap('632b77ebc2324f21e2d28593f8b7c15d').then(() => {
            // 创建 L7 场景
            const scene = new Scene({
                id: "maper", // 传入 DOM 容器
                // 或者使用：container: containerRef.current
                map: new GaodeMap({
                    style: 'amap://styles/darkblue',
                    center: [113.7, 34.0], // 许昌市大致中心
                    zoom: 7,
                    pitch: 0, // 2D 模式
                }),
            });

            sceneRef.current = scene;

            // 地图加载完成后加载数据
            scene.on('loaded', async () => {
                try {
                    const response = await fetch(
                        'https://geo.datav.aliyun.com/areas_v3/bound/411000.json'
                    );
                    const data = await response.json();

                    const layer = new PolygonLayer({})
                        .source(data)
                        .color('#f00') // 填充颜色
                        .shape('fill')  // 填充形状
                        .style({
                            opacity: 0.6,
                        })
                        .active(true) // 鼠标悬停高亮
                        .animate(true); // 可选：动画

                    scene.addLayer(layer);
                } catch (error) {
                    console.error('地图数据加载失败:', error);
                }
            });

            // 清理函数：销毁场景，防止内存泄漏
            return () => {
                if (sceneRef.current) {
                    sceneRef.current.destroy();
                    sceneRef.current = null;
                }
            };
        })


    }, []);

    return (
        <div className='screen-chart'>
            <div
                id="maper"
                ref={containerRef}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '8px',
                }}
            />
        </div>
    );
}