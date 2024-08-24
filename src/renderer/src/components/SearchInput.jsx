import { Input, InputGroup, InputLeftAddon, InputLeftElement } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { BsSearch } from 'react-icons/bs'

const SearchInput = () => {
  return (
    <form >
      <InputGroup>
        <InputLeftElement children={<BsSearch/>}></InputLeftElement>
          <Input borderRadius={20} placeholder='search games..' >
          </Input>
      </InputGroup>
    </form>
  )
}

export default SearchInput
