import { ButtonGroup, Flex, FormHelperText, HStack, Icon, VStack } from "@chakra-ui/react";
import React, { useState, useReducer } from "react";
import { FormControl, InputGroup, InputLeftElement, Input, InputRightElement, Button, Stack } from "@chakra-ui/react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { TiUser } from "react-icons/ti";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoLockOpen } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";

function LoginForm() {

  const user = {
    username: "fuck you",
    password: "fuckyou"
  }
  const formHelper = '';
  const [show, setShow] = useState(false);
  const [input, setInput] = useState({ username: "", password: "" });
  const [isError, setIsError] = useState(false);
  const [test, setTest] = useState({hello:"", bye:""})
  function reducer(formHelper, action) {
    if (action == "no user found") {
      return "No User Found";
    } else if (action == "wrong password") {
      return "Wrong Password";
    } else if (action == "empty field") {
      return "User and Password cannot be empty ";
    } else return formHelper;
  }
  const [Error, dispatch] = useReducer(reducer, formHelper);
  const handleInputChange = (e) => setInput(
    { ...input, [e.target.name]: e.target.value},
  )
  const handleShow= () => setShow(!show);
  const handleLogin = () => {
    setIsError(true);
    if (input.username == "" || input.password == "") {
      dispatch("empty field");
    } else if (input.username.toLowerCase() !== user.username) {
      dispatch("no user found");
    } else if (input.username.toLowerCase() == user.username && input.password !== user.password) {
      dispatch("wrong password");
    } else setIsError(false);
  }

    return (
    <>

      <VStack width={"20%"}>
      <FormControl isInvalid={isError}>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <Icon as={FaUserFriends} />
          </InputLeftElement>
          <Input type='tel' placeholder='Username' name="username" onChange={handleInputChange} />
        </InputGroup>
      </FormControl >
        <FormControl isInvalid={isError} >
          <Flex flexDirection={"column"}  gap={2} >
          <InputGroup >

            <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
              <Icon as={IoLockOpen} />
            </InputLeftElement>
            <Input name="password" onChange={handleInputChange} placeholder='Password' type={show ? 'text' : 'password'}
            />

            <InputRightElement width={'4.5rem'}>
              <Icon boxSize={5} as={show ? IoMdEye : IoMdEyeOff} onClick={handleShow} ></Icon>
            </InputRightElement>

          </InputGroup>
       
          <Flex justifyContent={"space-between"} style={{direction:"rtl"}}>
          <Button onClick={handleLogin} > Log in</Button>
          {isError ? <FormHelperText>{Error}</FormHelperText> :""}

          </Flex>
        </Flex>
        </FormControl>
       
      </VStack>
    </>
  )
}

export default LoginForm;