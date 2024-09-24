<<<<<<< Updated upstream
import useApiCaller from './useApiCaller'

const useUpdateCategory = () => {
  const dispatch = useDispatch()
  const { data, loading, error } = useApiCaller('POST', 'category/update')
  const updateCategory = (body) => {
    return dispatch(useApiCaller('POST', 'category/update', body))
  }
  return { data, loading, error, updateCategory }
}

=======
import { queryData } from '../actions/ActionsType'
import useApiCaller from './useApiCaller'
import { useDispatch } from 'react-redux'
const useUpdateCategory = () => {
  const dispatch = useDispatch()
  const { data, loading, error } = useApiCaller('POST', `/category/update`)
  const updateCategory = (category) => {
    dispatch(queryData(`/category/update`, 'POST', category))
  }
  return { data, loading, error, updateCategory }
}
>>>>>>> Stashed changes
export default useUpdateCategory
