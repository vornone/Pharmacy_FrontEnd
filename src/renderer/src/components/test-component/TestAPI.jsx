import React, { useEffect, useState, useRef } from 'react'
import useProduct from '../../hooks/useProduct'
import { Image, Input, useToast } from '@chakra-ui/react'
const TestAPI = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [productData, setProductData] = useState({ product_name: '' })
  const { data, loading, error, insertFile } = useProduct(selectedImage, productData)
  const inputRef = useRef(null);

  const handleButtonClick = () => {
    inputRef.current.click(); // Trigger the hidden input element
  };
  const toast = useToast()

  const handleUploadFile = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      // Check if it's an image
      setSelectedImage(file)
      setImagePreview(URL.createObjectURL(file)) // Create a preview URL
    } else {
      alert('Please select a valid image file.') // Alert for invalid file
    }
  }
  const handleProductChange = (event) => {
    setProductData({ ...productData, [event.target.name]: event.target.value })
    console.log(productData)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!selectedImage) {
      toast({
        title: 'Error',
        description: 'Please select a file',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
      return
    }

    try {
      insertFile()
      toast({
        title: 'Success',
        description: 'File uploaded successfully',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }
  let imageName = '923913d4-05e0-4e67-903e-8dcea136495a_240730_the_guy.png'
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="input"
          style={{ border: '1px solid black' }}
          name="product_name"
          onChange={handleProductChange}
        />
              <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }} // Hide the input
        onChange={handleUploadFile}
      />
      <button type="button" onClick={handleButtonClick}>Upload</button>
        <button type="submit">Upload File</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : data ? (
        <p>{data.product.product_name}</p>
      ) : null}
      <Image
        src={`http://localhost:8080/images/${imageName}`}
        width={'100px'}
        height={'100px'}
        style={{ objectFit: 'cover' }}
        alt="Preview"
      />
    </div>
  )
}

export default TestAPI
