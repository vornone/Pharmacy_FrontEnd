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

const AddUserRoleDialog = ({ children }) => {
  const [role, setRole] = useState({
    user_role_name: ''
  })

  const handleOnChange = (event) => {
    const { name, value } = event.target
    setRole((prevRole) => ({
      ...prevRole,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    console.log(role)
  }

  return (
    <>
      <DialogRoot placement={'center'}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Role</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <VStack w={'100%'} h={'100%'} align={'flex-start'}>
              <Field label="Role Name">
                <Input name="user_role_name" size="xs" onChange={handleOnChange} />
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
              Add New Role
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  )
}

export default AddUserRoleDialog
