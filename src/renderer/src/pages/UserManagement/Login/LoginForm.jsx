// import { Flex, FormHelperText, Icon, VStack } from '@chakra-ui/react'
// import React, { useState, useReducer } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {
//   FormControl,
//   InputGroup,
//   InputLeftElement,
//   Input,
//   InputRightElement,
//   Button
// } from '@chakra-ui/react'
// import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
// import { IoLockOpen } from 'react-icons/io5'
// import { FaUserFriends } from 'react-icons/fa'
// import { login } from '../../../actions/AuthActions.js'

// function LoginForm() {
//   const [show, setShow] = useState(false)
//   const [input, setInput] = useState({ username: '', password: '' })
//   const [isError, setIsError] = useState(false)
//   const dispatch = useDispatch()
//   const redirectUrl = ''

//   const handleInputChange = (e) => setInput({ ...input, [e.target.name]: e.target.value })
//   const handleShow = () => setShow(!show)
//   const handleLogin = async () => {
//     setIsError(await dispatch(login(input, redirectUrl)))
//   }

//   return (
//     <>
//       <VStack width={'20%'}>
//         <FormControl isInvalid={isError}>
//           <InputGroup>
//             <InputLeftElement pointerEvents="none">
//               <Icon as={FaUserFriends} />
//             </InputLeftElement>
//             <Input
//               type="text"
//               placeholder="Username"
//               name="username"
//               onChange={handleInputChange}
//             />
//           </InputGroup>
//         </FormControl>
//         <FormControl isInvalid={isError}>
//           <Flex flexDirection={'column'} gap={2}>
//             <InputGroup>
//               <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
//                 <Icon as={IoLockOpen} />
//               </InputLeftElement>
//               <Input
//                 name="password"
//                 onChange={handleInputChange}
//                 placeholder="Password"
//                 type={show ? 'text' : 'password'}
//               />

//               <InputRightElement width={'4.5rem'}>
//                 <Icon boxSize={5} as={show ? IoMdEye : IoMdEyeOff} onClick={handleShow}></Icon>
//               </InputRightElement>
//             </InputGroup>

//             <Flex justifyContent={'space-between'} style={{ direction: 'rtl' }}>
//               <Button onClick={handleLogin}> Log in</Button>
//               {/* {isError ? <FormHelperText>{Error}</FormHelperText> : ''} */}
//             </Flex>
//           </Flex>
//         </FormControl>
//       </VStack>
//     </>
//   )
// }

// export default LoginForm
