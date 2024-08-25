import { createStore, applyMiddleware, combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import authReducer from './reducers/AuthReducers.js'

const middleware = [thunk]

const reducers = combineReducers({ authReducer: authReducer })

const store = createStore(reducers, applyMiddleware(...middleware))

export default store
