/* eslint-disable react/display-name */
import React, { useEffect, useState, useRef } from 'react'
import { Image, InputGroup } from '@chakra-ui/react'
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
import useInsertProduct from '../../hooks/useInsertProduct'
import { serverUrl } from '../../api-clients/api-clients'
import useUpdateProduct from './../../hooks/useUpdateProduct';
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

const UpdateProductModal = ({ closeModal, categoryData, rowData }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [platform, setPlatform] = useState(categoryData.length == 0 ? 'No Data' : categoryData.find((data) => data.category_id == rowData.category_id).category_name)


  const [productData, setProductData] = useState({
    product_name: rowData.product_name,
    product_price: rowData.product_price,
    product_minimum_stock: rowData.product_minimum_stock,
    category_id: rowData.category_id,
    product_id: rowData.product_id,
    product_img: rowData.product_img
  })
  const [imagePreview, setImagePreview] = useState(imgApi+productData.product_img)
  const { loading, error, getProduct } = useProduct()
  const { updateProduct} = useUpdateProduct(selectedImage, productData  )
  const { insertFile } = useInsertProduct(selectedImage, productData)
  const [selectedDate, setSelectedDate] = useState(null)

  const inputRef = useRef(null)

  const handleUploadClick = () => {
    inputRef.current.click() // Trigger the hidden input element
  }
  const platformSelectorEvent = (e) => {
    setPlatform(e.category_name)
    setProductData({ ...productData, category_id: e.category_id })
    console.log(productData)
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

  const handleUpdate = async (event) => {
    event.preventDefault();
    const finalImg = selectedImage ? selectedImage : productData.product_img;
    if (!finalImg) {
      alert('Please select a file');
      return;
    }
    await updateProduct(productData);
    getProduct(); // Refresh product list
    alert('Product updated successfully');
    closeModal(); // Close modal after successful update
    // try {
    //   await updateProduct(productData);
    //   getProduct(); // Refresh product list
    //   alert('Product updated successfully');
    //   closeModal(); // Close modal after successful update
    // } catch (error) {
    //   alert(error.message);
    // }


  };
  return (
    <>
      {/* <Input
        type="file"
        ref={inputRef}
        style={{ display: 'none' }} // Hide the input
        onChange={handleUploadFile}
      /> */}
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
            >
              <Button>edit image</Button>
            </ButtonGroup>
          </Flex>

          <Input
            type="text"
            value={productData.product_name}
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
              {categoryData == null ? (
                <MenuItem>No Data</MenuItem>
              ) : (
                categoryData.map((categoryData) => (
                  <MenuItem key={categoryData.category_name} onClick={() => platformSelectorEvent(categoryData)}>
                    {categoryData.category_name}
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
              value={productData.product_price}
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
              value={productData.product_minimum_stock}
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
            <Button colorScheme="green" variant="solid" size={'sm'} onClick={handleUpdate} type='submit'>
              Update
            </Button>
          </ButtonGroup>
        </HStack>
      </VStack>
    </>
  )
}

export default UpdateProductModal
