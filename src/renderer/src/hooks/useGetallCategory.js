import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { queryData } from '../actions/ActionsType'
import { useEffect } from 'react'
const useGetAllCategory = () => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.userRoleReducer)
  const fetchRoleData = () => {
    dispatch(queryData('userRoleReducer', 'user/getAllRole', 'POST'))
  }
  useEffect(() => {
    data
  }, [fetchRoleData, data])
  return { data: data?.data.list, loading, error, fetchRoleData }
}
export default useGetAllCategory
