import useApi from '../common/useApi' // Assuming useApi is now a custom hook

const useUpdateData = () => {
  const { data, message, loading, error, requestData: queryUpdateData } = useApi('updateReducer')

  const updateData = (endpoint, body) => {
    queryUpdateData(endpoint, 'POST', body)
  }

  return {
    data,
    message,
    loading,
    error,
    updateData
  }
}

export default useUpdateData
