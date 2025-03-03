import { Button, Fieldset, Input, Stack } from '@chakra-ui/react'
import { Field } from '@/components/ui/field'
import { Card } from '@chakra-ui/react'
import { PasswordInput } from '@/components/ui/password-input'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../../actions/AuthActions'
import { Toaster, toaster } from '@/components/ui/toaster'
const NewLoginForm = ({ onLogin }) => {
  const [input, setInput] = useState({ username: '', password: '' })
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
    setIsError(false)
    console.log(input)
  }
  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault()
    }

    if (!input.username || !input.password) {
      setIsError(true)

      return
    }

    setIsLoading(true)
    try {
      const isError = await dispatch(login(input))
      if (!isError) {
        toaster.create({
          title: 'Login Success',
          description: 'Login Success',
          type: 'success'
        })
        onLogin()
      } else {
        setIsError(true)
      }
    } catch (error) {
      toaster.create({
        title: 'Toast Title',
        description: 'Toast Description',
        type: 'error'
      })
      console.error('Login error:', error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const previousUser = localStorage.getItem('username')
    if (previousUser) {
      try {
        const parsedUser = JSON.parse(previousUser)
        setInput((prev) => ({ ...prev, username: parsedUser.username }))
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('username')
      }
    }
  }, [])
  return (
    <>
      <Toaster />
      <Card.Root p={10}>
        <Fieldset.Root size="lg" maxW="md">
          <Stack>
            <Fieldset.Legend fontSize="2xl">Welcome Back</Fieldset.Legend>
            <Fieldset.HelperText>Enter your details to log in to your account</Fieldset.HelperText>
          </Stack>
          <Fieldset.Content>
            <Field label="Name">
              <Input name="username" onChange={handleInputChange} />
            </Field>
            <Field label="Password">
              <PasswordInput name="password" onChange={handleInputChange} />
            </Field>
          </Fieldset.Content>
          <Button
            type="submit"
            alignSelf="flex-end"
            colorPalette={'blue'}
            onClick={handleSubmit}
            variant={'surface'}
            size={'xs'}
          >
            Log In
          </Button>
        </Fieldset.Root>
      </Card.Root>
    </>
  )
}
export default NewLoginForm
