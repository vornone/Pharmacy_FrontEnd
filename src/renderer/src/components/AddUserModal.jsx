import React from 'react'
import { Button, ButtonGroup, InputGroup, VStack } from '@chakra-ui/react'
const AddUserModal = () => {
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
      <HStack width={'100%'} justifyContent={'right'}>
        <ButtonGroup>
          <Button colorScheme="green" variant="outline" onClick={handleInsert}>
            Submit
          </Button>
        </ButtonGroup>
      </HStack>
      <Text color={'red'}>{error}</Text>
    </VStack>
  )
}

export default AddUserModal
