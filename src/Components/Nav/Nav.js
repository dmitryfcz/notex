import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { logOut } from './../../redux/authReducer'
import styles from './Nav.module.css'


const Nav = () => {
	const dispatch = useDispatch()
	const logout = (e) => {
		e.preventDefault()
		dispatch(logOut())
	}
	return (
		<>
			<NavLink to='/profile' className={styles.navLink} activeClassName={styles.active}><img src="/icons/icons8-google-home-30.png" alt=""/> My profile</NavLink>
			<NavLink to='/dialogs' className={styles.navLink} activeClassName={styles.active}><img src="/icons/icons8-envelope-30.png" alt=""/>Messenger</NavLink>
			<NavLink to='/users' className={styles.navLink} activeClassName={styles.active}><img src="/icons/icons8-team-30.png" alt=""/>Users</NavLink>
			<br/>
			<NavLink to='/settings' className={styles.navLink} activeClassName={styles.active}><img src="/icons/icons8-settings-30.png" alt=""/>Settings</NavLink>
			<NavLink onClick={logout} to='/logout' className={styles.navLink}><img src="/icons/icons8-shutdown-30.png" alt=""/>Logout</NavLink>

			<NavLink to='/auth' className={styles.navLink}>Login</NavLink>
			<NavLink to='/profile/2' className={styles.navLink}>Dimich</NavLink>
			<NavLink to='/profile/88' className={styles.navLink}>None</NavLink>
			<NavLink to='/profile/9' className={styles.navLink}>9999</NavLink>
		</>

	)
}
export default Nav