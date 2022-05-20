//操作token的专属文件
const key = 'w-p'
export const setToken = val => {
  localStorage.setItem(key, val)
}

export const getToken = () => {
  return localStorage.getItem(key)
}

export const removeToken = () => {
  localStorage.removeItem(key)
}