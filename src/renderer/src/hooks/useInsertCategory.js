import { fetchData } from '../actions/ActionsType'
import useApiCaller from './useApiCaller'
import { useDispatch } from 'react-redux'
const useInsertCategory = () => {
  const dispatch = useDispatch()
  const { data, loading, error } = useApiCaller('POST', 'category/insert')
  const insertCategory = async (body) => {
    dispatch(fetchData('POST', 'category/insert', body))
  }
  return { insertCategory, data: data?.data, loading, error }
}

export default useInsertCategory
