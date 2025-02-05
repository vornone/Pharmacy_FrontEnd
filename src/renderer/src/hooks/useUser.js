import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { queryData } from '../actions/ActionsType'
import { useEffect } from 'react'

const useUser = () => {
  const apiSource = 'userReducer'
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.userReducer)
  const getUser = () => {
    dispatch(queryData(apiSource, 'user/getAll', 'POST'))
  }
  const deleteUser = (body) => {
    dispatch(queryData('deleteReducer', 'user/delete', 'POST', body))
  }

  const addUser = (body) => {
    dispatch(queryData(apiSource, 'user/register', 'POST', body))
  }
  return {
    data: data?.data.user,
    loading,
    error,
    getUser,
    deleteUser,
    addUser
  }
}
export default useUser
