import $http from '@/utils/http'

export function auditStatus(params) {
  return $http.post('/receiver-account/audit/status', params)
}
