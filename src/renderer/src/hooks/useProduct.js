import { queryData } from '../actions/ActionsType'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
const useProduct = (selectedFile, productData) => {
  const dispatch = useDispatch()
  const apiSource = 'productReducer'
  const formData = new FormData()
  formData.append('file', selectedFile)
  formData.append('name', JSON.stringify(productData))

  const { data, loading, error } = useSelector((state) => state.productReducer)

  const insertFile = () => {
    dispatch(
      queryData(
        apiSource,
        'product/insert',
        'POST',
        formData,
        {},
        { 'Content-Type': 'multipart/form-data' }
      )
    )
  }

  useEffect(() => {
    data
  }, [dispatch])

  return {
    data: data?.data.list,
    loading,
    error,
    insertFile
  }
}

export default useProduct
