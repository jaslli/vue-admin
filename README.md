# 引入element-ui插件

然后在配置的文件中按需引用所需要的组件。

```js
// @/plugins/element.js
import Vue from 'vue'
import {
    Button,
    MessageBox,
    Message,
    Form,
    FormItem
} from 'element-ui'

Vue.use(Button)
Vue.component(MessageBox)
Vue.component(Message)
Vue.use(Form)
Vue.use(FormItem)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm;
```



# 引入vue-router

vue-router的配置文件，因为涉及到动态获取菜单，然后动态导入路由，所以只能配置一些固定的路由。

```js
// @/router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
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
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else if (!store.getters.userId) {
    next({ path: '/login' })
  } else {
    next()
  }
})

// router的后置路由守卫
router.afterEach(() => {})

// 重置路由,恢复到只有固定路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
```



# 封装axios

简单封装一下axios，不进行更深度的封装，可以考虑封装到请求类型的方法，然后挂入vue的原型对象。

```js
import axios from 'axios'
import { getToken } from '@/utils/auth'
import store from '@/store'

// @/utils/request.js

// 创建axios实例
const service = axios.create({
	// 请求超时时间
	timeout: 5000
})

// request拦截器
service.interceptors.request.use(config => {
	// 当request发送前的操作，让每一个请求携带一个Token
	if (store.getters.token) {
        // 将token放入请求头发送
		config.headers['Authorization'] = getToken()
	}
	return config
}, error => {
	// 当请求失败后
	console.log(error)
	Promise.reject(error)
})


// response拦截器
service.interceptors.response.use(
	response => {
		const res = response.data
		if (res.code === 20000) {
			return res
		}  else {
			// else里面的内容根据状态码的不同判断token的情况，然后进行操作
		}
	},
	error => {
		console.log(error)
		return Promise.reject(error)
	}
)

export default service
```

# 动态获取路由

```js
import request from '@/utils/request'
import router from '@/router'
import Layout from '@/layout'
import store from '@/store'

// @/utils/menu.js

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
        // 存入vuex中
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
        if (route.children && route.children.length) {
            route.children = filterRouter(route.children)
        }
        return true
    })
    return asyncRoutes
}

// 将页面的组件加载到router中
export const loadView = (view) => {
    if (view === '') return
    if (view === 'layout') return Layout
    return () => import(`@/views/${view}`)
}
```



# 引入vuex



因为vuex存在刷新丢失的问题，所以需要将信息存入浏览器，所以先引入插件`vuex-persistedstate`，在vuex中使用该插件就能帮我们自动将state的数据存入浏览器中。按照规范，所以就将vuex分成几个模块，然后配置文件一起导入即可。

```js
// @/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// 将moudules中的所有js文件导入
const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters,
  // vuex存储到sessionStorage
  plugins: [persistedState({storage: window.sessionStorage})],
})

export default store
```



# 登录流程

先在登录页面的点击登录的按钮上添加一个登录事件。

```js
	// @/views/login/index.vue
	handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch("user/doLogin", this.loginForm)
            .then(() => {
              this.$message.success("登录成功");
              this.$router.push({ path: '/' });
              this.loading = false
            })
            .catch((error) => {
              this.loading = false
              console.log(error)
            });
        } else {
          this.$message.error("请正确输入用户名与密码");
          return false;
        }
      });
    }
```

随后异步调用到store的登录事件。

```js
	// @/store/modules/user.js
	doLogin({ commit }, userInfo) {
		const { username, password } = userInfo
		// 拟定参数
		const parm = new URLSearchParams()
		parm.append('username', username)
		parm.append('password', password)
		return new Promise((resolve, reject) => {
            // 调用login方法，发送登录请求
			login(parm).then(async (response) => {
                // 登录获取返回的token，并存储到vuex中
				const { data } = response
				commit('SET_TOKEN', data)
				setToken(data)
				// 获取用户信息
				let id = await this.dispatch('user/getUserInfo', username)
				// 获取用户菜单
				await getMenu(id)
				resolve()
			}).catch(() => {
				reject(error)
			})
		})
	},
```

登录就主要是提交账号密码，然后获取通行证token。



# 引入进度条，为页面跳转添加进度条

```js
import NProgress from "nprogress";
import 'nprogress/nprogress.css'

// @/plugins/NProgress.js
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

export default NProgress
```

因为是跳转的时候出现进度条，所以可以考虑在跳转前开启进度条，跳转后关闭进度条，所以就是需要在前置路由守卫中和后置路由守卫中添加。

```js
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
router.beforeEach((to, from, next) => {
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
```

