import { Box, Button, Card, Image, Input, VStack,Flex } from '@chakra-ui/react';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import { HiUpload } from 'react-icons/hi';
import SearchSelection from '@/renderer/src/components/autocomplete/SearchSelection';
import { PasswordInput } from '@/components/ui/password-input';
import React, { useState, useEffect } from 'react';
import useUpdateData from '@/renderer/src/hooks/useUpdateData';
import useUser from '@/renderer/src/hooks/useUser';

const AddUserDialog = ({ children, data, roleData, onInsert }) => {
  const roleNames = roleData.map((item) => item.roleName);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Initialize user state with default empty values
  const [user, setUser] = useState({
    username: data?.username || '',
    roleName: data?.roleName || '',
    contact: data?.contact || '',
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    roleId: data?.roleId || null,
    password: ''
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleRoleChange = (selectedRole) => {
    const selectedRoleData = roleData.find((role) => role.roleName === selectedRole);
    setUser((prevUser) => ({
      ...prevUser,
      roleName: selectedRole,
      roleId: selectedRoleData ? selectedRoleData.roleId : null, // Update roleId based on roleName
    }));
  };

  const handleSubmit = () => {
    setFormSubmitted(true); // Mark form as submitted

    const isValid = user.username && user.password && user.firstName && user.lastName && user.roleName;
    if (!isValid) return; // Prevent submission if fields are missing

    onInsert(user);

    // Reset form
    setUser({
      username: '',
      roleName: '',
      contact: '',
      firstName: '',
      lastName: '',
      roleId: null,
      password: '',
    });

    setFormSubmitted(false); // Reset validation state
  };

  return (
    <DialogRoot placement="center"  closeOnInteractOutside={false} trapFocus={false}	>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack w={'100%'} h={'100%'} align={'flex-start'} spacing={4}>
            <Field invalid={formSubmitted && user.username === ''} label="Username" errorText={user.username === '' ? 'Username is required' : ''}>
              <Input name="username" size="sm" value={user.username} onChange={handleOnChange} />
            </Field>
            <Field invalid={formSubmitted && user.password === ''} label="Password" errorText={user.password === '' ? 'Password is required' : ''}>
              <PasswordInput name="password" size="sm" value={user.password} onChange={handleOnChange} />
            </Field>
            <Flex gap={2} w={'full'}>
            <Field label="First Name" errorText={user.firstName === '' ? 'First Name is required' : ''} invalid={formSubmitted && user.firstName === ''}>
              <Input name="firstName" size="sm" value={user.firstName} onChange={handleOnChange} />
            </Field>
            <Field invalid={formSubmitted && user.lastName === ''} label="Last Name" errorText={user.lastName === '' ? 'Last Name is required' : ''}>
              <Input name="lastName" size="sm" value={user.lastName} onChange={handleOnChange} />
            </Field></Flex>
            <Field  label="Contact (Optional)" >
              <Input name="contact" size="sm" value={user.contact} onChange={handleOnChange} />
            </Field>
            <Field label="Role" invalid={formSubmitted && user.roleName === ''} errorText={user.roleName === '' ? 'Role is required' : ''}>
              <SearchSelection
                collection={roleNames}
                selectedValue={user.roleName}
                onChange={handleRoleChange}
                name="roleName"
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
          <Button size="xs" variant="surface" colorPalette={'green'} onClick={handleSubmit}>
            Add User
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default AddUserDialog;
