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

  const addDiscount = (discountProductId, body) => {
    dispatch(queryData(apiSource, 'product/discount/' + discountProductId, 'POST', body))
  }
  const applyDiscountToMultipleProducts = async (selectedProducts, discountValue) => {
    const chunkSize = 5 // Limit to 5 concurrent requests at a time
    const chunks = []

    // Break the selected products into chunks
    for (let i = 0; i < selectedProducts.length; i += chunkSize) {
      chunks.push(selectedProducts.slice(i, i + chunkSize))
    }

    try {
      for (const chunk of chunks) {
        const discountPromises = chunk.map((product) => {
          const body = {
            product_discount: discountValue
          }
          return addDiscount(product.product_id, body)
        })

        // Wait for this chunk to finish before moving on to the next
        await Promise.all(discountPromises)
      }
    } catch (error) {
      console.error('Error applying discount:', error)
    }
  }

  return {
    data: data?.data,
    loading,
    error,
    updateProduct,
    addDiscount,
    applyDiscountToMultipleProducts
  }
}

export default useUpdateProduct
