import React, { useState, useRef } from 'react'
import { useOutsideClick } from '@chakra-ui/react'
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
const SearchableSelect = ({ options, placeholder, onSelect }) => {
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
    if (e.target.value !== '' || e.target.value !== undefined) {
      setSearch(e.target.value)
      setSelectedOption('') // Clear selected option when typing
    }

    if (!isOpen) {
      setIsOpen(true)
    }
  }
  // Filter options based on the search input
  const filteredOptions =
    options?.filter((option) => option.label.toLowerCase().includes(search.toLowerCase())) || []

  const handleOptionClick = (option) => {
    setSelectedOption(option.label)
    setSearch(option.label)
    onSelect(option) // Pass the full option object instead of just the label
    setIsOpen(false)
  }
  return (
    <Box position="relative" w="full">
      {/* Trigger Input */}
      <InputGroup>
        <Input
          isInvalid={filteredOptions?.length === 0}
          placeholder={placeholder}
          onClick={() => setIsOpen(true)}
          value={selectedOption || search}
          onChange={handleInputChange}
          autoComplete="off"
        />
      </InputGroup>

      {/* Dropdown */}
      {isOpen && (
        <Box
          ref={ref}
          bg={dropDownBg}
          position="absolute"
          zIndex="10"
          border={'1px'}
          borderColor="gray.200"
          borderRadius="md"
          mt="2"
          w="full"
          maxH="200px"
          overflowY="auto"
          boxShadow="md"
        >
          <VStack align="start" spacing="1" p="2" overflowY="auto" maxHeight={'200px'}>
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
                  {option.label}
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
  const [selectedProduct, setSelectedProduct] = useState(null)
  const options = data?.map((item) => ({
    value: item.product_id,
    label: item.product_name
  }))
  const handleSelect = (label) => {
    setSelectedProduct(label)
    console.log('Selected:', label)
  }
  return (
    <>
      <VStack gap={10}>
        <Flex width={'100%'}>
          <Grid width={'100%'} templateColumns="repeat(2, 1fr)" gap={2}>
            <SearchableSelect
              options={options}
              placeholder={'Select Product'}
              onSelect={handleSelect}
            />
            <InputGroup>
              <Input placeholder="Import Price"></Input>
              <InputRightAddon justifyContent={'center'} minW={'25%'}>
                <Icon as={BsCurrencyDollar}></Icon>
              </InputRightAddon>
            </InputGroup>
            <InputGroup>
              <Input placeholder="Import Quantity"></Input>
              <InputRightAddon justifyContent={'center'} minW={'25%'}>
                Items
              </InputRightAddon>
            </InputGroup>
            <InputGroup>
              <Input placeholder="Shipping Price"></Input>
              <InputRightAddon justifyContent={'center'} minW={'25%'}>
                <Icon as={BsCurrencyDollar}></Icon>
              </InputRightAddon>
            </InputGroup>
            <InputGroup>
              <Input placeholder="Total Price" readOnly value={'sd'}></Input>
              <InputRightAddon justifyContent={'center'} minW={'25%'}>
                <Icon as={BsCurrencyDollar}></Icon>
              </InputRightAddon>
            </InputGroup>
          </Grid>
        </Flex>
        <ImportProductTable importData={[]}></ImportProductTable>
      </VStack>
    </>
  )
}

export default ImportProductModal
