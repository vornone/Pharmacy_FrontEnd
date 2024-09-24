import useApiCaller from './useApiCaller'

const useUpdateCategory = () => {
  const dispatch = useDispatch()
  const { data, loading, error } = useApiCaller('POST', 'category/update')
  const updateCategory = (body) => {
    return dispatch(useApiCaller('POST', 'category/update', body))
  }
  return { data, loading, error, updateCategory }
}

export default useUpdateCategory
