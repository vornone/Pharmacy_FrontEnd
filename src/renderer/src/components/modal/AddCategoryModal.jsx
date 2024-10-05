import React, { useState } from 'react'
import { Button, ButtonGroup, InputGroup, VStack } from '@chakra-ui/react'
import { Input, InputLeftElement, Icon, HStack, Text } from '@chakra-ui/react'
import useCategory from '../../hooks/useCategory'

const AddCategoryModal = ({ closeModal }) => {
  const { data, loading, error, insertCategory } = useCategory()
  const [hasMessage, setHasMessage] = useState(false)
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
    setHasMessage(false)
  }

  const handleInsert = () => {
    insertCategory(category)
    setHasMessage(true)
  }
  return (
    <VStack width={'100%'}>
      <Input
        type="text"
        placeholder="New Category"
        focusBorderColor="green.300"
        onChange={handleOnChange}
        name="category_name"
      />
      {/* <Input
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
      /> */}
      <HStack width={'100%'} justifyContent={hasMessage ? 'space-between' : 'flex-end'}>
        {!hasMessage ? (
          ''
        ) : (
          <Text fontSize={'sm'} color={error || data?.message ? 'red.500' : 'green.500'}>
            {loading
              ? 'Loading...'
              : error
                ? error
                : data?.message
                  ? data.message
                  : 'Category added successfully'}
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
            ADD
          </Button>
        </ButtonGroup>
      </HStack>
    </VStack>
  )
}

export default AddCategoryModal
