import Axios from './axios'
import { Message } from 'element-ui'
import { getAccessToken } from '@/utils/accessToken'

const $http = {}

// 不需要bearer的请求path
const whitePath = ['/common/lander', '/common/sign', '/receiver/register']
$http.get = (url = '', params = {}, config = {}) => {
  let headers = {}
  if (whitePath.indexOf(url) < 0) {
    headers['Authorization'] = `Bearer ${getAccessToken('access_token')}`
  }
  return new Promise((resolve, reject) => {
    Axios.get(url, { params: params, headers })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        Message({
          message: err,
          type: 'error',
          duration: 5 * 1000
        })
        reject(err)
      })
  })
}

$http.post = (url = '', params = {}, config = {}) => {
  const headers = {}
  if (whitePath.indexOf(url) < 0) {
    headers['Authorization'] = `Bearer ${getAccessToken('access_token')}`
  }
  return new Promise((resolve, reject) => {
    Axios.post(url, params, { headers })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        Message({
          message: err,
          type: 'error',
          duration: 5 * 1000
        })
        reject(err)
      })
  })
}

$http.delete = (url = '', params = {}, config = {}) => {
  let headers = {}
  if (whitePath.indexOf(url) < 0) {
    headers['Authorization'] = `Bearer ${getAccessToken('access_token')}`
  }
  return new Promise((resolve, reject) => {
    Axios.delete(url, params, { headers })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        Message({
          message: err,
          type: 'error',
          duration: 5 * 1000,
        })
        reject(err)
      })
  })
}

$http.put = (url = '', params = {}, config = {}) => {
  let headers = {}
  if (whitePath.indexOf(url) < 0) {
    headers['Authorization'] = `Bearer ${getAccessToken('access_token')}`
  }
  return new Promise((resolve, reject) => {
    Axios.put(url, params, { headers })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        Message({
          message: err,
          type: 'error',
          duration: 5 * 1000,
        })
        reject(err)
      })
  })
}
export default $http
