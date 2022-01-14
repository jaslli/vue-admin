import { login, logout, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { getMenu } from '@/utils/menu'
import { resetRouter } from '@/router'

const state = {
	userId: '',
	token: getToken(),
	username: '',
	avatar: '',
	roles: [],
	menuList: []
}

// 准备mutations-用于操作数据（state）
const mutations = {
	SET_USERID: (state, userId) => {
		state.userId = userId
	},
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_USERNAME: (state, username) => {
		state.username = username
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar
	},
	SET_ROLES: (state, roles) => {
		state.roles = roles
	},
	SET_MENULIST: (state, menuList) => {
		state.menuList = menuList
	},
	INIT_STATE: (state) => {
		state.userId = '',
		state.token = '',
		state.username = '',
		state.avatar =  '',
		state.roles = [],
		state.menuList = []
	}
}

const actions = {

	doLogin({ commit }, userInfo) {
		const { username, password } = userInfo
		// 拟定参数
		const parm = new URLSearchParams()
		parm.append('username', username)
		parm.append('password', password)
		return new Promise((resolve, reject) => {
			login(parm).then(async (response) => {
				const { data } = response
				commit('SET_TOKEN', data)
				setToken(data)
				// 获取用户信息
				let id = await this.dispatch('user/getUserInfo', username)
				// 获取用户菜单
				await getMenu(id)
				resolve()
			}).catch((error) => {
				reject(error)
			})
		})
	},

	  // 获取用户信息
	getUserInfo({ commit }, userName) {
		return new Promise((resolve, reject) => {
			getUserInfo(userName).then(response => {
				const { data } = response
				if (!data) {
					this.$message.error('请重新登陆')
				}
				const { roles, avatar, id } = data
				commit('SET_USERID', id)
				commit('SET_USERNAME', userName)
				commit('SET_ROLES', roles)
				commit('SET_AVATAR', avatar)
				resolve(id)
			}).catch(error => {
				reject(error)
			})
		})
	},

	  // 注销登录函数
	doLogout({ commit, state }) {
		return new Promise((resolve, reject) => {
			logout(state.token).then(() => {
				commit('INIT_STATE')
				removeToken()
				resetRouter()
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}