import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { getUser, logIn } from '../../redux/authReducer';
import styles from './Auth.module.css'

const Auth = () => {
	const [emailInput, setLoginInput] = useState('')
	const [passwordInput, setPasswordInput] = useState('')
	const dispatch = useDispatch()

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

	useEffect(() => {
		dispatch(getUser())
	}, [dispatch])
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