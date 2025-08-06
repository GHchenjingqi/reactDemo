import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/LoginPage';
import Layout from '../components/Layout';

const pageModules = import.meta.glob("../pages/**/index.tsx", { eager: false });
// 2. 创建页面名称到组件的映射
const pageComponents = Object.entries(pageModules).reduce(
  (acc, [path, moduleLoader]) => {
    // 从路径中提取页面名称 (例如: "../pages/AboutPage/index.tsx" -> "AboutPage")
    const match = path.match(/\.\.\/pages\/([^/]+)\/index\.tsx$/);
    if (match) {
      const pageName = match[1];
      acc[pageName] = React.lazy(moduleLoader as () => Promise<{ default: React.ComponentType }>);
    }
    return acc;
  },
  {} as Record<string, React.LazyExoticComponent<React.ComponentType>>
);

type RouteDataType = {
  path: string,
  title: string,
  page: string
}
// 配置路由
let routedata: RouteDataType[] = [
  { path: '/about', title: "关于", page: 'AboutPage' },
  { path: '/order/index', title: "订单中心", page: 'OrderPage' },
  { path: '/order/list', title: "订单列表", page: 'OrderListPage' },
  { path: '/user', title: "用户管理", page: 'UserPage' },
]

type DynamicDataType = {
  path: string,
  title: string,
  element: React.ReactElement
}

const DynamicRoutes: DynamicDataType[] = []
const getComponent = (page: string) => {
  if (!page) return null;
  const Component = pageComponents[page];
  return Component ? (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  ) : null;
}
const creatDynamicRoutes = (routedata: RouteDataType[]) => {
  routedata.forEach(item => {
    const cur_components = getComponent(item.page);
    if (cur_components) {
      DynamicRoutes.push({
        path: item.path,
        title: item.title,
        element: cur_components
      });
    }
  });
}
creatDynamicRoutes(routedata)

// 所有需要 Layout 的页面（除了登录和 404）
export const routeLists: DynamicDataType[] = [
  { path: '/', element: <HomePage />, title: '首页' },
  ...DynamicRoutes,
];

const AppRoutes = () => {
  return (
    <Routes>
      {/* 独立页面：登录页 */}
      <Route path="/login" element={<LoginPage />} />

      {/* 需要布局的主路由组 */}
      <Route path="/" element={<Layout />}>
        {routeLists.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Route>

      {/* 全局 404 路由（必须放在最后） */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
export default AppRoutes;