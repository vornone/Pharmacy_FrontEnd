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
import { serverUrl } from '../../api-clients/api-clients'

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

const initialProductData = {
  product_name: '',
  product_img: '',
  product_qty: 0,
  product_price: 0,
  product_discount: 0,
  category_id: 0
}
const EditProductModal = ({
  closeModal,
  categoryData,
  rowData,
  chooseCategory,
  selectedCategory,
  onConfirm,
  handleUploadFile,
  isLoading,
  imagePreview,
  handleProductChange
}) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [productData, setProductData] = useState(rowData ? rowData : initialProductData)
  const [selectedDate, setSelectedDate] = useState(null)

  const inputRef = useRef(null)

  const handleUploadClick = () => {
    inputRef.current.click()
  }

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
            isInvalid={
              rowData &&
              (productData.product_name.length > 30 || productData.product_name.length == 0)
            }
            type="text"
            value={rowData && productData.product_name}
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
              <Text fontWeight={'regular'}>{selectedCategory}</Text>
            </MenuButton>
            <MenuList>
              {categoryData == null ? (
                <MenuItem>No Data</MenuItem>
              ) : (
                categoryData.map((category) => (
                  <MenuItem key={category.category_name} onClick={() => chooseCategory(category)}>
                    {category.category_name}
                  </MenuItem>
                ))
              )}
            </MenuList>
          </Menu>
          <InputGroup>
            <Input
              isInvalid={rowData && productData.product_price <= 0}
              type="number"
              placeholder="Product Price"
              maxLength={5}
              name="product_price"
              value={rowData && productData.product_price}
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
              value={rowData && productData.product_qty}
              isInvalid={rowData && productData.product_qty <= 0}
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
              onClick={onConfirm}
              disabled={isLoading}
            >
              Confirm
            </Button>
          </ButtonGroup>
        </HStack>
      </VStack>
    </>
  )
}

export default EditProductModal
