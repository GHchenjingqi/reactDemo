import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

type ButtonGoProps = {
  path: string;
  children: React.ReactNode;
  type?: 'primary' | 'dashed' | 'danger' | 'default' | 'link' | 'text';
  size?: 'large' | 'middle' | 'small';
  danger?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
};

// 函数类型 + 类型注解
const ButtonGo = ({ path, children }: ButtonGoProps) => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(path)}>
      {children}
    </Button>
  );
};

export default ButtonGo;