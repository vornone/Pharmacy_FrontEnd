import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup, InputGroup, VStack } from '@chakra-ui/react'
import { Input, InputLeftElement, Icon, HStack, Text } from '@chakra-ui/react'
import useUpdateData from '../../hooks/useUpdateData'
import useCategory from '../../hooks/useCategory'
const UpdateCategoryModal = ({onClose, rowData, data, loading, error, updateData}) => {
  const [formData, setFormData] = useState(data)
  const [hasMessage, setHasMessage] = useState(false)
  const [category, setCategory] = useState(rowData)

  const handleOnChange = (e) => {
      const { name, value } = e.target;
      const updatedCategory = { ...category, [name]: value };
      setCategory(updatedCategory);
      console.log(updatedCategory);
      setHasMessage(false);
  }

  const handleUpdate = async () => {
    await updateData(category); 
    setHasMessage(true);
  }

  return (
    <VStack width={'100%'}>
      <Input
        type="text"
        value={category.category_name}
        focusBorderColor="green.300"
        onChange={handleOnChange}
        name="category_name"
      />
      <HStack width={'100%'} justifyContent={hasMessage ? 'space-between' : 'flex-end'}>
        {!hasMessage ? (
          ''
        ) : (
          <Text fontSize={'sm'} color={error || data?.category?.message ? 'red.500' : 'green.500'}>
            {loading
              ? 'Loading...'
              : error
                ? error
                : data?.category.message
                  ? data.category.message
                  : 'Category updated successfully'}
          </Text>
        )}
        <ButtonGroup>
          <Button colorScheme="red" variant="outline" onClick={onClose} size={'sm'}>
            Cancel
          </Button>
          <Button
            colorScheme="green"
            variant="solid"
            onClick={handleUpdate}
            size={'sm'}
            isLoading={loading}
            type='submit'>
            Submit
          </Button>
        </ButtonGroup>
      </HStack>
    </VStack>
  )
}

export default UpdateCategoryModal
