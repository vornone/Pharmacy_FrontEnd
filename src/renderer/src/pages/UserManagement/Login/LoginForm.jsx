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
import { login } from '../../../actions/AuthActions.js'

function LoginForm({ onLogin }) {
  const [show, setShow] = useState(false)
  const [input, setInput] = useState({ username: '', password: '' })
  const [isError, setIsError] = useState(false)
  const dispatch = useDispatch()
  const redirectUrl = ''
  const handleInputChange = (e) => setInput({ ...input, [e.target.name]: e.target.value })
  const handleShow = () => setShow(!show)

  const handleLogin = async () => {
    const isError = await dispatch(login(input, redirectUrl))
    setIsError(isError)
    if (!isError) {
      onLogin() // Notify the parent component of successful login
    }
  }
  useEffect(() => {
    const previousUser = localStorage.getItem('user')
    if (previousUser) {
      setInput({ ...input, username: JSON.parse(previousUser).username });
    }
  },[])

  return (
    <VStack width={'20%'}>
      <FormControl isInvalid={isError}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={FaUserFriends} />
          </InputLeftElement>
          <Input type="text" placeholder="Username" name="username" onChange={handleInputChange} 
              onKeyDown={e => e.key === 'Enter' && handleLogin()} defaultValue={input.username} />
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
              onChange={handleInputChange}
              placeholder="Password"
              type={show ? 'text' : 'password'}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
            <InputRightElement width={'4.5rem'}>
              <Icon boxSize={5} as={show ? IoMdEye : IoMdEyeOff} onClick={handleShow}></Icon>
            </InputRightElement>
          </InputGroup>
          <Flex justifyContent={'space-between'} style={{ direction: 'rtl' }}>
            <Button onClick={handleLogin}> Log in</Button>
            {isError && <FormHelperText color="red.500">Invalid credentials</FormHelperText>}
          </Flex>
        </Flex>
      </FormControl>
    </VStack>
  )
}

export default LoginForm
