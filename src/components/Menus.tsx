import React, { useState, useEffect } from 'react';
import { Menu, } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
    HomeOutlined, LoadingOutlined, LineChartOutlined, UserOutlined
} from '@ant-design/icons';
import { get } from '@/utils/request';
import { getMenusApi } from '@/services';

type ItemType = {
    id: number;
    icon?: string;
    title: string;
    path: string;
    hide: boolean;
    children?: ItemType[];
}
type MenuItems = {
    key: string;
    icon?: React.ReactNode;
    label: React.ReactNode;
}

const getIcon = (icon: string) => {
    switch (icon) {
        case 'HomeOutlined':
            return <HomeOutlined />
        case 'UserOutlined':
            return <UserOutlined />
        case 'LineChartOutlined':
            return <LineChartOutlined />
        default:
            break;
    }
}
const getMenuItem = (arr: ItemType[]): MenuItems[] => {
    return arr.map((item) => {
        if (!item.hide) {
            if (item.children) {
                return {
                    key: item.path,
                    icon: item.icon ? getIcon(item.icon) : null,
                    label: item.title,
                    children: getMenuItem(item.children),
                };
            } else {
                return {
                    key: item.path,
                    icon: item.icon ? getIcon(item.icon) : null,
                    label: <Link to={item.path}>{item.title}</Link>,
                };
            }
        }
        return undefined;
    }).filter((item) => item != undefined);;
}

const Menus: React.FC = () => {
    const location = useLocation();
    const [menuItems, setMenuItems] = useState<MenuItems[]>([]);
    useEffect(() => {
        get(getMenusApi).then((res: { code: number; data: ItemType[]; message: any; }) => {
            if (res.code === 200) {
                let item = getMenuItem(res.data)
                setMenuItems(item)
            }
        });
    }, []);

    return (
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems}></Menu>
    );
};

export default Menus;