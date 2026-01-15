// src/components/Layout.tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout as AntLayout,  Button, theme } from 'antd';
import {   MenuUnfoldOutlined, MenuFoldOutlined,} from '@ant-design/icons';
import logo from '@/assets/images/react.svg';
import Breadcrumbs from '@/components/BreadCrumbs';
import Menus from '@/components/Menus';
import UserGroup from '@/components/UserGroup';

const { Header, Sider, Content } = AntLayout;

interface LayoutProps {
  children?: React.ReactNode; 
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  return (
    <>
      <AntLayout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <div className="logo">
            <img src={logo} alt="" />
            {collapsed ? null : <h1>React App</h1>}
          </div>
          <Menus />
        </Sider>
        <AntLayout>
          <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Breadcrumbs />
            <UserGroup />
          </Header>
          <Content style={{ margin: '24px 16px 0', background: colorBgContainer, borderRadius: borderRadiusLG, }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {children || <Outlet />}
            </div>
          </Content>
        </AntLayout>
      </AntLayout>
    </>
  );
};

export default Layout;