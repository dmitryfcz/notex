import React, {useEffect, useState} from 'react'
import {Link, Redirect, useHistory, useParams} from 'react-router-dom'
import styles from './Profile.module.css'
import btnStyles from '../Users/Users.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { setProfileAC, getStatus, updatePhoto } from '../../redux/profileReducer';
import { follow, unfollow } from './../../redux/usersReducer'
import NotFound from '../NotFound/NotFound';
import Status from './Status';
import Avatar from 'react-avatar';

const Profile = () => {
	let { id } = useParams()
	const loggedUserID = useSelector(state => state.auth.id)
	const profile = useSelector(state => state.profile)
	const isFollowProcessing = useSelector(state => state.users.isFollowProcessing)
	const isPhotoUploading = useSelector(state => state.profile.isPhotoUploading)
	const photoUploadingErrorText = useSelector(state => state.profile.photoUploadingErrorText)
	const dispatch = useDispatch()
	const history = useHistory()
	const [photoUploadVisible, setPhotoUploadVisible] = useState(false)
	
	if (!id) history.push(`/profile/${loggedUserID}`)

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

	const onFollow = id => {
		dispatch(follow(id))
    }
    const onUnfollow = id => {
		dispatch(unfollow(id))
	}

	const onUploadPhoto = (e) => {
		if (e.target.files.length) {
			dispatch(updatePhoto(e.target.files[0], setPhotoUploadVisible))
		}
	}
	
	const withHttps = url => !/^https?:\/\//i.test(url) ? `https://${url}` : url;

	return (
		<>
			{!profile.isFetching ?
				<div className={styles.profile}>
					{isPageOwner && <i onClick={() => setPhotoUploadVisible(!photoUploadVisible)} className={styles.uploadPhoto + ' fas fa-cloud-upload-alt'}></i>}
					{profile.photos.large
						? <img src={profile.photos.large} alt='userpic' />
						: <Avatar name={profile.fullName} size='136' maxInitials={2} round='50%' className={styles.profilePhoto} />
					}
					{ photoUploadVisible && <div className={styles.photoUploadForm}>
							<input onChange={onUploadPhoto} type='file'/>
							{isPhotoUploading && <div className={styles.photoLoading}>Please wait...</div>}
							{photoUploadingErrorText && <div className={styles.photoUploadError}>{photoUploadingErrorText}</div>}
						</div> 
					}
					<div className={styles.login}>{profile.fullName}</div>
					<Status isPageOwner={isPageOwner} status={profile.status} />
					{ isPageOwner ? null : profile.isFollowed
                        ? <div className={styles.btns}>
								<Link to='/dialogs' className={styles.btn + ' ' + styles.btnMessage} >Send message</Link>
								<button onClick={() => onUnfollow(profile.userId)} className={btnStyles.btn + ' ' + btnStyles.btnUnfollow} disabled={isFollowProcessing.some(id => id === profile.userId)}>Unfollow</button>
							</div>
                        : <div className={styles.btns}>
								<Link to='/dialogs' className={styles.btn + ' ' + styles.btnMessage} >Send message</Link>
								<button onClick={() => onFollow(profile.userId)} className={btnStyles.btn} disabled={isFollowProcessing.some(id => id === profile.userId)}>Follow</button>
							</div>
                    }
					<div className={styles.about}><b><i className='fas fa-user'></i> About me: </b>{profile.aboutMe}</div>
					<div className={styles.about}><b><i className='fas fa-atom'></i> Tech stack: </b>{profile.lookingForAJobDescription}</div>
					<div className={styles.about}><b><i className='fas fa-briefcase'></i> Looking for a job: </b>{profile.lookingForAJob ? 'Yes' : 'No'}</div>
					<div className={styles.about}><b><i className='fas fa-id-card'></i> Contacts:</b></div>
					<ul>
					{Object.keys(profile.contacts).map(key => {
						return profile.contacts[key] && <li key={key}><a className={styles.links} href={withHttps(profile.contacts[key])}>{key}</a></li>
					})}
					</ul>
				</div>
				: <div>404 Page not found</div>
			}
		</>
	)
}

export default Profile