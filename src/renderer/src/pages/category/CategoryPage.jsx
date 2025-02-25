import { HStack, VStack, Text, Heading, Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { useColorMode, useColorModeValue, ColorModeButton } from '@/components/ui/color-mode'
import { Link } from 'react-router-dom'
import CategoryTable from '@/renderer/components/table/CategoryTable'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Icon, IconButton } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Separator } from '@chakra-ui/react'
import { LuSearch, LuSlidersHorizontal } from 'react-icons/lu'
import { InputGroup } from '@/components/ui/input-group'
function CategoryPage() {
  return (
    <Flex w={'100%'} h={'100%'}>
      <VStack w={'40%'} h={'100%'} p={5}>
        <Flex w="full" justify="space-between">
          {' '}
          <Heading>Category Page</Heading>
        </Flex>{' '}
        <CategoryTable />
      </VStack>
    </Flex>
  )
}
export default CategoryPage
