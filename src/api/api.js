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
	login(email, password, captcha) {
		return instance.post('auth/login', {email, password, rememberMe: true, captcha})
			.then(response => response.data)
	},
	getCaptcha() {
		return instance.get('security/get-captcha-url')
			.then(response => response.data)
	}
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
	},
	uploadPhoto(photo) {
		const formData = new FormData()
		formData.append('image', photo)
		return instance.put('profile/photo', formData)
			.then(response => response.data)
	}
}

export const usersAPI = {
	getUsers(page, pageSize, search, isFriendList = false) {
		if (!isFriendList) {
			return instance.get(`users?term=${search}&count=${pageSize}&page=${page}`)
				.then(response => response.data)
		} else {
			return instance.get(`users?friend=true&count=${pageSize}&page=${page}`)
				.then(response => response.data)
		}		
	}
}

export const followAPI = {
	isFollowed(id) {
		return instance.get(`follow/${id}`)
			.then(response => response.data)
	},
	follow(id) {
		return instance.post(`follow/${id}`)
			.then(response => response.data)
	},
	unfollow(id) {
		return instance.delete(`follow/${id}`)
			.then(response => response.data)
	}
}