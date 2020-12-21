import React, {useEffect} from 'react'
import {Redirect, useHistory, useParams} from 'react-router-dom'
import styles from './Profile.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { setProfileAC, getStatus } from '../../redux/profileReducer';
import NotFound from '../NotFound/NotFound';
import Status from './Status';
import Avatar from 'react-avatar';
// import Loader from '../Loader/Loader';


const Profile = () => {
	let { id } = useParams()

	const loggedUserID = useSelector(state => state.auth.id)
	const history = useHistory()
	if (!id) history.push(`/profile/${loggedUserID}`)

	const dispatch = useDispatch()
	const profile = useSelector(state => state.profile)
	useEffect(() => {
		if (id) {
			dispatch(setProfileAC(id))
			dispatch(getStatus(id))
		}
	}, [id, dispatch, profile.userID])
	let isPageOwner = Number(id) === loggedUserID

	if (profile.isFetching) return <div style={{height: 470}}></div>
	if (!loggedUserID) return <Redirect to='/auth' />
	if (!profile.userId) return <NotFound />

	return (
		<>
			{!profile.isFetching ?
				<div className={styles.profile}>
					{profile.photos.large
						? <img src={profile.photos.large} alt="userpic" />
						: <Avatar name={profile.fullName} size="136" maxInitials={2} round="50%" className={styles.profilePhoto} />
					}
					<div className={styles.login}>{profile.fullName}</div>
					<Status isPageOwner={isPageOwner} status={profile.status} />
					<div className={styles.about}><b><i className="fas fa-user"></i> About me: </b>{profile.aboutMe}</div>
					<div className={styles.about}><b><i className="fas fa-atom"></i> Tech stack: </b>{profile.lookingForAJobDescription}</div>
					<div className={styles.about}><b><i className="fas fa-briefcase"></i> Looking for a job: </b>{profile.lookingForAJob ? 'Yes' : 'No'}</div>
					<div className={styles.about}><b><i className="fas fa-id-card"></i> Contacts:</b></div>
					<ul>
					{Object.keys(profile.contacts).map(key => {
						return <li key={key}><a href={profile.contacts[key] || '#'}>{key}</a></li>
					})}
					</ul>
				</div>
				: <div>404 Page not found</div>
			}
		</>
	)
}

export default Profile