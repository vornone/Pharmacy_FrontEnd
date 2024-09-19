// src/features/apiReducer.js
import { API_REQUEST, API_SUCCESS, API_FAILURE } from '../actions/ActionsType.js'

const initialState = {
  loading: false,
  data: null,
  error: null
}

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case API_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    case API_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default apiReducer
