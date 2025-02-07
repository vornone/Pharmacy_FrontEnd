import { Button, Fieldset, Input, Stack } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import {Card } from "@chakra-ui/react"
import { PasswordInput } from '@/components/ui/password-input';
import { ColorModeButton } from "@/components/ui/color-mode"

 const NewLoginForm = () => {
  return (
    <Card.Root p={10}>
    <Fieldset.Root size="lg" maxW="md"  >
      <Stack>
        <Fieldset.Legend fontSize="2xl">Welcome Back</Fieldset.Legend>
        <Fieldset.HelperText>
          Enter your details to log in to your account
        </Fieldset.HelperText>
      </Stack>
      <Fieldset.Content>
        <Field label="Name">
          <Input name="name" />
        </Field>
        <Field label="Password">
          <PasswordInput name="password" />
        </Field>
      </Fieldset.Content>
      <Button type="submit" alignSelf="flex-end" colorPalette={'blue'}>
        Log In
      </Button>
      <ColorModeButton />
    </Fieldset.Root>
    </Card.Root>
  )
}
export default NewLoginForm