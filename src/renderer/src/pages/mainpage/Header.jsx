import React from 'react'
import { ColorModeButton } from '@/components/ui/color-mode'
import { HStack, Icon, Flex, Text, Heading } from '@chakra-ui/react'
import { VscTerminalBash } from 'react-icons/vsc'
import { createListCollection } from '@chakra-ui/react'
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText
} from '@/components/ui/select'
import { useState } from 'react'
import { ColorModeProvider, useColorMode, useColorModeValue } from '@/components/ui/color-mode'
const Header = ({bgColor}) => {
  const collection = createListCollection({
    items: [
      { label: 'POS System', value: 'POS System' },
      { label: 'Inventory', value: 'Inventory' }
    ]
  })
  const [platform, setPlatform] = useState(collection.items[0].value)
  return (
    <HStack
    bg={bgColor}
      w={'full'}
      justifyContent={'space-between'}
              borderBottom={'1px solid'}
              borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      py={'2'}
      px={'5'}
      alignItems={'center'}
    >
      <Heading>System</Heading>
      <ColorModeButton />
    </HStack>
  )
}

export default Header
