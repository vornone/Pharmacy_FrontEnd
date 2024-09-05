import { USER_RETRIEVE_FAIL, USER_RETRIEVE_SUCCESS } from '../constants/UserConstants.js'

const initialState = { userList: [], error: null }

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case USER_RETRIEVE_SUCCESS:
      return {
        ...state,
        userList: payload
      }
    case USER_RETRIEVE_FAIL:
      return {
        ...state,
        error: payload.message
      }
    default:
      return state
  }
}
