// src/features/apiReducer.js
import { API_REQUEST, API_SUCCESS, API_FAILURE } from '../actions/ActionsType.js'

const initialState = {
  loading: false,
  data: null,
  error: null
}

const userRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_REQUEST:
      if (action.payload.source === 'userRoleReducer') {
        return {
          ...state,
          loading: true,
          error: null
        }
      }
      return state // Return unchanged state if source doesn't match

    case API_SUCCESS:
      if (action.payload.source === 'userRoleReducer') {
        return {
          ...state,
          loading: false,
          data: action.payload.data
        }
      }
      return state // Return unchanged state if source doesn't match

    case API_FAILURE:
      if (action.payload.source === 'userRoleReducer') {
        return {
          ...state,
          loading: false,
          error: action.payload.error
        }
      }
      return state // Return unchanged state if source doesn't match

    default:
      return state
  }
}

export default userRoleReducer
