import { useDispatch, useSelector } from 'react-redux'
import { queryData } from '../actions/ActionsType'

// Custom hook to handle API requests
const useApi = (reducerName) => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state[reducerName])

  const requestData = (endpoint, method, body = null) => {
    // Dispatch the action to fetch data
    dispatch(queryData(reducerName, endpoint, method, body, {}))
  }

  return { data: data?.data, loading, error, requestData }
}

export default useApi
