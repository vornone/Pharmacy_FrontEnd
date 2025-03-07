// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import userReducer from './reducers/UserReducer'
import categoryReducer from './reducers/CategoryReducer'
import userRoleReducer from './reducers/UserRoleReducer'
import productReducer from './reducers/ProductReducers'
import updateReducer from './reducers/UpdateReducer'
import deleteReducer from './reducers/DeleteReducer'
import insertReducer from './reducers/InsertReducer'
import supplierReducer from './reducers/SupplierReducer'
const rootReducer = combineReducers({
  userReducer: userReducer,
  categoryReducer: categoryReducer,
  userRoleReducer: userRoleReducer,
  productReducer: productReducer,
  updateReducer: updateReducer,
  deleteReducer: deleteReducer,
  insertReducer: insertReducer,
  supplierReducer: supplierReducer
})
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store
