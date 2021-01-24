import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import usersReducer from './usersReducer'

const reducers = combineReducers({
	auth: authReducer,
	profile: profileReducer,
	users: usersReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export default store