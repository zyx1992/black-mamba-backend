import $http from '@/utils/http'

// 审核
export function agree(id) {
  return $http.put('/receiver-account/audit/status', {
    confirm: '1',
    id: String(id)
  })
}
export function disagree(id) {
  return $http.put('/receiver-account/audit/status', {
    confirm: '2',
    id: String(id)
  })
}

export function rechargeList(params) {
  return $http.post('/account/recharge/details', params)
}
