import axios from "axios";
//设置请求超时的时间
axios.defaults.timeout = 6000;
 
//http request 拦截器
axios.interceptors.request.use(
    config => {
        // const token = getCookie('名称');
        config.data = JSON.stringify(config.data);
        //设置请求头
        config.headers = {
            'Content-Type': 'application/json'
        };
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);
//http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error)
    }
);
 
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}
 
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}
