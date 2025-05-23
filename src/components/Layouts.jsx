import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Flex, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import AppRouter from '../router/index'; // 引入刚刚创建的路由配置文件
import Menus from "./Menus";
import Logo from "./Logo";
import BreadNav from "./BreadNav";
import UserNav from "./UserNav";

const headerStyle = {
  textAlign: 'center',
  color: '#111',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  padding: '1.5rem',
  backgroundColor: '#fff',
};
const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: 'var(--mc)',
};
const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  height: 'calc(100% - 8px)',
};
export default function Layouts() { 
    return (
        <Router>
            <Layout  style={layoutStyle}>
                <Sider width='280px' style={siderStyle}>
                    <Logo />
                    <Menus />
                </Sider>
                <Layout>
                    <Header style={headerStyle}>
                        <BreadNav />
                        <UserNav />
                    </Header>
                    <Content style={contentStyle}><AppRouter/></Content>
                </Layout>
            </Layout>
        </Router>
    )
}