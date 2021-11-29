import request from '@/utils/request'

/**
 * 登录的方法
 * @param {object} data
 * @returns token
 */
export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}

/**
 * 获取用户基本信息
 * @returns 用户信息
 */
export function getUserInfo(userName) {
    return request({
        url: `/user/getUserInfo/${userName}`,
        method: 'get'
    })
}

/**
 * 注销登录
 * @param {string} token
 * @returns true Or false
 */
export function logout(token) {
    return request({
        url: '/logout',
        method: 'post',
        data: token
    })
}