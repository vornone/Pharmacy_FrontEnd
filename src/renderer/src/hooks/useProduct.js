import { queryData } from '../actions/ActionsType'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
const useProduct = (selectedFile, productData) => {
  const dispatch = useDispatch()
  const apiSource = 'productReducer'
  const formData = new FormData()
  formData.append('file', selectedFile)
  formData.append(
    'inputData',
    new Blob([JSON.stringify(productData)], {
      type: 'application/json'
    })
  )

  const { data, loading, error } = useSelector((state) => state.productReducer)

  const insertFile = () => {
    dispatch(queryData(apiSource, 'product/insert', 'POST', formData))
  }
  const getProduct = () => {
    dispatch(queryData(apiSource, 'product', 'POST'))
  }
  useEffect(() => {
    data
  }, [dispatch])

  return {
    data: data?.data.product,
    loading,
    error,
    insertFile,
    getProduct
  }
}

export default useProduct
