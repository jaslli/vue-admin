import request from '@/utils/request'
import router from '@/router'
import Layout from '@/layout'
import store from '@/store'

// 获取用户的权限菜单
export function getMenu(userId) {
    request({
        url: `/menu/getMenuList/${userId}`,
        method: 'get'
    }).then((response) => {
        const { data } = response
        const userList = filterRouter(data)
        // 将component从字符串转变为引用
        // 一次性将菜单加入到路由，官方不建议使用
        // router.addRoutes(userList)
        // 官方建议使用addRoute
        userList.forEach(route => {
            router.addRoute(route)
        })
        store.commit('user/SET_MENULIST', userList)
    }).catch(error => {
        console.log(error)
    })
}

// 遍历routes，将routes中的组件导入
function filterRouter(routes) {
    const asyncRoutes = routes.filter(route => {
        route.meta = { }
        route.meta.title = route.title
        route.component = loadView(route.component.toLowerCase())
        // TODO
        // if (route.icon != null) {
        //   route.icon = 'iconfont' + route.icon
        // }
        if (route.children && route.children.length) {
            route.children = filterRouter(route.children)
        }
        return true
    })
    return asyncRoutes
}

// 将页面的组件加载到router中，注意不能使用import静态导入
export const loadView = (view) => {
    if (view === '') return
    if (view === 'layout') return Layout
    return () => import(`@/views/${view}`)
}