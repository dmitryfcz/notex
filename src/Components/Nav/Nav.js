import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logOut } from './../../redux/authReducer'
import styles from './Nav.module.css'


const Nav = () => {
	const dispatch = useDispatch()
	const currentUser = useSelector(state => state.auth.id)
	const logout = (e) => {
		e.preventDefault()
		dispatch(logOut())
	}
	return (
		<>
			<NavLink to={`/profile/${currentUser || ''}`} className={styles.navLink} activeClassName={styles.active}><img src='/img/icons/icons8-google-home-30.png' alt=''/> <span>My profile</span></NavLink>
			<NavLink to='/dialogs' className={styles.navLink} activeClassName={styles.active}><img src='/img/icons/icons8-envelope-30.png' alt=''/><span>Messenger</span></NavLink>
			<NavLink to='/friends' className={styles.navLink} activeClassName={styles.active}><img src='/img/icons/icons8-team-30.png' alt=''/><span>Friends</span></NavLink>
			<NavLink to='/users' className={styles.navLink} activeClassName={styles.active}><img src='/img/icons/icons8-search-client-30.png' alt=''/><span>Search</span></NavLink>
			<br/>
			<NavLink to='/settings' className={styles.navLink} activeClassName={styles.active}><img src='/img/icons/icons8-settings-30.png' alt=''/><span>Edit profile</span></NavLink>
			<NavLink to='/about' className={styles.navLink} activeClassName={styles.active}><img src='/img/icons/icons8-info-30.png' alt=''/><span>About</span></NavLink>
			<NavLink onClick={logout} to='/logout' className={styles.navLink}><img src='/img/icons/icons8-shutdown-30.png' alt=''/><span>Logout</span></NavLink>
		</>

	)
}
export default Nav