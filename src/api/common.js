import $http from '@/utils/http'

export function getReceiverInfo() {
  return $http.get('/receiver-handle/info')
}

export function getUserRsa(params) {
  return $http.get('/common/sign', params)
}

export function singin(params) {
  return $http.post('/common/lander', params)
}

export function signup(params) {
  return $http.post('/receiver/register', params)
}
