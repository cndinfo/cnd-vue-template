import Cookies from 'js-cookie'

const TokenKey = 'token'

const UserKey = 'userId'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 7 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUser() {
  return Cookies.get(UserKey)
}

export function setUser(user) {
  return Cookies.set(UserKey, user, { expires: 7 })
}

export function removeUser() {
  return Cookies.remove(UserKey)
}
