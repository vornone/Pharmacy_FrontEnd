/* eslint-disable react/display-name */
import React, { useEffect, useState, useRef } from 'react'
import { Image, InputGroup } from '@chakra-ui/react'
import 'react-datepicker/dist/react-datepicker.css'
import { useToast } from '@chakra-ui/react'
import {
  Button,
  ButtonGroup,
  HStack,
  VStack,
  Input,
  InputRightAddon,
  Box,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import DatePicker from 'react-datepicker'
import { forwardRef } from 'react'
import useProduct from './../../hooks/useProduct'
import useInsertProduct from '../../hooks/useInsertProduct'
import EditProductModal from './EditProductModal'

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <Input
    width="100%"
    onClick={onClick}
    ref={ref}
    value={value || ''}
    placeholder="Expiration Date"
    readOnly
  />
))

const AddProductModal = ({ closeModal, data }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [platform, setPlatform] = useState(data.length == 0 ? 'No Data' : data[0].category_name)
  const [imagePreview, setImagePreview] = useState('https://via.placeholder.com/150')
  const [productData, setProductData] = useState({
    product_name: '',
    product_price: 0,
    product_qty: 0,
    category_id: data.find((item) => item.category_name === platform).category_id
  })

  const { loading, error, getProduct } = useProduct()
  const {
    data: insertData,
    loading: insertLoading,
    error: insertError,
    insertProduct
  } = useInsertProduct(selectedImage, productData)
  const [selectedDate, setSelectedDate] = useState(null)
  const toast = useToast()
  const inputRef = useRef(null)
  const [isAddProductTriggered, setIsAddProductTriggered] = useState(false)
  const handleUploadClick = () => {
    inputRef.current.click()
  }
  const platformSelectorEvent = (chooseCategory) => {
    console.log('Selected Category:', chooseCategory) // Debug log
    setPlatform(chooseCategory.category_name) // Update platform
    setProductData((prevData) => ({
      ...prevData,
      category_id: chooseCategory.category_id
    })) // Update product data
  }

  const handleProductChange = (e) => {
    const { name, value } = e.target
    const parsedValue =
      name === 'product_price' || name === 'product_qty'
        ? isNaN(value)
          ? value
          : Number(value)
        : value
    const updatedProduct = { ...productData, [name]: parsedValue }
    setProductData(updatedProduct)
  }

  const handleUploadFile = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file)
      setImagePreview(URL.createObjectURL(file))
    } else {
      toast({
        title: 'Invalid file type',
        description: 'Please select a valid image file.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  const handleSubmit = async (event) => {
    console.log(productData)
    event.preventDefault()
    if (insertLoading) return

    const finalImg = selectedImage || productData.product_img
    if (!finalImg) {
      toast({
        title: 'No image selected',
        description: 'Please select a file before updating.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
      return
    }
    if (
      productData.product_price <= 0 ||
      productData.product_qty <= 0 ||
      !productData.product_name.trim()
    ) {
      toast({
        title: 'Error',
        description: 'All fields must be filled correctly.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
      return
    }
    try {
      await insertProduct(productData) // Wait for product update response
      setIsAddProductTriggered(true)
    } catch (error) {
      toast({
        title: 'Update failed',
        description: error.message || 'An unexpected error occurred.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }
  useEffect(() => {
    if (isAddProductTriggered) {
      if (insertError || insertData.error) {
        toast({
          title: 'Error',
          description: insertError || insertData.error,
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      } else {
        toast({
          title: 'Success',
          description: 'Product updated successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
      }
      getProduct()
      setIsAddProductTriggered(false)
    }
  }, [insertData])
  useEffect(() => {
    console.log(productData)
  }, [handleSubmit])
  return (
    <>
      <EditProductModal
        closeModal={closeModal}
        categoryData={data}
        onConfirm={handleSubmit}
        handleUploadFile={handleUploadFile}
        chooseCategory={platformSelectorEvent}
        isLoading={insertLoading}
        imagePreview={imagePreview}
        selectedCategory={platform}
        handleProductChange={handleProductChange}
      />
    </>
  )
}

export default AddProductModal
