import * as axios from 'axios'

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	header: {
		'API-KEY': 'b33b9c35-783c-4d6f-8b5f-7802c2d595db'
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
			.then(response => response.data)
	}
}