import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { queryData } from '../actions/ActionsType'

const useProduct = () => {
  const dispatch = useDispatch()
  const apiSource = 'productReducer'
  const [uploadedImageName, setUploadedImageName] = useState(null)
  
  const { data, loading, error } = useSelector((state) => state.productReducer)

  const uploadImage = async (selectedFile) => {
    const imageFormData = new FormData()
    imageFormData.append('file', selectedFile)
    
    try {
      dispatch(queryData(apiSource, 'upload', 'POST', imageFormData))
    } catch (err) {
      console.error('Error uploading image:', err)
    }
  }

  const registerProduct = async (productData, selectedFile) => {
    await uploadImage(selectedFile)
    const imageName = selectedFile ? selectedFile.name : null
    const productWithImage = {
      ...productData,
      productImage: imageName
    }
    try {
      dispatch(queryData(apiSource, 'PRO0021', 'POST', JSON.stringify(productWithImage), {
        'Content-Type': 'application/json'
      }))
    } catch (err) {
      console.error('Error registering product:', err)
    }
  }
  const getProducts = () => {
    dispatch(queryData(apiSource, 'product', 'GET'))
  }
  useEffect(() => {
    if (data && data.uploadedImage) {
      setUploadedImageName(data.uploadedImage)
    }
  }, [data])

  return {
    data: data?.data,
    uploadedImageName,
    loading,
    error,
    uploadImage,
    registerProduct,
    getProducts
  }
}

export default useProduct