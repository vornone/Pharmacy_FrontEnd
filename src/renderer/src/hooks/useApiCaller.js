import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { queryData } from '../actions/ActionsType'

const useApiCaller = (method, endpoint, payload = null) => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.apiReducer)
  const callApi = () => {
    dispatch(queryData(endpoint, method, (payload = null)))
  }
  return { data, loading, error, callApi }
}

export default useApiCaller
