import React, {useState} from 'react'
import * as axios from 'axios'

const Auth = () => {
	const [loginInput, setLoginInput] = useState('')
	const [passwordInput, setPasswordInput] = useState('')
	const onLoginInputChange = (e) => {
		setLoginInput(e.target.value)
	}
	const onPasswordInputChange = (e) => {
		setPasswordInput(e.target.value)
	}
	const onSubmit = (e) => {
		e.preventDefault()
		console.log(loginInput + ' ' + passwordInput)
		axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
			withCredentials: true
		})
			.then(response => console.log(response.data))
	}
	return <>
		<div>Auth page</div>
		<form onSubmit={onSubmit}>
			<input type="text" name="login" onChange={onLoginInputChange} placeholder="login" value={loginInput}/>
			<input type="text" name="password" onChange={onPasswordInputChange} placeholder="password" value={passwordInput}/>
			<button>submit</button>
		</form>
	</>
}

export default Auth