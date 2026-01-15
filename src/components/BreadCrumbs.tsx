import React from 'react';
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';
import { routeLists } from '@/routes'; // 引入名称映射

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);

  // 生成每条路径的面包屑项
 
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const curroute = routeLists.find(route => route.path === url);
    if (curroute?.title){
      return {
        path: url,
        title: curroute?.title,
      };
    }else{
      return undefined;
    }
  }).filter((item) => item != undefined);

  return (
    <Breadcrumb
      items={
        breadcrumbItems.map(item => ({
          key: item.path,
          title: item.title,
        }))
      }
    />
  );
};

export default Breadcrumbs;