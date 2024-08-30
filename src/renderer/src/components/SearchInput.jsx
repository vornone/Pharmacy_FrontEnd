import { Input, InputGroup, InputLeftAddon, InputLeftElement } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { BsSearch } from 'react-icons/bs'

const SearchInput = () => {
  return (
    <form>
      <InputGroup>
        <InputLeftElement children={<BsSearch />}></InputLeftElement>
        <Input placeholder="search products.." width={'400px'} shadow={'sm'}></Input>
      </InputGroup>
    </form>
  )
}

export default SearchInput
