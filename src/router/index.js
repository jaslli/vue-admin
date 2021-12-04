import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from '@/plugins/NProgress.js'
import store from '@/store'

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

// router的前置路由守卫
router.beforeEach((to, _from, next) => {
  NProgress.start();
  if (to.path === '/login') {
    next()
  } else if (!store.getters.userId) {
    next({ path: '/login' })
    NProgress.done()
  } else {
    next()
  }
})

// router的后置路由守卫
router.afterEach(() => {
  NProgress.done()
})

// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
