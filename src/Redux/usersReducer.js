import { followAPI, usersAPI } from '../api/api'
import { toggleIsFollowed } from './profileReducer'

const SET_USERS = 'users/SET_USERS'
const TOGGLE_IS_FOLLOWED = 'users/TOGGLE_IS_FOLLOWED'
const TOGGLE_FOLLOW_PROCESSING = 'users/TOGGLE_FOLLOW_PROCESSING'

const initialState = {
    users: [],
    page: 1,
    usersCount: null,
    pageSize: 9,
    isFollowProcessing: [],
}

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload.users,
                usersCount: action.payload.usersCount
            }
        case TOGGLE_IS_FOLLOWED:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.id) {
                        return {...user, followed: !user.followed}
                    } else {
                        return user
                    }
                })
            }
        case TOGGLE_FOLLOW_PROCESSING:
            return {
                ...state,
                isFollowProcessing: state.isFollowProcessing.some(id => id === action.id)
                    ? state.isFollowProcessing.filter(id => id !== action.id)
                    : [...state.isFollowProcessing, action.id]
            }
        default:
            return state
    }
}

export const getUsers = (page, pageSize, search, isFriendList) => dispatch => {
    usersAPI.getUsers(page, pageSize, search, isFriendList)
        .then(response => dispatch({
            type: SET_USERS,
            payload: {
                users: response.items,
                usersCount: response.totalCount
            }
        }))
}

export const follow = id => dispatch => {
    dispatch({ type: TOGGLE_FOLLOW_PROCESSING, id })
    followAPI.follow(id)
    .then(() => {
        dispatch({ type: TOGGLE_FOLLOW_PROCESSING, id })
        dispatch({ type: TOGGLE_IS_FOLLOWED, id})
        dispatch(toggleIsFollowed())
    })
}

export const unfollow = id => dispatch => {
    dispatch({ type: TOGGLE_FOLLOW_PROCESSING, id })
    followAPI.unfollow(id)
    .then(() => {
        dispatch({ type: TOGGLE_FOLLOW_PROCESSING, id })
        dispatch({ type: TOGGLE_IS_FOLLOWED, id})
        dispatch(toggleIsFollowed())
    })
}

export default usersReducer