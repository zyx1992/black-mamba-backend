import $http from '@/utils/http'

// 审核
export function agree(id) {
  return $http.post('/receiver-account/audit/status', {
    confirm: 1,
    id
  })
}
export function disagree(id) {
  return $http.post('/receiver-account/audit/status', {
    confirm: 2,
    id
  })
}

export function rechargeList(params) {
  return $http.post('/account/recharge/details', params)
}
