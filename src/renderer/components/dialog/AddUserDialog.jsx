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

const AddUserDialog = ({ children, title, data, roleData }) => {
  const roles = ['Admin', 'Cashier', 'Manager']
  const roleNames = roleData.map((item) => item.roleName)

  const [user, setUser] = useState({
    username: data?.username || '', // Use optional chaining and default value
    userRole: data?.roleName || '', // Use optional chaining and default value
    contact: data?.contact || '', // Use optional chaining and default value
    firstName: data?.firstName || '', // Use optional chaining and default value
    lastName: data?.lastName || '', // Use optional chaining and default value
    
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
      userRole: selectedRole
    }))
  }

  const handleSubmit = () => {
    console.log(user) // Replace with your submission logic
  }

  return (
    <DialogRoot placement="center" trapFocus={true} >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack w={'100%'} h={'100%'} align={'flex-start'} spacing={4}>
            <Field label="Username">
              <Input name="username" size="sm"  onChange={handleOnChange} />
            </Field>
            <Field label="First Name" >
            <Input name="firstName" size="sm"  onChange={handleOnChange} />
            </Field>
            <Field label="Last Name">
            <Input name="lastName" size="sm"  onChange={handleOnChange} />
            </Field>
            <Field label="Contact (Optional)">
              <Input name="contact" size="sm"  onChange={handleOnChange} />
            </Field>
            <Field label="Role">
              <SearchSelection
                collection={roleNames}
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
            Update User
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default AddUserDialog
