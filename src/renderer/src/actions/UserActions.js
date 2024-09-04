import { toast } from 'react-toastify'
import * as action from '../constants/UserConstants.js'
import { get } from '../common/apiCaller.js'

const userUrl = 'http://localhost:8080/user/getAll'
export const retrieveUser = () => async (dispatch) => {
  try {
    const { data } = await get(userUrl, '', false)
    dispatch({ type: action.USER_RETRIEVE_REQUEST, payload: { data } })

    return data
  } catch (error) {
    dispatch({ type: action.USER_RETRIEVE_FAIL, payload: error.message })
    toast.error(error.message)
  }
}
