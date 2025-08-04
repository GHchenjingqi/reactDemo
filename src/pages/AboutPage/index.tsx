import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const BtnGo: React.FC<{ path: string }> = ({ path }) => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(path)}>
      按钮
    </Button>
  );
};
const HomePage: React.FC = () =>{
  return (
    <div>
      <h1>about</h1>
      <BtnGo path="/login" />  
    </div>
  )
}

export default HomePage;