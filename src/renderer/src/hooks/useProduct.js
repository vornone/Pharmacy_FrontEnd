import useApi from '../common/useApi' // Assuming useApi is now a custom hook

const useProduct = () => {
  const { data, loading, error, requestData: fetchProduct } = useApi('productReducer')

  const getProduct = (body) => {
    fetchProduct('api/PRO0011', 'POST', body)
  }
  return {
    data,
    loading,
    error,
    getProduct
  }
}

export default useProduct
