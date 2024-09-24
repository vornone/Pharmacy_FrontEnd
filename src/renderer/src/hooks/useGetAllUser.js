import useApiCaller from './useApiCaller'

<<<<<<< Updated upstream:src/renderer/src/hooks/useGetAllUser.js
const useGetAllUser = () => {
=======
export const useUser = () => {
>>>>>>> Stashed changes:src/renderer/src/hooks/useUser.js
  const { data, loading, error } = useApiCaller('GET', 'user/getAll')
  return { data: data?.data.list, loading, error }
}
<<<<<<< Updated upstream:src/renderer/src/hooks/useGetAllUser.js
export default useGetAllUser
=======
>>>>>>> Stashed changes:src/renderer/src/hooks/useUser.js
