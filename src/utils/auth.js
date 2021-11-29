import Cookie from 'js-cookie'

/**
 * Token的名称
 */
const TokenKey = 'Admin-Token'

/**
 * 从cookie中获取cookie
 * @returns token
 */
export function getToken() {
    return Cookie.get(TokenKey)
}

/**
 * 将Token存放到cookie中
 * @param {Stgring} token 
 * @returns true Or false
 */
export function setToken(token) {
    return Cookie.set(TokenKey, token)
}

/**
 * 将cookie中的Token移除
 * @returns true Or false
 */
export function removeToken() {
    return Cookie.remove(TokenKey)
}