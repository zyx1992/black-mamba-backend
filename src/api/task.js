import $http from '@/utils/http'

export function taskList(params) {
  return $http.post('/task/list', params)
}

export function taskDetail(id) {
  return $http.get('/task/detail', { id })
}

export function changeTaskStatus(params) {
  return $http.put('/receiver-task/status', params)
}

export function receiveTask(id) {
  return $http.post(`/receiver-task/${id}`)
}
