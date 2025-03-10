import useApi from '../common/useApi' // Assuming useApi is now a custom hook

const useDeleteData = () => {
  const { data, loading, error, requestData: queryDeleteData } = useApi('deleteReducer')

  const deleteData = (endpoint, body) => {
    queryDeleteData(endpoint, 'POST', body)
  }

  return {
    data,
    loading,
    error,
    deleteData
  }
}

export default useDeleteData
