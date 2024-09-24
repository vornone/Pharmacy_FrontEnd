import { queryData } from '../actions/ActionsType'
import useApiCaller from './useApiCaller'
import { useDispatch } from 'react-redux'
const useUpdateCategory = () => {
  const dispatch = useDispatch()
  const { data, loading, error } = useApiCaller('POST', 'category/update')
  const updateCategory = (body) => {
    return dispatch(queryData('category/update', 'POST', body))
  }
  return { data: data?.data, loading, error, updateCategory }
}

export default useUpdateCategory
