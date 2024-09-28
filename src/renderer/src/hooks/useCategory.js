import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { queryData } from '../actions/ActionsType'
import { useEffect } from 'react'

const useCategory = () => {
  const apiSource = 'categoryReducer'
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.categoryReducer)
  const getCategory = () => {
    dispatch(queryData(apiSource, 'category', 'POST'))
  }
  const updateCategory = (body) => {
    dispatch(queryData(apiSource, 'category/update', 'POST', body))
  }
  const deleteCategory = (body) => {
    dispatch(queryData(apiSource, 'category/delete', 'POST', body))
  }
  const insertCategory = (body) => {
    dispatch(queryData(apiSource, 'category/insert', 'POST', body))
  }
  useEffect(() => {
    data
  }, [insertCategory, data])

  return {
    data: data?.data.category,
    loading,
    error,
    getCategory,
    updateCategory,
    deleteCategory,
    insertCategory
  }
}
export default useCategory
