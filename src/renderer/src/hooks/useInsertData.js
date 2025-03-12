import useApi from '../common/useApi' // Assuming useApi is now a custom hook

const useInsertData = () => {
  const { data, message, loading, error, requestData: queryInsertData } = useApi('insertReducer')

  const insertData = (endpoint, body) => {
    queryInsertData(endpoint, 'POST', body)
  }

  return {
    data,
    message,
    loading,
    error,
    insertData
  }
}

export default useInsertData
