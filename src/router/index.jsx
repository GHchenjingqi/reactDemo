// Router.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// 导入你想要展示的不同页面组件
import HomePage from '../views/Home';
import AboutPage from '../views/About';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
  </Routes>
);

export default AppRouter;