import useApiCaller from './useApiCaller'

const useUser = () => {
  const { data, loading, error } = useApiCaller('GET', 'user/getAll')
  return { data, loading, error }
}
export default useUser
