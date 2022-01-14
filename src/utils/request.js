import axios from 'axios'
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
		} else {
			this.$message.error(res.message)
		}
	},
	error => {
		console.log('err' + error)
		this.$message.error(error)
		return Promise.reject(error)
	}
)

export default service