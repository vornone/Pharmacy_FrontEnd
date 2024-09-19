import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchData } from '../actions/ActionsType'

const useApiCaller = (method, endpoint, payload = null) => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.apiReducer)

  useEffect(() => {
    if (endpoint) {
      dispatch(fetchData(endpoint, method, (payload = null)))
    }
  }, [dispatch, method, endpoint, payload])

  return { data: data?.data.list, loading, error }
}

export default useApiCaller
