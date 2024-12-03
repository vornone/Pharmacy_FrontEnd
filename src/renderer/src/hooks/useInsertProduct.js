import { queryData } from '../actions/ActionsType'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
const useInsertProduct = (selectedFile, productData) => {
  const dispatch = useDispatch()
  const apiSource = 'insertReducer'
  const formData = new FormData()
  formData.append('file', selectedFile)
  formData.append(
    'inputData',
    new Blob([JSON.stringify(productData)], {
      type: 'application/json'
    })
  )

  const { data, loading, error } = useSelector((state) => state.insertReducer)

  const insertProduct = () => {
    dispatch(queryData(apiSource, 'product/insert', 'POST', formData))
  }

  return {
    data: data?.data,
    loading,
    error,
    insertProduct
  }
}

export default useInsertProduct
