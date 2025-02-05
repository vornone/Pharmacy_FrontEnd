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
import useUser from '../../hooks/useUser'
const AddUserModal = ({ closeModal, data }) => {
  const allCheckedItem = [false, false, false]
  const [checkedItems, setCheckedItems] = useState(allCheckedItem)
  const allChecked = checkedItems.every(Boolean)
  const { data: addUserData, loading, error, addUser } = useUser()
  const [platform, setPlatform] = useState(data[0])
  const platformSelectorEvent = (e) => {
    setPlatform(e)
    console.log(platform)
  }

  const [user, setUser] = useState({
    username: '',
    role_id: platform.role_id,
    user_password: ''
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }))
    console.log(platform.role_id)
  }

  const handleInsert = () => {
    addUser({
      role_id: platform.role_id,
      username: user.username,
      password: user.user_password
    })
    console.log(user)
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
      <Input
        type="text"
        placeholder="New Password"
        focusBorderColor="green.300"
        onChange={handleOnChange}
        name="user_password"
      />
      <Menu autoSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<BsChevronDown />}
          variant={'solid'}
          width={'100%'}
          size={'md'}
          textAlign={'left'}
          defaultValue={platform.role_name}
        >
          <Text fontWeight={'regular'}>{platform.role_name}</Text>
        </MenuButton>
        <MenuList>
          {data.map((data) => (
            <MenuItem key={data.role_id} onClick={() => platformSelectorEvent(data)}>
              {data.role_name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      {/* <VStack width={'100%'} justifyContent={'flex-start'}>
        <Checkbox
          width={'100%'}
          isChecked={allChecked}
          onChange={(e) => setCheckedItems([e.target.checked, e.target.checked, e.target.checked])}
        >
          All Access
        </Checkbox>
        <VStack width={'100%'} alignItems={'flex-start'} pl={5}>
          <CheckboxGroup>
            <Checkbox
              isChecked={checkedItems[0]}
              onChange={(e) =>
                setCheckedItems([e.target.checked, checkedItems[1], checkedItems[2]])
              }
            >
              Access to Database
            </Checkbox>
            <Checkbox
              isChecked={checkedItems[1]}
              onChange={(e) =>
                setCheckedItems([checkedItems[0], e.target.checked, checkedItems[2]])
              }
            >
              Access to API
            </Checkbox>
            <Checkbox
              isChecked={checkedItems[2]}
              onChange={(e) =>
                setCheckedItems([checkedItems[0], checkedItems[1], e.target.checked])
              }
            >
              Can Add Category
            </Checkbox>
          </CheckboxGroup>
        </VStack>
      </VStack> */}
      <HStack width={'100%'} justifyContent={'right'}>
        <ButtonGroup>
          <Button colorScheme="red" variant="outline" size={'sm'} onClick={closeModal}>
            Cancel
          </Button>
          <Button colorScheme="green" variant="solid" size={'sm'} onClick={() => handleInsert()}>
            ADD
          </Button>
        </ButtonGroup>
      </HStack>
    </VStack>
  )
}

export default AddUserModal
