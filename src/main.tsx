import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@ant-design/v5-patch-for-react-19';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store'; 
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate 
        loading={null} // 可替换为加载组件如 <LoadingScreen />
        persistor={persistor}
      >
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
