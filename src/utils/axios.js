/**
 * @author: zhuyuxin
 * @desc: axios二次封装，添加拦截器、请求头、请求代理等
 * @date: 2019.11.27
 */
import axios from 'axios'

// 请求头参数设置
const headers = {}
const Axios = axios.create({
  timeout: 10000,
  baseURL: '/',
  headers: headers,
})
Axios.defaults.withCredentials = true

Axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.error(error)
  }
)

Axios.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code === 200) {
      return res
    } else if (res) {
      // TODO: 临时兼容，记得删除
      return res
    } else {
      return Promise.reject(res.message)
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default Axios
