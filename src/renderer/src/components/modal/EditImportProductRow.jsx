import React, { useState, useRef } from 'react'
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

const SearchableSelect = ({ options, placeholder, onSelect, value }) => {
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const dropDownBg = useColorModeValue('gray.50', 'gray.700')
  const dropDownHover = useColorModeValue('gray.200', 'gray.600')

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

function EditImportProductRow({ rowData, onConfirm }) {
  const { data, loading, error, getProduct } = useProduct()
  const [selectedProduct, setSelectedProduct] = useState(rowData.product_name)
  const [importList, setImportList] = useState([])
  const toast = useToast()
  const [productToBeImported, setProductToBeImported] = useState({
    product_name: rowData.product_name,
    import_price: rowData.import_price,
    import_quantity: rowData.import_quantity,
    shipping_price: rowData.shipping_price,
    total_price: rowData.total_price
  })
  const options = data?.map((item) => ({
    value: item.product_id,
    name: item.product_name
  }))
  const handleSelect = (name) => {
    setSelectedProduct(name)
    setProductToBeImported({ ...productToBeImported, product_name: name })
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setProductToBeImported({ ...productToBeImported, [name]: value })
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
                value={productToBeImported.import_price}
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
                value={productToBeImported.import_quantity}
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
                value={productToBeImported.shipping_price}
              />
            </InputGroup>
          </Grid>
        </Flex>
        <Flex width="100%" justifyContent="flex-end">
          <Button colorScheme="green" size={'sm'} onClick={() => onConfirm(productToBeImported)}>
            Add to List
          </Button>
        </Flex>
      </VStack>
    </>
  )
}

export default EditImportProductRow
