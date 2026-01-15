import React from 'react';
import ButtonGo from '@/components/ButtonGo';
import svg from '@/assets/images/aa.svg';
const HomePage: React.FC = () => (
  <div>
    <h1>欢迎来到后台管理系统</h1>
    <p>这是一个简单的示例。<ButtonGo path='/screen'>前往大屏</ButtonGo></p>
    <img src={svg} alt="" />
  </div>
);

export default HomePage;