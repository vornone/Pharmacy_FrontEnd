import { Box, Button, Card, Image, Input, SelectRoot, VStack } from '@chakra-ui/react'
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
import { SegmentedControl } from '@/components/ui/segmented-control'
import React, { useRef, forwardRef, useState } from 'react'
import { Field } from '@/components/ui/field'
import { HiUpload } from 'react-icons/hi'
import SearchSelection from '@/renderer/components/autocomplete/SearchSelection'
import { PasswordInput } from '@/components/ui/password-input'
const AddUserDialog = ({ children }) => {
  const roles = ['Admin', 'Cashier', 'Manager']
  const [user, setUser] = useState({
    username: '',
    user_role: '',
    user_password: '',
    contact: ''
  })

  const handleOnChange = (event) => {
    const { name, value } = event.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    console.log(user)
  }

  return (
    <>
      <DialogRoot placement={'center'}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <VStack w={'100%'} h={'100%'} align={'flex-start'}>
              <Field label="Username">
                <Input name="username" size="xs" onChange={handleOnChange} />
              </Field>
              <Field label="Password">
                <PasswordInput name="password" size="xs" onChange={handleOnChange} />
              </Field>
              <Field label="category">
                <SearchSelection collection={roles} onChange={handleOnChange} />
              </Field>
            </VStack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="solid" colorPalette={'red'} size={'xs'}>
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button size={'xs'} variant={'solid'} colorPalette={'green'} onClick={handleSubmit}>
              Add New User
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  )
}

export default AddUserDialog
