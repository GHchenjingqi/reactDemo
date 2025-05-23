import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layouts from './components/Layouts'; // 引入刚刚创建的路由配置文件
import  './assets/main.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Layouts />
  </StrictMode>,
)
