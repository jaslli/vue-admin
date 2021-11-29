import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import store from '@/store'

// 创建axios实例
const service = axios.create({
	// 请求超时时间
	timeout: 5000
})

// request拦截器
service.interceptors.request.use(config => {
	// 当request发送前的操作，让每一个请求携带一个Token
	if (store.getters.token) {
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
		} 
		// else {
		// 	/**
		// 	 *  50008   非法的token
		// 	 *  50012   其他客户端登陆了
		// 	 *  50014   Token过期了
		// 	 */
		// 	if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
		// 		MessageBox.confirm('你已经退出，可以取消继续留在该页面，或重新登陆', '确认退出', {
		// 			confirmBurronText: '重新登陆',
		// 			cancelButtonText: '取消',
		// 			type: 'warning'
		// 		}).then(() => {
		// 			store.dispatch('user/resetToken').then(() => {
		// 				// 重新实例化vue-router对象，避免bug
		// 				location.reload()
		// 			})
		// 		})
		// 		return Promise.reject(new Error(res.message || 'Error'))
		// 	} else {
		// 		Message({
		// 			message: res.message || 'Error',
		// 			type: 'error',
		// 			duration: 5 * 1000
		// 		})
		// 	}
		// }
	},
	error => {
		console.log('err' + error)
		Message({
			message: error.message,
			type: 'error',
			duration: 5 * 1000
		})
		return Promise.reject(error)
	}
)

export default service