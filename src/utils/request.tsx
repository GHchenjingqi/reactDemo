import axios, {
  AxiosError
} from 'axios'; // 注意：直接从 'axios' 导入，webpack/打包工具会处理

import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig, 
} from 'axios';

export interface ApiError {
  status?: number;
  message: string;
  data?: any;
  isNetworkError?: boolean;
  url?: string;
  method?: string;
}

const http = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 注意：请求拦截器的 config 类型是 InternalAxiosRequestConfig
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const headers = { ...config.headers };
    const data = config.data;

    if (
      data &&
      !(data instanceof FormData) &&
      !(data instanceof URLSearchParams) &&
      typeof data === 'object' &&
      !Array.isArray(data)
    ) {
      if (!headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
      }
      config.data = JSON.stringify(data);
    }

    const token = localStorage.getItem('authToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return { ...config, headers };
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 注意：响应拦截器的 response 类型是 AxiosResponse
http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError): Promise<ApiError> => {
    const response = error.response;
    const request = error.request;
    const config = error.config;

    const errorResponse: ApiError = {
      message: error.message || 'Unknown error',
      url: config?.url,
      method: config?.method?.toUpperCase(),
    };

    if (response) {
      errorResponse.status = response.status;
      errorResponse.data = response.data;
      errorResponse.message = response.statusText || errorResponse.message;

      switch (response.status) {
        case 400:
          errorResponse.message = '请求参数错误';
          break;
        case 401:
          errorResponse.message = '未授权，请重新登录';
          break;
        case 403:
          errorResponse.message = '权限不足';
          break;
        case 404:
          errorResponse.message = '请求的资源不存在';
          break;
        case 500:
          errorResponse.message = '服务器内部错误';
          break;
        default:
          errorResponse.message = `请求失败 [${response.status}]`;
      }
    } else if (request) {
      errorResponse.isNetworkError = true;
      errorResponse.message = '网络连接失败，请检查网络';
    } else {
      errorResponse.message = `请求配置错误: ${error.message}`;
    }

    return Promise.reject(errorResponse);
  }
);

export function request<T = any>(config: AxiosRequestConfig): Promise<T> {
  return http(config)
    .then((response: AxiosResponse<T>) => response.data)
    .catch((error: ApiError) => {
      return Promise.reject(error);
    });
}

export function get<T = any>(
  url: string,
  params?: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<T> {
  return request<T>({
    method: 'GET',
    url,
    params,
    ...config,
  });
}

export function post<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  return request<T>({
    method: 'POST',
    url,
    data,
    ...config,
  });
}

export function put<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  return request<T>({
    method: 'PUT',
    url,
    data,
    ...config,
  });
}

export function patch<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  return request<T>({
    method: 'PATCH',
    url,
    data,
    ...config,
  });
}

export function del<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  return request<T>({
    method: 'DELETE',
    url,
    ...config,
  });
}

export default http;