import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { queryData } from '../actions/ActionsType'
const useUpdateData = (endpoint, method) => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.updateReducer)

  const updateData = (body) => {
    dispatch(queryData('updateReducer', endpoint, method, body))
  }
  return { data: data?.data, loading, error, updateData }
}
export default useUpdateData
