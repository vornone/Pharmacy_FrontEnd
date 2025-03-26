import useApi from '../common/useApi' // Assuming useApi is now a custom hook

const useInsertProduct = (selectedFile, productData) => {
  const formData = new FormData()
  formData.append('file', selectedFile)
  formData.append(
    'inputData',
    new Blob([JSON.stringify(productData)], {
      type: 'application/json'
    })
  )
  const { data, message, loading, error, requestData: queryInsertProduct } = useApi('insertReducer')

  const insertProduct = (endpoint, formData) => {
    queryInsertProduct(endpoint, 'POST', formData)
  }

  return {
    data,
    message,
    loading,
    error,
    insertProduct
  }
}

export default useInsertProduct
