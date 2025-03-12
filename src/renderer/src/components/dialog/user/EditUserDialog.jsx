import { Box, Button, Card, Image, Input, VStack, Flex } from '@chakra-ui/react'
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
import SearchSelection from '@/renderer/src/components/autocomplete/SearchSelection'
import React, { useState, useEffect } from 'react'
import ChangePasswordDialog from './ChangePasswordDialog'
const EditUserDialog = ({ children, data, roleData,onUpdate }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const roleNames = roleData.map((item) => item.roleName)
  const [isEdittable, setIsEdittable] = useState(true)
  const [user, setUser] = useState({
    username: data?.username || '', // Use optional chaining and default value
    roleName: data?.roleName || '', // Use optional chaining and default value
    contact: data?.contact || '', // Use optional chaining and default value
    firstName: data?.firstName || '', // Use optional chaining and default value
    lastName: data?.lastName || '', // Use optional chaining and default value
    roleId : data?.roleId || null,
  })

  const handleOnChange = (event) => {
    const { name, value } = event.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }))
    console.log(user)

  }
  const handleRoleChange = (selectedRole) => {
    const selectedRoleData = roleData.find((role) => role.roleName === selectedRole);
    setUser((prevUser) => ({
      ...prevUser,
      roleName: selectedRole,
      roleId: selectedRoleData ? selectedRoleData.roleId : null // Update roleId based on roleName
    }));
  };

  const handleSubmit = () => {
    setFormSubmitted(true); // Mark form as submitted

    const isValid = user.username && user.firstName && user.lastName && user.roleName;
    if (!isValid) return; // Prevent submission if fields are missing

    onUpdate(user); // Update user data
    setFormSubmitted(false); // Reset form submission state
    setIsEdittable(true); // Set editable back to true after submit
  };

  return (
    <DialogRoot placement="center"   unmountOnExit onExitComplete={()=> setIsEdittable(true)}  closeOnInteractOutside={false} trapFocus={false}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Detail</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack w={'100%'} h={'100%'} align={'flex-start'} spacing={4}>
            <Field  label="Username (cannot be edited)"  >
              <Input name="username" size="sm" value={user.username} onChange={handleOnChange} disabled/>
            </Field>
            <Flex gap={2} w={'full'}>
            <Field label="First Name" errorText={user.firstName === '' ? 'First Name is required' : ''} invalid={formSubmitted && user.firstName === ''}>
              <Input name="firstName" size="sm" value={user.firstName} onChange={handleOnChange} disabled={isEdittable}/>
            </Field>
            <Field invalid={formSubmitted && user.lastName === ''} label="Last Name" errorText={user.lastName === '' ? 'Last Name is required' : ''}>
              <Input name="lastName" size="sm" value={user.lastName} onChange={handleOnChange} disabled={isEdittable}/>
            </Field></Flex>
            <Field invalid={ formSubmitted && !user.contact} label="Contact (Optional)">
              <Input disabled={isEdittable} name="contact" size="sm" value={user.contact} onChange={handleOnChange} />
            </Field>
            <Field invalid={ formSubmitted && !user.roleName} label="Role" errorText="Role is required">
              <SearchSelection
                disabled={isEdittable}
                collection={roleNames}
                selectedValue={user.roleName}
                onChange={handleRoleChange}
                name="roleName"
              />
            </Field>
            <Field invalid={formSubmitted && !user.roleId} label={"Change Password" }>
              <ChangePasswordDialog>
            <Button variant="outline" colorPalette="neutral" size="sm" disabled={isEdittable}>
              Edit Password
            </Button>
            </ChangePasswordDialog>
            </Field>
          </VStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="surface" colorPalette="red" size="xs">
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button size="xs" variant="surface" colorPalette={isEdittable?'blue':'green'} onClick={isEdittable ? () => setIsEdittable(false) : handleSubmit} >
            {isEdittable ? 'Edit' : 'Update User'}
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default EditUserDialog
