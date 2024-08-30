import React from 'react'
import { HStack, Icon, Switch, Text, useColorMode } from '@chakra-ui/react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
const ColorModeSwitch = ({ colorMode, toggleColorMode }) => {
  return (
    <HStack width={200} justifyContent={'flex-end'} alignItems={'top'}>
      <Switch
        isChecked={colorMode == 'dark'}
        onChange={toggleColorMode}
        colorScheme="blue"

      ></Switch>
      <Icon as={colorMode == 'light' ? MdLightMode : MdDarkMode}></Icon>
    </HStack>
  )
}

export default ColorModeSwitch
