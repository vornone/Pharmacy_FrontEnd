import useApi from '../common/useApi' // Assuming useApi is now a custom hook

const insertData = () => {
  const { data, loading, error, requestData: queryInsertData } = useApi('insertReducer')

  const insertData = (endpoint, body) => {
    queryInsertData(endpoint, 'POST', body)
  }

  return {
    data,
    loading,
    error,
    insertData
  }
}

export default insertData
