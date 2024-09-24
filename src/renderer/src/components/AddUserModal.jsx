import React, { useState } from 'react'
import {
  Button,
  ButtonGroup,
  InputGroup,
  VStack,
  Input,
  HStack,
  Checkbox,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
const AddUserModal = () => {
  const data = [
    {
      menuId: 1,
      menuName: 'Admin'
    },
    {
      menuId: 2,
      menuName: 'User'
    }
  ]
  const [platform, setPlatform] = useState(data[0].menuName)
  const platformSelectorEvent = (e) => {
    setPlatform(e.menuName)
  }
  const [user, setUser] = useState({
    username: '',
    user_role: ''
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setCategory((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleInsert = () => {
    insertCategory({
      username: user.username,
      user_role: user.user_role
    })
  }
  return (
    <VStack gap={5} width={'100%'} justifyContent={'flex-start'}>
      <Input
        type="text"
        placeholder="New User"
        focusBorderColor="green.300"
        onChange={handleOnChange}
        name="username"
      />
      <Menu autoSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<BsChevronDown />}
          variant={'solid'}
          width={'100%'}
          size={'md'}
          textAlign={'left'}
        >
          <Text fontWeight={'regular'}>{platform}</Text>
        </MenuButton>
        <MenuList>
          {data.map((data) => (
            <MenuItem key={data.menuId} onClick={() => platformSelectorEvent(data)}>
              {data.menuName}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <VStack width={'100%'} justifyContent={'flex-start'}>
        <Checkbox colorScheme="green" defaultChecked width={'100%'}>
          Acess to Database
        </Checkbox>
        <Checkbox colorScheme="green" defaultChecked width={'100%'}>
          Acess to API
        </Checkbox>
        <Checkbox colorScheme="green" defaultChecked width={'100%'}>
          Can Add Category
        </Checkbox>
      </VStack>

      <HStack width={'100%'} justifyContent={'right'}>
        <ButtonGroup>
          <Button colorScheme="red" variant="outline" size={'sm'}>
            Cancel
          </Button>
          <Button colorScheme="green" variant="solid" size={'sm'}>
            ADD
          </Button>
        </ButtonGroup>
      </HStack>
    </VStack>
  )
}

export default AddUserModal
