import React from 'react'
import ProductGrid from '@/renderer/src/components/productGrid/ProductGrid'
import OrderPage from '@/renderer/src/components/orderGrid/OrderPage'
import { Flex, Box, HStack } from '@chakra-ui/react'
function POSPage() {
  return (
    <HStack justifyContent={'center'} alignItems={'center'} w={'100%'} h={'full'} gap={4} p={5}>
      <Box w={'70%'} h={'100%'}>
        <ProductGrid />
      </Box>
      <Box w={'30%'} h={'100%'}>
        <OrderPage />
      </Box>
    </HStack>
  )
}

export default POSPage
