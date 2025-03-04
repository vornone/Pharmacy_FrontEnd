import ApiService from '../common/apiService'

export const useUpdateData = (endpoint, method) => {
  return new ApiService('updateReducer').useApi(endpoint, method)
}

export const useDeleteData = (endpoint, method) => {
  return new ApiService('deleteReducer').useApi(endpoint, method)
}

export const useInsertData = (endpoint, method) => {
  return new ApiService('insertReducer').useApi(endpoint, method)
}
