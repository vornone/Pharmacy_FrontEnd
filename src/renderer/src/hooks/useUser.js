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
  useEffect(() => {
    data
  }, [data])

  return {
    data: data?.data.list,
    loading,
    error,
    getUser
  }
}
export default useUser
