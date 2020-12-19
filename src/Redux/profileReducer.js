import { profileAPI } from "../api/api"

const SET_PROFILE = 'profile/SET_PROFILE'
const TOGGLE_FETCHING = 'profile/TOGGLE_FETCHING'
const SET_STATUS = 'profile/SET_STATUS'

const initialState = {
    aboutMe: null,
    contacts: {
        facebook: null,
        website: null,
        vk: null,
        twitter: null,
        instagram: null,
        youtube: null,
        github: null,
        mainLink: null
    },
    lookingForAJob: false,
    lookingForAJobDescription: null,
    fullName: null,
    userId: null,
    photos: {
        small: null,
        large: null
    },
    status: null,
    isFetching: false,
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
        default:
            return state
    }
}

const setStatus = (status) => ({ type: SET_STATUS, status})

export const setProfileAC = id => dispatch => {
    dispatch({ type: TOGGLE_FETCHING })
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

export default profileReducer