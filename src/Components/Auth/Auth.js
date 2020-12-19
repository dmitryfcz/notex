import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logIn } from '../../redux/authReducer';
import styles from './Auth.module.css'

const Auth = () => {
	const [emailInput, setLoginInput] = useState('')
	const [passwordInput, setPasswordInput] = useState('')
	const dispatch = useDispatch()

	const loggedUserID = useSelector(state => state.auth.id)
	if (loggedUserID) return <Redirect to='/profile' />

	const onLoginInputChange = (e) => {
		setLoginInput(e.target.value)
	}
	const onPasswordInputChange = (e) => {
		setPasswordInput(e.target.value)
	}
	const onSubmit = (e) => {
		e.preventDefault()
		dispatch(logIn(emailInput, passwordInput))
	}

	return <div className={styles.form}>
		<div className={styles.title}>Sing In</div>
		<form onSubmit={onSubmit}>
			<input className={styles.input} type="text" name="login" onChange={onLoginInputChange} placeholder="Your email" value={emailInput}/>
			<input className={styles.input} type="text" name="password" onChange={onPasswordInputChange} placeholder="Your password" value={passwordInput}/>
			<button className={styles.btn}>Get Started</button>
		</form>
	</div>
}

export default Auth