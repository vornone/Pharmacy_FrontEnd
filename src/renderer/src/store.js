// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import apiReducer from './reducers/apiReducer'
import CategoryReducer from './reducers/CategoryReducer'

const rootReducer = combineReducers({
  apiReducer: apiReducer,
  categoryReducer: CategoryReducer
})
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store
