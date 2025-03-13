import { Field } from "@/components/ui/field"
import { PasswordInput } from "@/components/ui/password-input"
import {
  Button,
  Dialog,
  HStack,
  Portal,
} from "@chakra-ui/react"
import useUpdateData from "@/renderer/src/hooks/useUpdateData"
import React, { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';

const ChangePasswordDialog = ({ children, username }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    username: username || "",
  });

  const { data, message, loading, error, updateData } = useUpdateData();
  const [invalid, setInvalid] = useState(false);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!user.oldPassword || !user.newPassword || !user.confirmPassword) {
      setInvalid(true);
      return;
    }
    if (user.newPassword !== user.confirmPassword) {
      setInvalid(true);
      return;
    }

    updateData("api/USR0032", user);
    setInvalid(false);
    setIsOpen(false);
    setUser({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    toast.success('Password changed successfully.');
  };

  return (
    <>
    <HStack wrap="wrap" gap="4">
      <Dialog.Root
        size="sm"
        placement="center"
        motionPreset="slide-in-bottom"
        trapFocus={false}
        open={isOpen}
      >
        <Dialog.Trigger asChild onClick={() => setIsOpen(true)}>
          {children}
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Change Password</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Field label="Old Password" invalid={invalid && !user.oldPassword} errorText="Invalid password">
                  <PasswordInput name="oldPassword" value={user.oldPassword} onChange={handleOnChange} />
                </Field>
                <Field label="New Password" invalid={invalid && !user.newPassword} errorText="Invalid password">
                  <PasswordInput name="newPassword" value={user.newPassword} onChange={handleOnChange} />
                </Field>
                <Field
                  label="Confirm Password"
                  invalid={invalid && user.newPassword !== user.confirmPassword}
                  errorText="Passwords do not match"
                >
                  <PasswordInput name="confirmPassword" value={user.confirmPassword} onChange={handleOnChange} />
                </Field>
              </Dialog.Body>
              <Dialog.Footer>
                <Button size="xs" variant="surface" colorPalette="red" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button size="xs" colorPalette="green" variant="surface" disabled={loading} onClick={handleSubmit}>
                  Confirm Password
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </HStack>
    </>
  );
};

export default ChangePasswordDialog;
