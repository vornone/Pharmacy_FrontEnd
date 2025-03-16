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
import  useInsertData  from '@/renderer/src/hooks/useInsertData'

const AddUserRoleDialog = ({ children ,handleAddUserRole}) => {
  const { data, loading, error, insertData } = useInsertData()
  const [invalid, setInvalid] = useState(false)
  const [role, setRole] = useState({
    roleName: '',
    roleDescription: ''
  })


  const handleOnChange = (e) => {
    const { name, value } = e.target
    setRole((prevRole) => ({
      ...prevRole,
      [name]: value
    }))
    setInvalid(false)
  }

  const handleSubmit = () => {
    if (!role.roleName || !role.roleDescription) {
      setInvalid(true)
      return
    }
    handleAddUserRole(role)
    setRole({
      roleName: '',
      roleDescription: ''
    })
    setInvalid(false)
  }

  return (
    <DialogRoot placement="center" trapFocus={false} modal={true}  unmountOnExit>
      <DialogTrigger asChild >{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Role</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack w="100%" h="100%" align="flex-start">
            <Field  invalid={invalid} label="Role Name" errorText="This field is invalid">
              <Input
                name="roleName"
                size="sm"
                value={role.roleName}
                onChange={handleOnChange}
              />
            </Field>
            <Field  invalid={invalid} label="Description" errorText="This field is invalid">
              <Textarea
                name="roleDescription"
                size="sm"
                value={role.roleDescription}
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
          </DialogActionTrigger >
          <Button
            size="xs"
            variant="surface"
            colorPalette="green"
            onClick={() => handleSubmit()}
            loading={loading} // Better UX for loading state
            disabled={loading || invalid}
          >
            {loading ? 'Saving...' : 'Add Role'}
          </Button>
        </DialogFooter>
        <DialogCloseTrigger  />
      </DialogContent>
    </DialogRoot>
  )
}

export default AddUserRoleDialog
