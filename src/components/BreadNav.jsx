import React from "react";
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';

const paths = {
    '/': 'Home',
    '/about': 'About',
}
const breadNav = () => {
    const location = useLocation();
    const path = paths[location.pathname] || 'Home';
    return (
        <div className="breadNav">
            当前位置：
            <Breadcrumb  items={[{ title: path }]}/>
        </div>

    );
};

export default breadNav;