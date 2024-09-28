// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import userReducer from './reducers/userReducer'
import categoryReducer from './reducers/categoryReducer'
import userRoleReducer from './reducers/UserRoleReducer'
const rootReducer = combineReducers({
  userReducer: userReducer,
  categoryReducer: categoryReducer,
  userRoleReducer: userRoleReducer
})
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store
