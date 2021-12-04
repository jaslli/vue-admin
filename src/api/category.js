import request from '@/utils/request'

/**
 * 登录的方法
 * @param {object} data
 * @returns token
 */
export function selectAll() {
    return request({
        url: '/category/slelctAll',
        method: 'get'
    })
}