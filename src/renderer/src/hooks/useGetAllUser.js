import useApiCaller from './useApiCaller'

const useGetAllUser = () => {
  const { data, loading, error } = useApiCaller('GET', 'user/getAll')
  return { data: data?.data.list, loading, error }
}
export default useGetAllUser
