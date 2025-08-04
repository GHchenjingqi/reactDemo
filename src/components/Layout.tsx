// src/components/Layout.tsx
import React , { useState }from 'react';
import { Layout as AntLayout, Menu ,Button, theme } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined,  LoadingOutlined,
    MenuUnfoldOutlined, MenuFoldOutlined
} from '@ant-design/icons';
import logo from '../assets/images/react.svg';
const { Header, Sider, Content } = AntLayout;
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {  token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const menuItems = [
    { key: '/',icon: <HomeOutlined/>, label: <Link to="/">Home</Link> },
    { key: '/about', icon: <LoadingOutlined/>, label: <Link to="/about">About</Link> },
  ];

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo">
            <img src={logo} alt="" />
            { collapsed ? null : <h1>React App</h1> }
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems}></Menu>
      </Sider>
      <AntLayout>
        <Header style={{ padding: 0, background: colorBgContainer }}> 
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
        </Header>
        <Content style={{ margin: '24px 16px 0' ,background: colorBgContainer, borderRadius: borderRadiusLG,}}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {children}
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;