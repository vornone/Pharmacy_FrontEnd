import React, { useState, useRef, useEffect } from 'react'
import { Input, HStack, Box, VStack, Text } from '@chakra-ui/react'
import { useColorModeValue } from '@/components/ui/color-mode'
const SearchSelection = () => {
  // Define the full collection of items with unique IDs
  const fullCollection = [
    { id: 1, label: 'POS System', value: 'POS System' },
    { id: 2, label: 'Inventory', value: 'Inventory' },
    { id: 3, label: 'Sales', value: 'Sales' },
    { id: 4, label: 'Customer Management', value: 'Customer Management' },
    { id: 5, label: 'HR Management', value: 'HR Management' },
    { id: 6, label: 'Finance', value: 'Finance' },
    { id: 7, label: 'Marketing', value: 'Marketing' },
    { id: 8, label: 'Support', value: 'Support' }
  ]

  // State for the input value, filtered options, and input focus
  const [searchValue, setSearchValue] = useState('')
  const [filteredOptions, setFilteredOptions] = useState(fullCollection)
  const [isInputFocused, setIsInputFocused] = useState(false)

  // Ref for the input element
  const inputRef = useRef(null)

  // Ensure the input is not focused on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.blur() // Blur the input if it's focused for any reason
    }
  }, [])

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchValue(value)

    // Filter options based on the input value
    const filtered = fullCollection.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredOptions(filtered)
  }

  // Handle selecting an option from the dropdown
  const handleSelectOption = (option) => {
    setSearchValue(option.label)
    setIsInputFocused(false) // Hide dropdown after selection
  }

  // Handle input focus
  const handleInputFocus = () => {
    setIsInputFocused(true)
  }

  // Handle input blur
  const handleInputBlur = () => {
    // Use setTimeout to allow the click event on dropdown items to fire before hiding the dropdown
    setTimeout(() => {
      setIsInputFocused(false)
    }, 200)
  }

  return (
    <HStack w="full" justifyContent="space-between" borderColor="gray.200" alignItems="center">
      <Box position="relative" w="full">
        {/* Input for searching */}
        <Input
          ref={inputRef} // Attach the ref to the input
          placeholder="Search..."
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          size="xs"
        />

        {/* Dropdown menu for filtered options */}
        {isInputFocused && (
          <Box
            position="absolute"
            top="100%"
            left="0"
            right="0"
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow="md"
            zIndex="dropdown"
            mt="1"
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
            maxH="100px" // Set a maximum height for the dropdown
            overflowY="auto" // Enable vertical scrolling
          >
            <VStack align="stretch" spacing="0">
              {filteredOptions.map((option) => (
                <Box
                  key={option.id} // Use the unique ID as the key
                  px="3"
                  py="1"
                  _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                  cursor="pointer"
                  onClick={() => handleSelectOption(option)}
                >
                  <Text fontSize={'xs'}>{option.label}</Text>
                </Box>
              ))}
            </VStack>
          </Box>
        )}
      </Box>
    </HStack>
  )
}

export default SearchSelection
