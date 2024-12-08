import { queryData } from '../actions/ActionsType'
import { useDispatch, useSelector } from 'react-redux'
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

  const addDiscount = (discountProductId, body) => {
    dispatch(queryData(apiSource, 'product/discount/' + discountProductId, 'POST', body))
  }

  return {
    data: data?.data,
    loading,
    error,
    updateProduct,
    addDiscount
  }
}

export default useUpdateProduct
