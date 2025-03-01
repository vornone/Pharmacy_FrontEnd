import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { queryData } from '../actions/ActionsType'


export const useUpdateData = (endpoint, method) => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.updateReducer)

  const updateData = (body) => {
    dispatch(queryData('updateReducer', endpoint, method, body))
  }
  return { data: data?.data, loading, error, updateData }
}

export const useDeleteData = (endpoint, method) => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.deleteReducer)

  const deleteData = (body) => {
    dispatch(queryData('deleteReducer', endpoint, method, body))
  }
  return { data: data?.data, loading, error, deleteData }
  }

export const useInsertData = (endpoint, method) => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.createReducer)

  const createData = (body) => {
    dispatch(queryData('insertReducer', endpoint, method, body))
  }
  return { data: data?.data, loading, error, createData }
  }