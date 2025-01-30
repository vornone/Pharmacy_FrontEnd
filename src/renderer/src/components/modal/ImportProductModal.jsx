import React, { useState, useRef, useEffect } from 'react'
import { InputLeftAddon, useOutsideClick } from '@chakra-ui/react'
import {
  Box,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  Grid,
  Flex,
  InputRightAddon,
  InputGroup,
  Icon,
  VStack,
  useToast
} from '@chakra-ui/react'
import useProduct from '../../hooks/useProduct'
import { useColorModeValue } from '@chakra-ui/react'
import ImportProductTable from '../table/ImportProductTable'

const SearchableSelect = ({ options, placeholder, onSelect, value }) => {
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const dropDownBg = useColorModeValue('gray.50', 'gray.700')
  const dropDownHover = useColorModeValue('gray.200', 'gray.600')

  useEffect(() => {
    if (!value) {
      setSearch('')
      setSelectedOption('')
    }
  }, [value])

  const ref = useRef()
  useOutsideClick({
    ref: ref,
    handler: () => setIsOpen(false)
  })

  const handleInputChange = (e) => {
    const newValue = e.target.value
    setSearch(newValue)
    setSelectedOption('')
    onSelect('')
    if (!isOpen && newValue) {
      setIsOpen(true)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && (value || selectedOption)) {
      setSearch('')
      setSelectedOption('')
      onSelect('')
    }
  }
  const filteredOptions =
    options?.filter((option) => option.name.toLowerCase().includes(search.toLowerCase())) || []
  const handleOptionClick = (option) => {
    setSelectedOption(option.name)
    setSearch(option.name)
    onSelect(option.name)
    setIsOpen(false)
  }
  return (
    <Box position="relative" w="full">
      <InputGroup>
        <Input
          isInvalid={filteredOptions?.length === 0}
          placeholder={placeholder}
          onClick={() => setIsOpen(true)}
          value={value || selectedOption || search}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
      </InputGroup>
      {isOpen && (
        <Box
          ref={ref}
          bg={dropDownBg}
          position="absolute"
          zIndex="10"
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          mt="2"
          w="full"
          maxH="200px"
          overflowY="hidden"
          boxShadow="md"
        >
          <VStack align="start" spacing="1" p="2" overflowY="auto" maxHeight="200px">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <Box
                  _hover={{ bg: dropDownHover }}
                  key={option.value}
                  p="2"
                  w="full"
                  cursor="pointer"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.name}
                </Box>
              ))
            ) : (
              <Text px="2" py="1">
                No options found
              </Text>
            )}
          </VStack>
        </Box>
      )}
    </Box>
  )
}

function ImportProductModal() {
  const { data } = useProduct()
  const [selectedProduct, setSelectedProduct] = useState('')
  const [importList, setImportList] = useState([])
  const toast = useToast()
  const [productToBeImported, setProductToBeImported] = useState({
    product_name: '',
    import_price: 0,
    import_quantity: 0,
    shipping_price: 0,
    total_price: 0
  })

  const options = data?.map((item) => ({
    value: item.product_id,
    name: item.product_name
  }))

  const getPaddedImportList = () => {
    const currentLength = importList.length
    const targetLength = Math.ceil(currentLength / 5) * 5
    const emptyRow = {
      product_name: '',
      import_price: '',
      import_quantity: '',
      shipping_price: '',
      total_price: ''
    }

    if (currentLength === 0) {
      return Array(5).fill(emptyRow)
    }
    const paddingNeeded = targetLength - currentLength
    const paddingRows = Array(paddingNeeded).fill(emptyRow)
    return [...importList, ...paddingRows]
  }

  const handleSelect = (name) => {
    setSelectedProduct(name)
    setProductToBeImported({ ...productToBeImported, product_name: name })
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setProductToBeImported({ ...productToBeImported, [name]: value })
  }

  const handleAddToImportList = () => {
    if (productToBeImported.shipping_price >= productToBeImported.import_price) {
      toast({
        title: 'Error',
        description: 'Shipping price must be less than import price',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
      return
    }
    if (
      productToBeImported.shipping_price <= 0 ||
      productToBeImported.import_quantity <= 0 ||
      productToBeImported.import_price <= 0
    ) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields with valid values',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
      return
    }
    if (
      !productToBeImported.product_name ||
      !productToBeImported.import_price ||
      !productToBeImported.import_quantity ||
      !productToBeImported.shipping_price
    ) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
      return
    }

    const existingProductIndex = importList.findIndex(
      (item) =>
        item.product_name === productToBeImported.product_name &&
        Number(item.import_price) === Number(productToBeImported.import_price) &&
        Number(item.shipping_price) === Number(productToBeImported.shipping_price)
    )

    if (existingProductIndex !== -1) {
      const updatedImportList = [...importList]
      const existingProduct = updatedImportList[existingProductIndex]
      const newQuantity =
        Number(existingProduct.import_quantity) + Number(productToBeImported.import_quantity)
      const newTotalPrice =
        newQuantity * Number(existingProduct.import_price) + Number(existingProduct.shipping_price)

      updatedImportList[existingProductIndex] = {
        ...existingProduct,
        import_quantity: newQuantity,
        total_price: newTotalPrice
      }

      setImportList(updatedImportList)
    } else {
      const totalPrice =
        Number(productToBeImported.import_quantity) * Number(productToBeImported.import_price) +
        Number(productToBeImported.shipping_price)

      // Add a unique identifier to each row
      const newProduct = {
        id: Date.now(), // Add a unique identifier
        ...productToBeImported,
        import_price: Number(productToBeImported.import_price),
        import_quantity: Number(productToBeImported.import_quantity),
        shipping_price: Number(productToBeImported.shipping_price),
        total_price: totalPrice
      }

      setImportList([...importList, newProduct])
    }

    setProductToBeImported({
      product_name: '',
      import_price: 0,
      import_quantity: 0,
      shipping_price: 0,
      total_price: 0
    })
    setSelectedProduct('')
  }

  const handleDeleteRow = (row) => {
    try {
      // Find the exact item to delete using the unique id
      const itemToDelete = row.original

      // Filter out the item with matching id
      const updatedList = importList.filter((item) => {
        // If we have an id, use it for comparison
        if (item.id && itemToDelete.id) {
          return item.id !== itemToDelete.id
        }

        // Fallback to comparing all relevant fields if no id exists
        return !(
          item.product_name === itemToDelete.product_name &&
          Number(item.import_price) === Number(itemToDelete.import_price) &&
          Number(item.import_quantity) === Number(itemToDelete.import_quantity) &&
          Number(item.shipping_price) === Number(itemToDelete.shipping_price)
        )
      })

      setImportList(updatedList)

      toast({
        title: 'Success',
        description: 'Product removed from import list',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    } catch (error) {
      console.error('Error deleting row:', error)
      toast({
        title: 'Error',
        description: 'Failed to remove product from import list',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }
  const handleUpdateRow = (updatedRow) => {
    try {
      const updatedList = importList.map((item) => {
        if (item.id === updatedRow.id) {
          return updatedRow
        }
        return item
      })

      setImportList(updatedList)

      toast({
        title: 'Success',
        description: 'Product updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    } catch (error) {
      console.error('Error updating product:', error)
      toast({
        title: 'Error',
        description: 'Failed to update product',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  useEffect(() => {
    console.log(importList)
  }, [importList])

  return (
    <>
      <VStack gap={5}>
        <Flex width="100%">
          <Grid width="100%" templateColumns="repeat(2, 1fr)" gap={2}>
            <SearchableSelect
              options={options}
              placeholder="Select Product"
              onSelect={handleSelect}
              value={selectedProduct}
            />
            <InputGroup>
              <InputLeftAddon justifyContent="center" minW="35%" maxW="35%">
                <Text>Import Price</Text>
              </InputLeftAddon>
              <Input
                placeholder="Enter Import Price"
                onChange={onChange}
                name="import_price"
                value={
                  productToBeImported.import_price === 0 ? '' : productToBeImported.import_price
                }
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon justifyContent="center" minW="35%" maxW="35%">
                Import Quantity
              </InputLeftAddon>
              <Input
                type="number"
                placeholder="Enter Import Quantity"
                onChange={onChange}
                name="import_quantity"
                value={
                  productToBeImported.import_quantity === 0
                    ? ''
                    : productToBeImported.import_quantity
                }
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon justifyContent="center" minW="35%" maxW="35%">
                <Text>Shipping Price</Text>
              </InputLeftAddon>
              <Input
                type="number"
                placeholder="Enter Shipping Price"
                onChange={onChange}
                name="shipping_price"
                value={
                  productToBeImported.shipping_price === 0 ? '' : productToBeImported.shipping_price
                }
              />
            </InputGroup>
          </Grid>
        </Flex>
        <Flex width="100%" justifyContent="flex-end">
          <Button colorScheme="green" onClick={handleAddToImportList}>
            Add Product
          </Button>
        </Flex>
        <ImportProductTable
          importData={getPaddedImportList()}
          deleteRow={handleDeleteRow}
          updateRow={handleUpdateRow}
        />
        <Flex justify={'flex-end'} w={'100%'}>
          <Button colorScheme="green">Submit</Button>
        </Flex>
      </VStack>
    </>
  )
}

export default ImportProductModal
