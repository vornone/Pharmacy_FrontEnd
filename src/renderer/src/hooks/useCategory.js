import ApiService from '../common/apiService'

const useCategory = ({ limit, offset }) => {
  const category = new ApiService('categoryReducer')
  const queryParams = new URLSearchParams({ limit, offset }).toString()

  const {
    data,
    loading,
    error,
    requestData: getCategory
  } = category.useApi(`api/CAT0011?${queryParams}`, 'GET')

  return {
    data,
    loading,
    error,
    getCategory
  }
}

export default useCategory
