import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { queryData } from '../actions/ActionsType'

const useApiCaller = (method, endpoint, payload = null) => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.apiReducer)

  useEffect(() => {
    if (endpoint) {
      dispatch(queryData(endpoint, method, (payload = null)))
    }
  }, [dispatch, method, endpoint, payload])
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
  return { data, loading, error }
}

export default useApiCaller
