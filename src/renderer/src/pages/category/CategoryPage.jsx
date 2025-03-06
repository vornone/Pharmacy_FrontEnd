import { VStack, Heading, Flex, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import CategoryTable from '@/renderer/components/table/CategoryTable'
import useCategory from '@/renderer/src/hooks/useCategory'
function CategoryPage() {
  const { data, loading, error, getCategory } = useCategory({ limit: 10, offset: 0 })
  useEffect(() => {
    getCategory()
  }, [])
  if (loading) {
    return (
      <Flex w={'100%'} h={'100%'} justify="center" align="center">
        <Text>Loading user data...</Text>
      </Flex>
    )
  }

  // Show error message if data fetching failed
  if (error) {
    return (
      <Flex w={'100%'} h={'100%'} justify="center" align="center">
        <Text color="red.500">Error loading user data: {error.message}</Text>
      </Flex>
    )
  }
  return (
    <Flex w={'100%'} h={'100%'}>
      <VStack w={'40%'} h={'100%'} p={5}>
        <Flex w="full" justify="space-between">
          {' '}
          <Heading>Category Page</Heading>
        </Flex>{' '}
        <CategoryTable categoryData={data || []} />
      </VStack>
    </Flex>
  )
}
export default CategoryPage
