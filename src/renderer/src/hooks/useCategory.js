import useApi from '../common/useApi' // Assuming useApi is now a custom hook

const useCategory = () => {
  const { data, loading, error, requestData: fetchCategory } = useApi('categoryReducer')

  const getCategory = (body) => {
    fetchCategory('api/CAT0011', 'POST', body || { pageSize: 0, pageNumber: 1 })
  }

  return {
    data,
    loading,
    error,
    getCategory
  }
}

export default useCategory
