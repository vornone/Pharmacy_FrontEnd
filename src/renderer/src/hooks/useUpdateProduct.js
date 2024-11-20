import { queryData } from '../actions/ActionsType'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
const useInsertProduct = (selectedFile, productData) => {
  const dispatch = useDispatch()
  const apiSource = 'updateReducer'
  const formData = new FormData()
  formData.append('file', selectedFile)
  formData.append(
    'inputData',
    new Blob([JSON.stringify(productData)], {
      type: 'application/json'
    })
  )

  const { data, loading, error } = useSelector((state) => state.updateReducer)

  const insertFile = () => {
    dispatch(queryData(apiSource, 'product/update', 'POST', formData))
  }
  useEffect(() => {
    data
  }, [dispatch])

  return {
    data: data?.data.product,
    loading,
    error,
    insertFile
  }
}

export default useInsertProduct
