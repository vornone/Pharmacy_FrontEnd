import { Box, Button, Card, Image, Input, SelectRoot, VStack, Textarea } from '@chakra-ui/react'
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
import React, { useState } from 'react'
import { Field } from '@/components/ui/field'
import useInsertData from '@/renderer/src/hooks/useInsertData'
import useUserRole from '@/renderer/src/hooks/useUserRole'

const AddUserRoleDialog = ({ children ,handleAddUserRole}) => {
  const {data: dataRole, loading, error, insertData } = useInsertData()
  const [role, setRole] = useState({
    roleName: '',
    description: ''
  })


  const handleOnChange = (e) => {
    const { name, value } = e.target
    setRole((prevRole) => ({
      ...prevRole,
      [name]: value
    }))
    console.log(role) 
  }

  return (
    <DialogRoot placement="center">
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack w="100%" h="100%" align="flex-start">
            <Field label="Role Name">
              <Input
                name="roleName"
                size="xs"
                value={role.roleName}
                onChange={handleOnChange}
              />
            </Field>
            <Field label="Description">
              <Textarea
                name="description"
                size="xs"
                value={role.description}
                onChange={handleOnChange}
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
          <Button
            size="xs"
            variant="surface"
            colorPalette="green"
            onClick={() => handleAddUserRole(role)}
            isLoading={loading} // Better UX for loading state
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default AddUserRoleDialog
