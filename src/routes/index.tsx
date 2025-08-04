import React from 'react';
import { Route, Routes ,Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/LoginPage';

import Layout from '../components/Layout'; // 你之前的布局组件
// 创建一个用于需要布局的页面的路由包装器
const ProtectedLayout: React.FC = () => (
  <Layout>
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/*" element={<NotFoundPage />} />
      <Route path="/" element={<Navigate to="/home" replace />} /> 
    </Routes>
  </Layout>
);
const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/*" element={<ProtectedLayout />} />
  </Routes>
);

export default AppRoutes;