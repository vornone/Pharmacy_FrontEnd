import { useDispatch, useSelector } from 'react-redux'
import { queryData } from '../actions/ActionsType'

class ApiService {
  constructor(reducerName) {
    this.reducerName = reducerName
  }

  useApi(endpoint, method) {
    const dispatch = useDispatch()
    const { data, loading, error } = useSelector((state) => state[this.reducerName])

    const requestData = (body = null) => {
      dispatch(queryData(this.reducerName, endpoint, method, body, {}))
    }

    return { data: data?.data, loading, error, requestData }
  }
}

export default ApiService
