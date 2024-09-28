
import { API_REQUEST, API_SUCCESS, API_FAILURE } from '../actions/ActionsType.js'

const initialState = {
  loading: false,
  data: null,
  error: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_REQUEST:
      if (action.payload.source === 'userReducer') {
        return {
          ...state,
          loading: true,
          error: null
        }
      }
    case API_SUCCESS:
      if (action.payload.source === 'userReducer') {
        return {
          ...state,
          loading: false,
          data: action.payload.data
        }
      }
    case API_FAILURE:
      if (action.payload.source === 'userReducer') {
        return {
          ...state,
          loading: false,
          error: action.payload.error
        }
      }
    default:
      return state
  }
}

export default userReducer
