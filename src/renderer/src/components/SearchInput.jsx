import { Input, InputGroup, InputLeftAddon, InputLeftElement } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { BsSearch } from 'react-icons/bs'

const SearchInput = ({ placeholder }) => {
  return (
    <form>
      <InputGroup>
        <InputLeftElement children={<BsSearch />}></InputLeftElement>
        <Input placeholder={placeholder} width={'400px'} shadow={'sm'}></Input>
      </InputGroup>
    </form>
  )
}

export default SearchInput
