import React, {useEffect, useState} from 'react'
import {authAPI, profileAPI} from "../../api/api";
import {useParams, useHistory} from 'react-router-dom'
import styles from './Profile.module.css'

const Profile = () => {
	const [profile, setProfile] = useState(null)
	let { id } = useParams()
	let history = useHistory()
	if (!id) {
		authAPI.me()
			.then(response => history.push(`/profile/${response.data.id}`))
	}
	useEffect(() => {
		profileAPI.getProfile(id)
			.then(response => setProfile(response))
			.catch(error => setProfile(null))
	}, [id])
	return (
		<>
			{profile ?
				<div className={styles.profile}>
					<img src={profile.photos.large} alt='userpic'/>
					<div className={styles.login}>{profile.fullName}</div>
					<div className={styles.status}>
						«With great power comes great responsibility»
						<i className="fas fa-pencil-alt"></i>
					</div>
					<div>{profile.aboutMe}</div>
					<div>{profile.lookingForAJob ? 'Ищу работу' : 'Не ищу'}</div>
					<div>{profile.lookingForAJobDescription}</div>
					<div>Contacts:</div>
					{Object.keys(profile.contacts).map(key => {
						return <div key={key}>{key}: {profile.contacts[key] || '--'}</div>
					})}
				</div>
				: <div>404 Page not found</div>
			}
		</>
	)
}

export default Profile