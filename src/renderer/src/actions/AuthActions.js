import * as actions from '../constants/AuthConstants.js'
import * as url from '../constants/AuthUrlConstant.js'
import { post } from '../common/apiCaller.js'
import { toast } from 'react-toastify'

export const login = (inputData) => async (dispatch) => {
  try {
    const { data } = await post(url.loginUrl, inputData, '', false)

    // Dispatch success action
    await dispatch({ type: actions.LOGIN_SUCCESS, payload: { data } })

    // Store user data and token
    localStorage.setItem('user', JSON.stringify(data.user))
    sessionStorage.setItem('token', data.token)

    // Show success message

    // Return false to indicate success (no error)
    return false
  } catch (error) {
    // Dispatch error action
    await dispatch({
      type: actions.LOGIN_FAILURE, // Changed from LOGIN_SUCCESS for error case
      payload: {
        message: error.response?.data?.message || error.message
      }
    })

    // Show error message
    toast.error(error.response?.data?.message || error.message)

    // Return true to indicate error
    return true
  }
}
