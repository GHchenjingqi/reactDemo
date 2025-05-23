import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from 'antd';

const items = [
    {
        label: <NavLink to="/" className={({ isActive }) => isActive ? "selected" : ""}>Home</NavLink>,
        key: '1',
    },
    {
        label: <NavLink to="/about" className={({ isActive }) => isActive ? "selected" : ""}>About</NavLink>,
        key: '2',
    },
]
function Menus() {
    return (
        <Menu className="navSlide"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            inlineCollapsed={false}
            items={items}
        />
    );
}


export default Menus;