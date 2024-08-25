import * as actions from '../constants/AuthConstants.js'
import * as url from '../constants/AuthUrlConstant.js'
import { post } from '../common/apiCaller.js'
import { toast } from 'react-toastify'

export const login = (inputData, redirectUrl) => async (dispatch) => {
  try {
    const { data } = await post(url.loginUrl, inputData, '', false)

    await dispatch({ type: actions.LOGIN_SUCCESS, payload: { data } })
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.token)
    toast.success(data.message)
    window.location.replace(`${window.location.origin}${redirectUrl}`)
  } catch (error) {
    await dispatch({
      type: actions.LOGIN_SUCCESS,
      payload: {
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      }
    })

    toast.error(
      error.response && error.response.data.message ? error.response.data.message : error.message
    )
    return true
  }
}
