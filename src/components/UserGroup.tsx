import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/index';
import {  Avatar } from 'antd';
import {useNavigate } from 'react-router-dom';
import { UserOutlined, LogoutOutlined} from '@ant-design/icons';

const UserGroup: React.FC = () => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user)
  const logout = () => {
    // 清理持久化数据
    window.localStorage.clear()
    navigate('/login')
  }
  return (
    <div className="header-user">
      {user.avatar ? <Avatar src={<img src={user.avatar} alt="avatar" />} size={36} /> : <Avatar icon={<UserOutlined />} size={36} />}
      <span className='name'>{user.username}</span>
      <span onClick={logout}>
        <LogoutOutlined />
      </span>
    </div>
  );
}

export default UserGroup;