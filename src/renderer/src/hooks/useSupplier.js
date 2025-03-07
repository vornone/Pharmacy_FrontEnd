import useApi from '../common/useApi' // Assuming useApi is now a custom hook

const useSupplier = () => {
  const { data, loading, error, requestData: fetchSupplier } = useApi('supplierReducer')

  const getSupplier = (body) => {
    fetchSupplier('api/SUP0011', 'POST', body)
  }

  return {
    data,
    loading,
    error,
    getSupplier
  }
}

export default useSupplier
