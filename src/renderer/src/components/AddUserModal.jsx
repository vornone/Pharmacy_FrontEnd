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
  Text,
  CheckboxGroup
} from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
const AddUserModal = ({closeModal}) => {

  const allCheckedItem = [false, false, false]

  const [checkedItems, setCheckedItems] = useState(allCheckedItem)
  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked


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
      <Checkbox  width={'100%'} isChecked={allChecked}  onChange={(e) => setCheckedItems([e.target.checked, e.target.checked, e.target.checked])}>
          All Access
        </Checkbox>
      <VStack width={'100%'} alignItems={'flex-start'} pl={5}>
        <CheckboxGroup >
        <Checkbox   isChecked={checkedItems[0]} onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1], checkedItems[2]])}>
          Acess to Database
        </Checkbox>
        <Checkbox  isChecked={checkedItems[1]} onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked, checkedItems[2]])}>
          Acess to API
        </Checkbox>
        <Checkbox   isChecked={checkedItems[2]} onChange={(e) => setCheckedItems([checkedItems[0], checkedItems[1], e.target.checked])}>
          Can Add Category
        </Checkbox>
        </CheckboxGroup>
      </VStack>
      </VStack>
      <HStack width={'100%'} justifyContent={'right'}>
        <ButtonGroup>
          <Button colorScheme="red" variant="outline" size={'sm'} onClick={closeModal}>
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
