import { useSelector } from 'react-redux'
import useApiCaller from './useApiCaller'
import { useDispatch } from 'react-redux'
import { queryData } from '../actions/ActionsType'
import { useEffect } from 'react'
const useGetAllUser = () => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.apiReducer)
  const fetchData = () => {
    dispatch(queryData('user/getAll', 'GET'))
  }
  useEffect(() => {
    data
  }, [fetchData, data])
  return { data: data?.data.list, loading, error, fetchData }
}
export default useGetAllUser
