import React, { useEffect, useState, useRef } from 'react'
import { Image, InputGroup } from '@chakra-ui/react'
import 'react-datepicker/dist/react-datepicker.css'
import { isSameMonth, set } from 'date-fns'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import {
  Button,
  ButtonGroup,
  HStack,
  VStack,
  Input,
  InputRightAddon,
  Checkbox,
  CheckboxGroup,
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
    product_minimum_stock: 0,
    category_id: data.find((item) => item.category_name === platform).category_id
  })
  const { loading, error, getProduct } = useProduct()
  const { insertFile } = useInsertProduct(selectedImage, productData)
  const [selectedDate, setSelectedDate] = useState(null)

  const inputRef = useRef(null)

  const handleUploadClick = () => {
    inputRef.current.click() // Trigger the hidden input element
  }
  const platformSelectorEvent = (e) => {
    setPlatform(e.category_name)
    setProductData({ ...productData, category_id: e.category_id })
    console.log(JSON.stringify(productData))
  }
  const handleProductChange = (e) => {
    const { name, value } = e.target

    // Check if the value should be treated as a number (useful for number inputs)
    const parsedValue =
      name === 'product_price' || name === 'product_minimum_stock'
        ? isNaN(value)
          ? value
          : Number(value)
        : value

    const updatedProduct = { ...productData, [name]: parsedValue }

    setProductData(updatedProduct)
    console.log(updatedProduct) // Log the updated product data
  }

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!selectedImage) {
      alert('Please select a file')
      return
    }

    try {
      await insertFile()

      alert('File uploaded successfully')
    } catch (error) {
      alert(error.message)
    }
    getProduct().then(() => {
      // Refresh product list after successful upload
    })
  }
  return (
    <>
      <input
        type="file"
        ref={inputRef}
        style={{ display: 'none' }} // Hide the input
        onChange={handleUploadFile}
      />
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
          <InputGroup>
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
          <InputGroup>
            <Input
              type="number"
              placeholder="Minimum Stock"
              name="product_minimum_stock"
              onChange={handleProductChange}
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
