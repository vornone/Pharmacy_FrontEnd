// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import apiReducer from './reducers/apiReducer'
import categoryReducer from './reducers/categoryReducer'
import userRoleReducer from './reducers/UserRoleReducer'
const rootReducer = combineReducers({
  apiReducer: apiReducer,
  categoryReducer: categoryReducer,
  userRoleReducer: userRoleReducer
})
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store
