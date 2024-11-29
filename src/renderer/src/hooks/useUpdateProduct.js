import { queryData } from '../actions/ActionsType'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
const useUpdateProduct = (selectedFile, productData) => {
  const dispatch = useDispatch()
  const apiSource = 'updateReducer'
  const formData = new FormData()
  formData.append('file', selectedFile)
  formData.append(
    'inputData',
    new Blob([JSON.stringify(productData)], {
      type: 'application/json'
    })
  )

  const { data, loading, error } = useSelector((state) => state.updateReducer)

  const updateProduct = () => {
    dispatch(queryData(apiSource, 'product/update/' + productData.product_id, 'POST', formData))
  }

  return {
    data: data?.data,
    loading,
    error,
    updateProduct
  }
}

export default useUpdateProduct
