import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Image, InputGroup, useToast } from '@chakra-ui/react'
import 'react-datepicker/dist/react-datepicker.css'

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
import useProduct from '../../hooks/useProduct'
import { serverUrl } from '../../api-clients/api-clients'
import useUpdateProduct from './../../hooks/useUpdateProduct'

const imgApi = serverUrl + '/images/'
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

const UpdateProductModal = ({ closeModal, categoryData, rowData, setOrderData }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [platform, setPlatform] = useState(
    categoryData.length == 0
      ? 'No Data'
      : categoryData.find((data) => data.category_id == rowData.category_id).category_name
  )
  const [isUpdateTriggered, setIsUpdateTriggered] = useState(false)
  const { data, loading, error, getProduct } = useProduct()
  const [productData, setProductData] = useState({
    product_name: rowData.product_name,
    product_price: rowData.product_price,
    product_qty: rowData.product_qty,
    category_id: rowData.category_id,
    product_id: rowData.product_id,
    product_img: rowData.product_img
  })
  const [imagePreview, setImagePreview] = useState(imgApi + productData.product_img)
  const {
    data: updateData,
    loading: updateLoading,
    error: updateError,
    updateProduct
  } = useUpdateProduct(selectedImage, productData)
  const [selectedDate, setSelectedDate] = useState(null)
  const inputRef = useRef(null)
  const toast = useToast()

  const platformSelectorEvent = (e) => {
    setPlatform(e.category_name)
    setProductData({ ...productData, category_id: e.category_id })
  }
  const handleUploadClick = () => {
    inputRef.current.click()
  }

  const handleUpdateOrder = useCallback(
    (productForUpdate) => {
      setOrderData((prevOrderData) =>
        prevOrderData.map((order) => {
          if (order.product_id === productForUpdate.product_id) {
            return {
              ...order,
              product_name: productForUpdate.product_name,
              product_price: productForUpdate.product_price,
              product_qty: productForUpdate.product_qty,
              category_id: productForUpdate.category_id,
              orderQuantity:
                order.orderQuantity > productForUpdate.product_qty
                  ? productForUpdate.product_qty
                  : order.orderQuantity
            }
          }
          return order
        })
      )
    },
    [setOrderData]
  )

  const handleProductChange = (e) => {
    const { name, value } = e.target
    const parsedValue =
      name === 'product_price' || name === 'product_qty'
        ? isNaN(value)
          ? value
          : Number(value)
        : value

    setProductData({ ...productData, [name]: parsedValue })
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

  const handleUpdate = async (event) => {
    event.preventDefault()
    if (updateLoading) return

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
      await updateProduct(productData) // Wait for product update response
      setIsUpdateTriggered(true)
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
    if (isUpdateTriggered) {
      if (updateData.error) {
        toast({
          title: 'Error',
          description: updateData.error,
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
        handleUpdateOrder({ ...productData })
      }
      getProduct()
      setIsUpdateTriggered(false)
    }
  }, [updateData])

  return (
    <>
      <Input type="file" ref={inputRef} style={{ display: 'none' }} onChange={handleUploadFile} />
      <VStack width={'100%'} gap={3}>
        <VStack width={'100%'} height={'100%'}>
          <Flex
            justifyContent={'space-between'}
            width={'100%'}
            height={'100%'}
            alignItems={'flex-end'}
          >
            <Box>
              <Image objectFit={'cover'} src={imagePreview} borderRadius={5} height={'150px'} />
            </Box>
            <ButtonGroup
              height={'100%'}
              size={'sm'}
              variant={'outline'}
              colorScheme="blue"
              onClick={handleUploadClick}
            >
              <Button>Edit image</Button>
            </ButtonGroup>
          </Flex>

          <Input
            isInvalid={productData.product_name.length > 30 || productData.product_name.length == 0}
            type="text"
            value={productData.product_name}
            placeholder="Product Name"
            maxLength={30}
            name="product_name"
            onChange={handleProductChange}
          />
          <Menu autoSelect={false}>
            <MenuButton
              as={Button}
              rightIcon={<BsChevronDown />}
              variant={'solid'}
              width={'100%'}
              size={'md'}
              textAlign={'left'}
            >
              <Text fontWeight={'regular'}>{platform}</Text>
            </MenuButton>
            <MenuList>
              {categoryData == null ? (
                <MenuItem>No Data</MenuItem>
              ) : (
                categoryData.map((categoryData) => (
                  <MenuItem
                    key={categoryData.category_name}
                    onClick={() => platformSelectorEvent(categoryData)}
                  >
                    {categoryData.category_name}
                  </MenuItem>
                ))
              )}
            </MenuList>
          </Menu>
          <InputGroup>
            <Input
              isInvalid={productData.product_price <= 0}
              type="number"
              placeholder="Product Price"
              maxLength={5}
              name="product_price"
              value={productData.product_price}
              onChange={handleProductChange}
            />
            <InputRightAddon bg={'none'}>$</InputRightAddon>
          </InputGroup>
          <InputGroup>
            <Input
              type="number"
              placeholder="Minimum Stock"
              name="product_qty"
              onChange={handleProductChange}
              value={productData.product_qty}
              isInvalid={productData.product_qty <= 0}
            />
          </InputGroup>
          <HStack justifyContent={'space-between'} width={'100%'}>
            <Box width={'100%'}>
              <DatePicker
                width={'100%'}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                customInput={<CustomInput />}
                dateFormat="dd/MMMM/YYYY"
              ></DatePicker>
            </Box>
          </HStack>
        </VStack>
        <HStack width={'100%'} justifyContent={'right'}>
          <ButtonGroup>
            <Button colorScheme="red" variant="outline" size={'sm'} onClick={closeModal}>
              Cancel
            </Button>
            <Button
              colorScheme="green"
              variant="solid"
              size={'sm'}
              onClick={handleUpdate}
              disabled={updateLoading}
            >
              Update
            </Button>
          </ButtonGroup>
        </HStack>
      </VStack>
    </>
  )
}

export default UpdateProductModal
