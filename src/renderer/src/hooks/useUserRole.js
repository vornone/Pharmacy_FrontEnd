import ApiService from '../common/apiService'

const useUserRole = () => {
  const userRoleService = new ApiService('userRoleReducer')

  const {
    data,
    loading,
    error,
    requestData: getUserRole
  } = userRoleService.useApi('api/ROLE0011', 'GET')

  return {
    data,
    loading,
    error,
    getUserRole
  }
}

export default useUserRole
