import { Flex, VStack, FormHelperText, Icon } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button
} from '@chakra-ui/react'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { IoLockOpen } from 'react-icons/io5'
import { FaUserFriends } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../../actions/AuthActions.js'

function LoginForm({ onLogin }) {
  const [show, setShow] = useState(false)
  const [input, setInput] = useState({ username: '', password: '' })
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
    setIsError(false)
  }

  const handleShow = () => setShow(!show)

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
        onLogin()
        navigate('/')
      } else {
        setIsError(true)
      }
    } catch (error) {
      console.error('Login error:', error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const previousUser = localStorage.getItem('user')
    if (previousUser) {
      try {
        const parsedUser = JSON.parse(previousUser)
        setInput((prev) => ({ ...prev, username: parsedUser.username }))
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('user')
      }
    }
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <VStack width={'100%'}>
        <FormControl isInvalid={isError}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaUserFriends} />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Username"
              name="username"
              value={input.username}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
          </InputGroup>
        </FormControl>

        <FormControl isInvalid={isError}>
          <Flex flexDirection={'column'} gap={2}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
                <Icon as={IoLockOpen} />
              </InputLeftElement>
              <Input
                name="password"
                value={input.password}
                onChange={handleInputChange}
                placeholder="Password"
                type={show ? 'text' : 'password'}
                disabled={isLoading}
                required
              />
              <InputRightElement width={'4.5rem'}>
                <Icon
                  boxSize={5}
                  as={show ? IoMdEye : IoMdEyeOff}
                  onClick={handleShow}
                  cursor="pointer"
                />
              </InputRightElement>
            </InputGroup>

            <Flex justifyContent={'space-between'} style={{ direction: 'rtl' }}>
              <Button
                type="submit"
                isLoading={isLoading}
                loadingText="Logging in..."
                disabled={isLoading}
              >
                Log in
              </Button>
              {isError && <FormHelperText color="red.500">Invalid credentials</FormHelperText>}
            </Flex>
          </Flex>
        </FormControl>
      </VStack>
    </form>
  )
}

export default LoginForm
