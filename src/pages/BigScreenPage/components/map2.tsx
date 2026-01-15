import React, { useEffect, useRef } from 'react';
import { Scene, PolygonLayer,PointLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';

export default function MapChart() {
     // 河南省GeoJSON数据（简化版）
    const henanGeoJson = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "name": "郑州市",
            "cp": [113.62, 34.72],
            "population": 1260
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [[
              [112.8, 34.2], [113.8, 34.2], [113.8, 34.9], [112.8, 34.9], [112.8, 34.2]
            ]]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "洛阳市",
            "cp": [112.45, 34.62],
            "population": 705
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [[
              [111.9, 34.1], [112.9, 34.1], [112.9, 35.0], [111.9, 35.0], [111.9, 34.1]
            ]]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "开封市",
            "cp": [114.35, 34.79],
            "population": 482
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [[
              [113.9, 34.4], [114.8, 34.4], [114.8, 35.0], [113.9, 35.0], [113.9, 34.4]
            ]]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "安阳市",
            "cp": [114.35, 36.10],
            "population": 548
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [[
              [113.8, 35.7], [114.8, 35.7], [114.8, 36.4], [113.8, 36.4], [113.8, 35.7]
            ]]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "新乡市",
            "cp": [113.85, 35.30],
            "population": 625
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [[
              [113.4, 35.0], [114.4, 35.0], [114.4, 35.6], [113.4, 35.6], [113.4, 35.0]
            ]]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "南阳市",
            "cp": [112.53, 33.00],
            "population": 971
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [[
              [111.3, 32.4], [112.8, 32.4], [112.8, 33.5], [111.3, 33.5], [111.3, 32.4]
            ]]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "信阳市",
            "cp": [114.07, 32.13],
            "population": 646
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [[
              [113.4, 31.6], [114.8, 31.6], [114.8, 32.6], [113.4, 32.6], [113.4, 31.6]
            ]]
          }
        }
      ]
    };

    // 初始化地图
    async function initMap() {
      const scene = new Scene({
        id: 'maper2',
        map: new GaodeMap({
          style: 'amap://styles/darkblue',
          center: [113.5, 34.0],
          zoom: 6.8,
          pitch: 50,
          token: '632b77ebc2324f21e2d28593f8b7c15d'
        })
      });
      
      scene.on('loaded', () => {
        // 添加河南省边界
        const provinceLayer = new PolygonLayer({
          autoFit: true
        })
          .source(henanGeoJson)
          .shape('extrude')
          .size('population', [2000, 10000]) // 根据人口设置高度
          .color('population', [
            '#556270', 
            '#4ecdc4', 
            '#ff6b6b'
          ])
          .style({
            opacity: 0.9,
            pickLight: true
          })
          .active(true);
        
        scene.addLayer(provinceLayer);
        
        // 添加标注
        const labelLayer = new PointLayer({
          zIndex: 2
        })
          .source(henanGeoJson.features.map(f => ({
            name: f.properties.name,
            lng: f.properties.cp[0],
            lat: f.properties.cp[1]
          })), {
            parser: {
              type: 'json',
              x: 'lng',
              y: 'lat'
            }
          })
          .shape('name', 'text')
          .size(14)
          .color('#fff')
          .style({
            textAnchor: 'center',
            textOffset: [0, 20],
            padding: [5, 5],
            stroke: '#1a2a6c',
            strokeWidth: 2
          });
        
        scene.addLayer(labelLayer);
        
        // 添加悬停效果
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.style.display = 'none';
        document.body.appendChild(tooltip);
        
        provinceLayer.on('mousemove', e => {
          if (e.feature) {
            const { name, population } = e.feature.properties;
            tooltip.innerHTML = `
              <h3>${name}</h3>
              <p>人口: ${population} 万人</p>
              <p>点击查看详情</p>
            `;
            tooltip.style.display = 'block';
            tooltip.style.left = e.x + 'px';
            tooltip.style.top = e.y + 'px';
          }
        });
        
        provinceLayer.on('mouseout', () => {
          tooltip.style.display = 'none';
        });
        
        // 点击事件
        provinceLayer.on('click', e => {
          if (e.feature) {
            const { name, population } = e.feature.properties;
            alert(`您点击了: ${name}\n人口: ${population}万人`);
          }
        });
      });
    }
    
    // 初始化地图
    useEffect(()=>{
        initMap()
    },[])
    return (
        <div className='screen-chart' style={{ height: '100%' }}>
            <div
                id="maper2"
                style={{
                    width: '100%',
                    height: '100%',
                }}
            />
        </div>
    );
}