import { queryData } from '../actions/ActionsType'
import useApiCaller from './useApiCaller'
import { useDispatch } from 'react-redux'
const useInsertCategory = () => {
  const dispatch = useDispatch()
  const { data, loading, error } = useApiCaller('POST', 'category/insert')
  const insertCategory = (body) => {
    return dispatch(queryData('category/insert', 'POST', body))
  }
  return { data: data?.data, loading, error, insertCategory }
}

export default useInsertCategory
