import { Box, Button, Card, Image, Input, VStack } from '@chakra-ui/react'
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Field } from '@/components/ui/field'
import { HiUpload } from 'react-icons/hi'
import SearchSelection from '@/renderer/components/autocomplete/SearchSelection'
import { PasswordInput } from '@/components/ui/password-input'
import React, { useState } from 'react'

const EditUserDialog = ({ children, title, data = {} }) => {
  const roles = ['Admin', 'Cashier', 'Manager']
  const [user, setUser] = useState({
    username: data?.username || '', // Use optional chaining and default value
    user_role: data?.user_role || '', // Use optional chaining and default value
    user_password: data?.user_password || '', // Use optional chaining and default value
    contact: data?.contact || '' // Use optional chaining and default value
  })

  const handleOnChange = (event) => {
    const { name, value } = event.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }))
  }

  const handleRoleChange = (selectedRole) => {
    setUser((prevUser) => ({
      ...prevUser,
      user_role: selectedRole
    }))
  }

  const handleSubmit = () => {
    console.log(user) // Replace with your submission logic
  }

  return (
    <DialogRoot placement={'center'}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack w={'100%'} h={'100%'} align={'flex-start'} spacing={4}>
            <Field label="Username">
              <Input name="username" size="xs" value={user.username} onChange={handleOnChange} />
            </Field>
            <Field label="Password">
              <PasswordInput
                name="user_password"
                size="xs"
                value={user.user_password}
                onChange={handleOnChange}
              />
            </Field>
            <Field label="Role">
              <SearchSelection
                collection={roles}
                selectedValue={user.user_role}
                onChange={handleRoleChange}
              />
            </Field>
          </VStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="surface" colorPalette="red" size="xs">
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button size="xs" variant="surface" colorPalette="green" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

// Add default props for `data`
EditUserDialog.defaultProps = {
  data: {
    username: '',
    user_role: '',
    user_password: '',
    contact: ''
  }
}

export default EditUserDialog
