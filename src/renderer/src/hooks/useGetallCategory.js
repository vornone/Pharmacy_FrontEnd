import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { queryData } from '../actions/ActionsType'
import { useEffect } from 'react'

const useCategory = () => {
  const apiSource = 'categoryReducer'
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.categoryReducer)

  const getCategory = () => {
    dispatch(queryData(apiSource, 'user/getAllRole', 'POST'))
  }
  const UpdateCategory = (body) => {
    dispatch(queryData(apiSource, 'category/update', 'POST', body))
  }
  const deleteCategory = (body) => {
    dispatch(queryData(apiSource, 'category/delete', 'POST', body))
  }
  useEffect(() => {
    data
  }, [data])

  return {
    data: data?.data.list,
    loading,
    error,
    getCategory,
    UpdateCategory,
    deleteCategory
  }
}
export default useCategory
