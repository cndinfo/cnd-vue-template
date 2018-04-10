import request from '@/utils/axios'

export function loginByAccount(account, password) {
  const data = {
    account,
    password
  }
  const result = request({
    url: '/api/userinfo/login',
    method: 'post',
    data
  })

  return result
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserInfo(userId) {
  return request({
    url: '/api/userinfo/get/' + userId,
    method: 'get'
  })
}

