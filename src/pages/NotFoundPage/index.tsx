import React from 'react';
import ButtonGo from '@/components/ButtonGo';
const NotFoundPage: React.FC = () => (
  <div className='not-found'>
    <h1>404</h1>
    <p>糟糕，页面或资源不存在，看看其他内容！</p>
    <ButtonGo type="link" path='/'>返回首页</ButtonGo>
  </div>
);

export default NotFoundPage;