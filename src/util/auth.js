import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, 0.5)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


// 设置用户信息
export function setUserInfor(data) {
  return localStorage.setItem(UserInfor, JSON.stringify(data))
}

// 获取用户信息
export function getUserInfor() {
  if (!localStorage.getItem(UserInfor)) return ""
  return JSON.parse(localStorage.getItem(UserInfor))
}

// 删除用户信息
export function removeUserInfor() {
  return localStorage.removeItem(UserInfor)
}

