import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd'; 
import type {  ButtonProps } from 'antd';

interface ButtonGoProps extends Omit<ButtonProps, 'onClick'> {
  path: string;
}

const ButtonGo: React.FC<ButtonGoProps> = ({ path, children, ...rest }) => {
  const navigate = useNavigate();
  
  // 使用 useCallback 避免不必要的函数重建
  const handleClick = useCallback(() => {
    if (path) {
      navigate(path);
    } else {
      console.warn('ButtonGo: 缺少有效的跳转路径');
    }
  }, [navigate, path]);

  return (
    <Button 
      {...rest} 
      onClick={handleClick}
      role="link" // 提升可访问性
    >
      {children}
    </Button>
  );
};

export default React.memo(ButtonGo); // 使用 memo 避免不必要的重渲染