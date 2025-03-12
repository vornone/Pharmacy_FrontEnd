import React from 'react'
import ProductGrid from '@/renderer/src/components/productGrid/ProductGrid'
import OrderPage from '@/renderer/src/components/orderGrid/OrderPage'
import { Flex, Box, HStack } from '@chakra-ui/react'
import AppRoutes from '../../AppRoutes'
const MainPage = () => {
  return (
    <Flex w={'100%'} h={'100%'}>
      <AppRoutes />
    </Flex>
  )
}

export default React.memo(MainPage);
