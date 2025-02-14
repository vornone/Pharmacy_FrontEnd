import React from 'react'
import ProductGrid from '@/renderer/components/productGrid/ProductGrid'
import OrderPage from '@/renderer/components/orderGrid/OrderPage'
import { Flex, Box, HStack } from '@chakra-ui/react'
import AppRoutes from '../../AppRoutes'
const MainPage = () => {
  return (
    <HStack w={'100%'} h={'100%'}>
      <AppRoutes />
    </HStack>
  )
}

export default MainPage
