import { queryData } from '../actions/ActionsType'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
const useInsertCategory = () => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.categoryReducer)
  const insertCategory = (body) => {
    dispatch(queryData('category/insert', 'POST', body))
  }
  useEffect(() => {
    data
  }, [insertCategory, data])
  return { data: data?.data, loading, error, insertCategory }
}

export default useInsertCategory
