import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

// 默认路由
const routes = [
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login')
  }
]

// 创建路由对象
const createRouter = () => new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes
})


// 创建一个需要使用的路由器
const router = createRouter()

// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
