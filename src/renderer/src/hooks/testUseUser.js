import ApiService from '../common/apiService'

const testUseUser = () => {
  const userService = new ApiService('userReducer')

  const { data, loading, error, requestData: getUser } = userService.useApi('api/USR0011', 'GET')

  return {
    data,
    loading,
    error,
    getUser
  }
}

export default testUseUser
