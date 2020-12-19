import * as axios from 'axios'

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': '2eba6f7c-4ad2-4e25-a1cf-5132e4a29f22'
	}
})

export const authAPI = {
	me() {
		return instance.get('auth/me')
			.then(response => response.data)
	},
	logout() {
		return instance.delete('auth/login')
			.then(response => response.data)
	},
	login(email, password) {
		return instance.post('auth/login', {email, password, rememberMe: true})
			.then(response => response.data)
	},
}

export const profileAPI = {
	getProfile(id) {
		return instance.get(`profile/${id}`)
	},
	updateProfile(data) {
		return instance.put('profile', data)
	},
	getStatus(id) {
		return instance.get(`profile/status/${id}`)
			.then(response => response.data)
	},
	updateStatus(status) {
		return instance.put('profile/status', {status})
			.then(response => response.data)
	}
}

export const usersAPI = {
	getUsers(page) {
		return instance.get(`users?count=9&page=${page}`)
			.then(response => response.data)
	}
}