import { configureStore,combineReducers  } from '@reduxjs/toolkit';
import { 
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 默认使用 localStorage
// 引入 reducer
import userReducer from './datas/user';

// 1. 定义持久化配置
const persistConfig = {
  key: 'root',       // 存储键名
  storage,           // 存储引擎 (localStorage)
  version: 1,        // 版本号 (改变时自动清除旧数据)
  // 可选配置:
  whitelist: ['user'], // 只持久化 user 状态
  // blacklist: ['otherReducer'], // 排除某些 reducer
};

// 2. 创建持久化 reducer
const rootReducer = combineReducers({
  user: userReducer,
  // ...
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. 配置 store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 忽略 redux-persist 的 action 类型
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 4. 创建 persistor 对象
export const persistor = persistStore(store);

// 5. 导出类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;