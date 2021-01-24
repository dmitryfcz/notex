import {authAPI} from '../api/api'

const INIT_APP = 'app/INIT_APP'
const SET_USER = 'auth/SET_USER'
const SET_CAPTCHA = 'auth/SET_CAPTCHA'

const initialState = {
	id: null,
	login: null,
	email: null,
	isInit: false,
	captcha: null
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				...action.payload
			}
		case INIT_APP:
			return {
				...state,
				isInit: true
			}
		case SET_CAPTCHA:
			return {
				...state,
				captcha: action.captcha
			}
		default:
			return state
	}
}

const initApp = () => ({ type: INIT_APP })

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
			dispatch(initApp())
		})
}

const getCaptcha = () => dispatch => {
	authAPI.getCaptcha()
		.then(response => dispatch({type: SET_CAPTCHA, captcha: response.url}))
}

export const logIn = (email, password, captcha, setSubmitting, setStatus) => dispatch => {
	authAPI.login(email, password, captcha)
		.then(response => {
			if(response.resultCode === 0) {
				dispatch(getUser())
				setSubmitting(false)
				dispatch({type: SET_CAPTCHA, captcha: null})
			} else if (response.resultCode === 1) {
				setSubmitting(false)
				setStatus(response.messages)
			} else if (response.resultCode === 10) {
				dispatch(getCaptcha())
				setSubmitting(false)
				setStatus(response.messages)
			}
		})
}

export const logOut = () => dispatch => {
	authAPI.logout()
		.then(response => response.resultCode === 0 && dispatch(setUser(null, null, null)))
}

export default authReducer