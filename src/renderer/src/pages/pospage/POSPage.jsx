import React from 'react'
import ProductGrid from '@/renderer/components/productGrid/ProductGrid'
import OrderPage from '@/renderer/components/orderGrid/OrderPage'
import { Flex, Box, HStack } from '@chakra-ui/react'
function POSPage() {
  return (
    <HStack justifyContent={'center'} alignItems={'center'} w={'100%'} h={'100%'} gap={5}>
      <Box w={'60%'} h={'100%'}>
        <ProductGrid />
      </Box>
      <Box w={'40%'} h={'100%'} bg={'gray.100'}>
        <OrderPage />
      </Box>
    </HStack>
  )
}

export default POSPage
