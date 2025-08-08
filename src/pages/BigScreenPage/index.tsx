import React from 'react';
import './index.css';
import headersvg from '@/assets/images/aa.svg';
import Test from './components/bin';
import Zhu from './components/zhu';
const Page : React.FC = () => { 
    return (
        <div className='wrap-big-screen'>
            <div className='wrap-big-header' style={{backgroundImage: `url(${headersvg})`}}>
                <span>某省大屏可视化数智平台</span>
            </div>
            <div className="wrap-big-content">
                <div className="wrap-big-left flex-item ">
                    <div className="screen-item" style={{ height: '240px'}}>
                        <div className="screen-title">本周数据统计</div>
                        <Test />
                    </div>
                    <div className="screen-item" style={{ height: '31vh'}}>
                        <div className="screen-title">本周数据统计</div>
                        <Zhu />
                    </div>
                    <div className="screen-item" style={{ height: '31vh'}}>
                        <div className="screen-title">本周数据统计</div>
                    </div>
                </div>
                <div className="wrap-big-middle ">2</div>
                <div className="wrap-big-right flex-item ">
                    <div className="screen-item" style={{ height: '240px'}}>
                        <div className="screen-title">本周数据统计</div>
                    </div>
                    <div className="screen-item" style={{ height: '31vh'}}>
                        <div className="screen-title">本周数据统计</div>
                    </div>
                    <div className="screen-item" style={{ height: '31vh'}}>
                        <div className="screen-title">本周数据统计</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;