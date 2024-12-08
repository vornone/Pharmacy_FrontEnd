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
  const platformSelectorEvent = (e) => {
    setPlatform(e.category_name)
    setProductData({ ...productData, category_id: e.category_id })
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
  return (
    <>
      <input type="file" ref={inputRef} style={{ display: 'none' }} onChange={handleUploadFile} />
      <VStack width={'100%'} gap={3}>
        <VStack width={'100%'} height={'100%'} alignItems={'flex-start'}>
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
              <Button>edit image</Button>
            </ButtonGroup>
          </Flex>

          <Input
            type="text"
            placeholder="Product Name"
            colorScheme="green"
            maxLength={20}
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
              {data == null ? (
                <MenuItem>No Data</MenuItem>
              ) : (
                data.map((data) => (
                  <MenuItem key={data.category_name} onClick={() => platformSelectorEvent(data)}>
                    {data.category_name}
                  </MenuItem>
                ))
              )}
            </MenuList>
          </Menu>
          <InputGroup width={'50%'}>
            <Input
              type="number"
              placeholder="Product Price"
              maxLength={5}
              name="product_price"
              onChange={handleProductChange}
              step="0.01"
            />
            <InputRightAddon bg={'none'}>$</InputRightAddon>
          </InputGroup>
          <InputGroup width={'50%'}>
            <Input
              type="number"
              placeholder="Minimum Stock"
              name="product_qty"
              onChange={handleProductChange}
            />
            <InputRightAddon bg={'none'}>units</InputRightAddon>
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
            <Button colorScheme="green" variant="solid" size={'sm'} onClick={handleSubmit}>
              ADD
            </Button>
          </ButtonGroup>
        </HStack>
      </VStack>
    </>
  )
}

export default AddProductModal
