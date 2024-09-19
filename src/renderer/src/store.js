// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import apiReducer from './reducers/apiReducer'
const store = configureStore({
  reducer: {
    apiReducer: apiReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store
