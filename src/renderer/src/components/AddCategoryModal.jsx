import React, { useState } from 'react'
import { Button, ButtonGroup, InputGroup, VStack } from '@chakra-ui/react'
import { Input, InputLeftElement, Icon, HStack, Text } from '@chakra-ui/react'
import useInsertCategory from '../hooks/useInsertCategory'

const AddCategoryModal = ({ closeModal }) => {
  const { data, loading, error, insertCategory } = useInsertCategory()
  const [message, setMessage] = useState(false)
  const [category, setCategory] = useState({
    category_name: '',
    created_by: '',
    last_modified_by: ''
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setCategory((prevState) => ({
      ...prevState,
      [name]: value
    }))
    setMessage(false)
  }

  const handleInsert = () => {
    insertCategory(category)
    setMessage(true)
  }
  return (
    <VStack>
      <Input
        type="text"
        placeholder="New Category"
        focusBorderColor="green.300"
        onChange={handleOnChange}
        name="category_name"
      />
      <Input
        type="text"
        placeholder="Created By"
        focusBorderColor="green.300"
        onChange={handleOnChange}
        name="created_by"
      />
      <Input
        type="text"
        placeholder="Modified By"
        focusBorderColor="green.300"
        onChange={handleOnChange}
        name="last_modified_by"
      />
      <HStack width={'100%'} justifyContent={message ? 'space-between' : 'flex-end'}>
        {!message ? (
          ''
        ) : (
          <Text fontSize={'sm'} color={error || data?.message ? 'red.500' : 'green.500'}>
            {error ? error : data?.message ? data.message : 'Category added successfully'}
          </Text>
        )}
        <ButtonGroup>
          <Button colorScheme="red" variant="outline" onClick={closeModal} size={'sm'}>
            Cancel
          </Button>
          <Button
            colorScheme="green"
            variant="solid"
            onClick={handleInsert}
            size={'sm'}
            isLoading={loading}
          >
            Submit
          </Button>
        </ButtonGroup>
      </HStack>
    </VStack>
  )
}

export default AddCategoryModal
