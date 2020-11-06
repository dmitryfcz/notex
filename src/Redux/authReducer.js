import {authAPI} from '../api/api'

const SET_USER = 'auth/SET_USER'

const initialState = {
	id: null,
	login: null,
	email: null
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				...action.payload
			}
		default:
			return state
	}
}

const setUser = (id, login, email) => ({
	type: SET_USER,
	payload: {id, login, email}
})

export const getUser = () => dispatch => {
	authAPI.me()
		.then(response => {
			if (response.resultCode === 0) {
				const {id, login, email} = response.data
				dispatch(setUser(id, login, email))
			}
		})
}

export const logIn = (email, password) => dispatch => {
	authAPI.login(email, password)
		.then(response => response.resultCode === 0 && dispatch(getUser()))
}

export const logOut = () => dispatch => {
	authAPI.logout()
		.then(response => response.resultCode === 0 && dispatch(setUser(null, null, null)))
}

export default authReducer