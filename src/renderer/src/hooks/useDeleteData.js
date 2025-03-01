import { useDispatch, useSelector } from 'react-redux'
import { queryData } from '../actions/ActionsType'
const useDeleteData = () => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.deleteReducer)

  const deleteData = (endpoint, method) => {
    dispatch(queryData('deleteReducer', endpoint, method))
  }
  return { data: data?.data, loading, error, deleteData }
}

export default useDeleteData
