import axios from "axios";
import router from '@/router/index.js'
import { Notify } from "vant";
import { getToken, removeToken } from '@/utils/token.js'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/',
  timeout: 20000
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = 'Bearer ' + getToken()
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  if (error.response.status === 401) {
    Notify({ type: "warning", message: "身份过期请重新登录" });
    removeToken()
    router.replace('/login')
  }
  console.dir(error)
  return Promise.reject(error);
});
export default ({ url, method = 'get', params = {}, data = {}, headers = {} }) => {
  return request({
    url,
    method,
    params,
    data,
    headers
  })
}
