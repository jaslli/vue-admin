import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import NProgress from "nprogress";
import { getMenu } from "@/utils/menu"

Vue.config.productionTip = false

// nprogress的配置
NProgress.configure({
  // Changes the minimum percentage used upon starting
  minimum: 0.4,
  // Adjust animation settings using easing (a CSS easing string) and speed (in ms).
  easing: 'ease',
  speed: 500,
  // Turn off loading spinner by setting it to false
  showSpinner: false,
  // Adjust how often to trickle/increment, in ms.
  trickleSpeed: 200
})


// router的前置路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path === '/login') {
    next()
  } else if (!store.getters.userId) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

// router的后置路由守卫
router.afterEach(() => {
  NProgress.done()
})

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  },
  created() {
    if (store.getters.userId) {
      getMenu(store.getters.userId)
    }
  }
}).$mount('#app')