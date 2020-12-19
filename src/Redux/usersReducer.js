import { usersAPI } from "../api/api"

const SET_USERS = 'users/SET_USERS'

const initialState = {
    users: [],
    page: 1,
    usersCount: null
}

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload.users,
                usersCount: action.payload.usersCount
            }
        default:
            return state
    }
}

export const getUsers = (page) => dispatch => {
    usersAPI.getUsers(page)
        .then(response => dispatch({
            type: SET_USERS,
            payload: {
                users: response.items,
                usersCount: response.totalCount
            }
        }))
}

export default usersReducer