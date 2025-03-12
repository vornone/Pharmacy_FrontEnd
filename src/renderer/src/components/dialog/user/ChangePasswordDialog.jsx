import { Field } from "@/components/ui/field"
import { PasswordInput } from "@/components/ui/password-input"
import {
  Button,
  CloseButton,
  Dialog,
  For,
  HStack,
  Portal,
} from "@chakra-ui/react"

const ChangePasswordDialog = ({children}) => {
  return (
    <HStack wrap="wrap" gap="4">

          <Dialog.Root
          size={'sm'}
            placement={'center'}
            motionPreset="slide-in-bottom"
          >
            <Dialog.Trigger asChild>
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
                    <Field label={"Old Password"}>
                      <PasswordInput></PasswordInput>
                    </Field>
                    <Field label="New Password">
                      <PasswordInput></PasswordInput>
                    </Field>
                    <Field label="Confirm Password">
                      <PasswordInput></PasswordInput>
                    </Field>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild >
                      <Button size="xs" variant={'surface'} colorPalette={'red'} >Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button size="xs" colorPalette={'green'} variant={'surface'}>Confirm Password</Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
    </HStack>
  )
}
export default ChangePasswordDialog
