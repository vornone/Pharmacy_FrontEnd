import { Button, Fieldset, Input, Stack, Text } from '@chakra-ui/react'
import { Field } from '@/components/ui/field'
import { Card } from '@chakra-ui/react'
import { PasswordInput } from '@/components/ui/password-input'
import { ColorModeButton } from '@/components/ui/color-mode'
import { NumberInputField, NumberInputRoot } from '@/components/ui/number-input'
import { InputGroup } from '@/components/ui/input-group'
import React, { useState } from 'react'
const AdminPage = () => {
  const [isEditable, setIsEditable] = useState(false)
  return (
    <Card.Root p={10} borderRadius={20} shadow={'md'}>
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend fontSize="2xl">Admin Page</Fieldset.Legend>
          <Fieldset.HelperText>Edit your essential data</Fieldset.HelperText>
        </Stack>
        <Fieldset.Content>
          <Field
            label="Minimum Stock"
            helperText="Show alert when stock is less or equal to the amount"
          >
            <Input name="name" defaultValue={10} disabled={!isEditable} />
          </Field>
          <Field label="Khmer Riel" helperText="Amount equal to 1USD">
            <NumberInputRoot
              w="full"
              formatOptions={{
                style: 'currency',
                currency: 'KHR'
              }}
              step={10}
              disabled={!isEditable}
              defaultValue={299}
            >
              <NumberInputField />
            </NumberInputRoot>
          </Field>
        </Fieldset.Content>
        <Button
          type="submit"
          alignSelf="flex-end"
          colorPalette={'blue'}
          onClick={() => setIsEditable(!isEditable)}
          variant={isEditable ? 'solid' : 'outline'}
        >
          {isEditable ? 'Save' : 'Edit'}
        </Button>
        <ColorModeButton />
      </Fieldset.Root>
    </Card.Root>
  )
}
export default AdminPage
