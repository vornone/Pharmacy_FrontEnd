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
    dispatch(queryData(apiSource, 'user/delete', 'POST', body))
  }
  useEffect(() => {
    data
  }, [dispatch])

  return {
    data: data?.data.user,
    loading,
    error,
    getUser,
    deleteUser
  }
}
export default useUser
