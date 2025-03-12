import { HStack, VStack, Text, Heading, Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { useColorMode, useColorModeValue, ColorModeButton } from '@/components/ui/color-mode'
import { Link } from 'react-router-dom'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Icon, IconButton } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Separator } from '@chakra-ui/react'
import { LuSearch, LuSlidersHorizontal } from 'react-icons/lu'
import { InputGroup } from '@/components/ui/input-group'
import SaleTable from '@/renderer/src/components/table/SaleTable'
function SalePage() {
  return (
    <Flex w={'100%'} h={'100%'}>
      <VStack w={'80%'} h={'100%'} p={5}>
        <Flex w="full" justify="space-between">
          {' '}
          <Heading>Sales Page</Heading>
        </Flex>
        <Flex w="full" justify="space-between" gap={5}>
          {' '}
          <InputGroup flex="1" startElement={<LuSearch />}>
            <Input placeholder="Search Sale Record" w="50%" size={'xs'} />
          </InputGroup>
          <IconButton variant={'outline'} size={'xs'}>
            <LuSlidersHorizontal />
          </IconButton>
        </Flex>{' '}
        <SaleTable />
      </VStack>
    </Flex>
  )
}

export default SalePage
