import { toast } from 'react-toastify'
import * as actions from '../constants/UserConstants.js'
import { post } from '../common/apiCaller.js'

const userUrl = 'http://localhost:8080/user/getAll'
export const retrieveUser = () => async (dispatch) => {
  try {
    const { data } = await post(userUrl, null, '', false)
    await dispatch({ type: actions.USER_RETRIEVE_SUCCESS, payload: { data } })
  } catch (error) {
    await dispatch({ type: actions.USER_RETRIEVE_FAIL, payload: error.message })
    toast.error(error.message)
  }
}
