import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React from 'react'
import { BsSearch } from 'react-icons/bs'

const SearchInput = ({ placeholder, handleChange }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault() // Prevent form submission or page refresh on Enter key
    }
  }

  return (
    <InputGroup>
      <InputLeftElement children={<BsSearch />} />
      <Input
        placeholder={placeholder}
        width={'400px'}
        shadow={'sm'}
        onChange={handleChange} // Handle input change
        onKeyDown={handleKeyPress} // Prevent page refresh on Enter
      />
    </InputGroup>
  )
}

export default SearchInput
