import { VStack, Heading, Flex, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import CategoryTable from '@/renderer/src/components/table/CategoryTable'
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
