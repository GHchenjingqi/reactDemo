import React from 'react';
import './index.css';
import headersvg from '@/assets/images/aa.svg';

import Test from './components/san';
import Bin from './components/bin';
import Zhu from './components/zhu';
import Zhu2 from './components/zhu2';
import Zhu3 from './components/zhu3';
import Maps from './components/map';
import Maps2 from './components/map2';

const Page : React.FC = () => { 
    return (
        <div className='wrap-big-screen'>
            <div className='wrap-big-header' style={{backgroundImage: `url(${headersvg})`}}>
                <span>某省大屏可视化数智平台</span>
            </div>
            <div className="wrap-big-content">
                <div className="wrap-big-left flex-item ">
                    <div className="screen-item" style={{ height: '240px'}}>
                        <div className="screen-title">本周数据统计-饼状图</div>
                        <Bin />
                    </div>
                    <div className="screen-item" style={{ height: '31vh'}}>
                        <div className="screen-title">本周数据统计-柱状图</div>
                        <Zhu />
                    </div>
                    <div className="screen-item" style={{ height: '31vh'}}>
                        <div className="screen-title">本周数据统计-枪状图</div>
                        <Zhu2 />
                    </div>
                </div>
                <div className="wrap-big-middle ">
                    <div className="screen-item" style={{ height: '100%'}}>
                        <Maps2 />
                    </div>
                </div>
                <div className="wrap-big-right flex-item ">
                    <div className="screen-item" style={{ height: '240px'}}>
                        <div className="screen-title">本周数据统计</div>
                        <Test />
                    </div>
                    <div className="screen-item" style={{ height: '31vh'}}>
                        <div className="screen-title">本周数据统计</div>
                        <Zhu3 />
                    </div>
                    <div className="screen-item" style={{ height: '31vh'}}>
                        <div className="screen-title">本周数据统计</div>
                        <Maps />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;