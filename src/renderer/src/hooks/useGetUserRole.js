import useApiCaller from './useApiCaller'

const useGetUserRole = () => {
  const { data, loading, error } = useApiCaller('GET', 'user/getAll')
  return { data: data?.data.list, loading, error }
}
export default useGetUserRole
