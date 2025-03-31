import React, { useState, useMemo, useCallback } from 'react';
import { Box, Button, Card, Image, Input, VStack, Flex } from '@chakra-ui/react';
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
} from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import SearchSelection from '@/renderer/src/components/autocomplete/SearchSelection';
import ChangePasswordDialog from './ChangePasswordDialog';
import useUpdateData from '@/renderer/src/hooks/useUpdateData';
import { PasswordInput } from '@/components/ui/password-input';
const EditUserDialog = ({ children, data, roleData, onUpdate }) => {
  const { loading } = useUpdateData();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isEdittable, setIsEdittable] = useState(true);
  const [user, setUser] = useState({
    username: data?.username || '',
    roleName: data?.roleName || '',
    contact: data?.contact || '',
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    roleId: data?.roleId || null,
  });

  const roleNames = useMemo(() => roleData.map(item => item.roleName), [roleData]);

  const handleOnChange = useCallback((event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  }, []);

  const handleRoleChange = useCallback((selectedRole) => {
    const selectedRoleData = roleData.find((role) => role.roleName === selectedRole);
    setUser((prevUser) => ({
      ...prevUser,
      roleName: selectedRole,
      roleId: selectedRoleData ? selectedRoleData.roleId : null
    }));
  }, [roleData]);

  const handleSubmit = useCallback(() => {
    setFormSubmitted(true);
    const isValid = user.username && user.firstName && user.lastName && user.roleName;
    if (!isValid) return;
    onUpdate(user);
    setFormSubmitted(false);
    setIsEdittable(true);
  }, [user, onUpdate]);

  return (
    <DialogRoot placement="center" unmountOnExit onExitComplete={() => setIsEdittable(true)} closeOnInteractOutside={false} trapFocus={false}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent borderRadius={25} _dark={{ bg: 'gray.900' }}>
        <DialogHeader>
          <DialogTitle>Edit User Detail</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack w={'100%'} h={'100%'} align={'flex-start'} spacing={4}>
            <Field label="Username (cannot be edited)">
              <Input name="username" size="sm" defaultValue={data.username} onChange={handleOnChange} disabled />
            </Field>
            <Field invalid={formSubmitted && !user.roleId} label={"Password"}>
              <Flex gap={2} w={'full'}>
              <PasswordInput value={'123456'} disabled></PasswordInput>
              <ChangePasswordDialog username={user.username}>
                <Button variant="surface" colorPalette="primary" size="sm" disabled={isEdittable}>
                  Edit Password
                </Button>
              </ChangePasswordDialog>
              </Flex>
            </Field>
            <Flex gap={2} w={'full'}>
              <Field label="First Name" errorText={'Invalid first name'} invalid={formSubmitted && user.firstName === ''}>
                <Input name="firstName" size="sm" defaultValue={data.firstName} onChange={handleOnChange} disabled={isEdittable} />
              </Field>
              <Field invalid={formSubmitted && user.lastName === ''} label="Last Name" errorText={'Invalid last name'}>
                <Input name="lastName" size="sm" defaultValue={data.lastName} onChange={handleOnChange} disabled={isEdittable} />
              </Field>
            </Flex>
            <Field invalid={formSubmitted && !user.contact} label="Contact (Optional)">
              <Input disabled={isEdittable} name="contact" size="sm" defaultValue={data.contact} onChange={handleOnChange} />
            </Field>
            <Field invalid={formSubmitted && !user.roleName} label="Role" errorText="Role is required">
              <SearchSelection
                disabled={isEdittable}
                collection={roleNames}
                selectedValue={data.roleName}
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
          <Button size="xs" variant="surface" colorPalette={isEdittable ? 'blue' : 'green'} onClick={isEdittable ? () => setIsEdittable(false) : handleSubmit} loading={loading}>
            {isEdittable ? 'Edit' : 'Update User'}
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default React.memo(EditUserDialog);
