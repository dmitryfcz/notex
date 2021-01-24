import { followAPI, profileAPI } from '../api/api'

const SET_PROFILE = 'profile/SET_PROFILE'
const TOGGLE_FETCHING = 'profile/TOGGLE_FETCHING'
const SET_STATUS = 'profile/SET_STATUS'
const IS_FOLLOWED = 'profile/IS_FOLLOWED'
const TOGGLE_IS_FOLLOWED = 'profile/TOGGLE_IS_FOLLOWED'
const TOGGLE_IS_PHOTO_UPLOADING = 'profile/TOGGLE_IS_PHOTO_UPLOADING'
const SET_PHOTO = 'profile/SET_PHOTO'
const PHOTO_UPLOADING_ERROR_TEXT = 'profile/PHOTO_UPLOADING_ERROR_TEXT'

const initialState = {
    aboutMe: '',
    contacts: {
        facebook: '',
        website: '',
        vk: '',
        twitter: '',
        instagram: '',
        youtube: '',
        github: '',
        mainLink: ''
    },
    lookingForAJob: false,
    lookingForAJobDescription: '',
    fullName: '',
    userId: null,
    photos: {
        small: '',
        large: ''
    },
    status: '',
    isFollowed: false,
    isFetching: false,
    isPhotoUploading: false,
    photoUploadingErrorText: null
}
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                ...action.payload
            }
        case TOGGLE_FETCHING:
            return {
                ...state,
                isFetching: !state.isFetching
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case IS_FOLLOWED:
            return {
                ...state,
                isFollowed: action.isFollowed
            }
        case TOGGLE_IS_FOLLOWED:
            return {
                ...state,
                isFollowed: !state.isFollowed
            }
        case TOGGLE_IS_PHOTO_UPLOADING:
            return {
                ...state,
                isPhotoUploading: !state.isPhotoUploading
            }
        case SET_PHOTO:
            return {
                ...state,
                photos: {
                    small: action.small,
                    large: action.large
                }
            }
        case PHOTO_UPLOADING_ERROR_TEXT:
            return {
                ...state,
                photoUploadingErrorText: action.text
            }
        default:
            return state
    }
}

const setStatus = status => ({ type: SET_STATUS, status})

export const setProfileAC = id => dispatch => {
    dispatch({ type: TOGGLE_FETCHING })
    dispatch(getIsFollowed(id))
    profileAPI.getProfile(id)
    .then(response => {
        dispatch({ type: SET_PROFILE, payload: response.data })
        dispatch({ type: TOGGLE_FETCHING })
    } )
    .catch(
        response => { if (response.status !== 200) {
            dispatch({ type: SET_PROFILE, payload: { userId: null } })
            dispatch({ type: TOGGLE_FETCHING })
        }
    }
    )
}

export const updateProfile = (data, setSubmitting, setStatus, setUpdated) => {
    profileAPI.updateProfile(data)
        .then(response => {
            if (response.data.resultCode === 0) {
                setSubmitting(false)
                setUpdated(true)
                setTimeout(() => {
                    setUpdated(false)
                }, 3000);
            } else {
                setStatus(response.data.messages)
                setSubmitting(false)
            }
        })
}

export const getIsFollowed = id => dispatch => {
    followAPI.isFollowed(id)
    .then(response => dispatch({type: IS_FOLLOWED, isFollowed: response}))
}

export const toggleIsFollowed = () => ({ type: TOGGLE_IS_FOLLOWED })

export const getStatus = id => dispatch => {
    profileAPI.getStatus(id)
    .then(response => dispatch(setStatus(response)))
}

export const updateStatus = status => dispatch => {
    profileAPI.updateStatus(status)
        .then(response => {if (response.resultCode === 0) {
            dispatch(setStatus(status))
        }})
}

export const updatePhoto = (photo, setPhotoUploadVisible) => dispatch => {
    dispatch({type: TOGGLE_IS_PHOTO_UPLOADING})
    profileAPI.uploadPhoto(photo)
        .then(response => {if (response.resultCode === 0) {
            dispatch({type: SET_PHOTO, small:response.data.photos.small, large:response.data.photos.large})
            dispatch({type: TOGGLE_IS_PHOTO_UPLOADING})
            dispatch({type: PHOTO_UPLOADING_ERROR_TEXT, text: null})
            setPhotoUploadVisible(false)
        } else {
            dispatch({type: TOGGLE_IS_PHOTO_UPLOADING})
            dispatch({type: PHOTO_UPLOADING_ERROR_TEXT, text: response.messages[0]})
        }})
}

export default profileReducer