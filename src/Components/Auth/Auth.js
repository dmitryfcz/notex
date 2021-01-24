import { Formik, Form, Field } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../redux/authReducer';
import styles from './Auth.module.css'

const Auth = () => {
	const dispatch = useDispatch()
	const captcha = useSelector(state => state.auth.captcha)
	
	return <>
		<div className={styles.form}>
			<div className={styles.title}>Sing In</div>
			<Formik
				enableReinitialize
				initialValues={{
					login: '',
					password: ''
				}}
				onSubmit={(values, {setSubmitting, setStatus}) => {
					setSubmitting(true)
					dispatch(logIn(values.login, values.password, values.captcha, setSubmitting, setStatus))
				}}
			>
				{({isSubmitting, status}) => (
					<Form>
						<Field name='login' id='login' className={styles.input} placeholder='Your email' required />
						<Field name='password' id='password' type='password' className={styles.input} placeholder='Your password' required />
						{ captcha && <>
							<img src={captcha} className={styles.captcha} alt='captcha' />
							<Field name='captcha' id='captcha' className={styles.input} placeholder='Please enter the captcha' />
						</>}
						{ status && status.map(error => (
							<div key='error' className={styles.errorMessage}>{error}</div>
						))}
						<button className={styles.btn} disabled={isSubmitting} type='submit'>Get Started</button>
					</Form>
				)}
			</Formik>
		</div>
	</>
}

export default Auth