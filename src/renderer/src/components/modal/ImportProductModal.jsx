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
  VStack
} from '@chakra-ui/react'
import useProduct from '../../hooks/useProduct'
import { BsCurrencyDollar } from 'react-icons/bs'
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
    if (e.target.value !== '' || e.target.value !== undefined) {
      setSearch(e.target.value)
      setSelectedOption('')
    }

    if (!isOpen) {
      setIsOpen(true)
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
          overflowY="auto"
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
  const { data, loading, error, getProduct } = useProduct()
  const [selectedProduct, setSelectedProduct] = useState('')
  const [importList, setImportList] = useState([])
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

  // Function to pad the import list with empty rows to maintain 5-row blocks
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
      // If list is empty, return 5 empty rows
      return Array(5).fill(emptyRow)
    }

    // Add empty rows to reach the next multiple of 5
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
    setImportList([...importList, productToBeImported])

    // Reset form after adding
    setProductToBeImported({
      product_name: '',
      import_price: 0,
      import_quantity: 0,
      shipping_price: 0,
      total_price: 0
    })
    setSelectedProduct('')
  }

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
          <Button
            leftIcon={<BsCurrencyDollar />}
            colorScheme="green"
            onClick={handleAddToImportList}
          >
            Add Product
          </Button>
        </Flex>
        <ImportProductTable importData={getPaddedImportList()} />
      </VStack>
    </>
  )
}

export default ImportProductModal
