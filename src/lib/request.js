import axios from 'axios'
import { loginoutMessage } from './auth';

const instance = axios.create({
  baseURL: window.location.origin,
  timeout: 200000,
  maxContentLength: Infinity
});

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
    config.data = JSON.stringify(config.data); // 数据转化,也可以使用qs转换
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded' // 配置请求头
    }

    // 注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
    const token = JSON.parse(localStorage.getItem('token'));// 这里取token之前，你肯定需要先拿到token,存一下
    if (token){
      config.params = {'token': token} // 如果要求携带在参数中
      config.headers.token = token; //  如果要求携带在请求头中
    }
    return config
  },
  error => {
    return Promise.error(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    const { data } = response
    const { code } = data
     

    // 登录失效错误码
    const loginout_code = ['10001', '10003', '10002', '0004', '0003', '0001'];

    if (loginout_code.includes(code)) { 
      // 重新登录
      loginoutMessage();
      return Promise.resolve(null)
    }

    try {
      return Promise.resolve(res)
    } catch (err) {
      return Promise.resolve(null)
    } 
  },
  error => {
    return Promise.resolve(error)
  }
)

export default instance;