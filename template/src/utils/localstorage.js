/**
 * 存储localStorage
 */
export const setStore = function(name, content) {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = function(name) {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = function(name) {
  if (!name) return
  window.localStorage.removeItem(name)
}
