import {
  Grid,
  GridItem,
  HStack,
  Show,
  VStack,
  Flex,
  useColorModeValue,
  OrderedList,
  Heading
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { redirect } from 'react-router-dom'
import MenuBar from '../components/MenuBar'
import ProductGrid from '../components/ProductGrid'
import SearchInput from '../components/SearchInput'
import ProductFilter from '../components/ProductFilter'
import ProductSort from '../components/ProductSort'
import OrderList from '../components/OrderList'
import OrderHeader from '../components/OrderHeader'
import OrderCharge from '../components/OrderCharge'
import { mainData, orderData } from '../data/data'

export default function MainPage() {
  const [orders, setOrders] = useState(orderData)
  const colorGenre = useColorModeValue('gray.50', 'gray.600')
  const colorMainBg = useColorModeValue('white')

  //function
  const addingOrder = (e) => {
    const newOrders = [...orders]
    const existedData = newOrders.some((item) => item.name === e.name)
    if (existedData) {
      newOrders.forEach((item) => {
        if (item.name === e.name && item.orderQuantity < item.stock) {
          item.orderQuantity += 1
          setOrders(newOrders)
        }
      })
    } else {
      newOrders.push(e)
      e.orderQuantity = 1
    }
    setOrders(newOrders)
  }
  return (
    <Grid
      bg={colorMainBg}
      boxSizing="border-box"
      width={'100%'}
      height={'100%'}
      paddingX={'1%'}
      paddingBottom={'1%'}
      templateAreas={{
        base: `"header" "main"`,
        lg: `"header header" "main main"`
      }}
      templateColumns={{
        base: '1fr',
        lg: 'auto 1fr'
      }}
      templateRows={{
        base: 'auto 1fr',
        lg: 'auto 1fr'
      }}
    >
      <GridItem area="header" p={'1%'} borderRadius={'10px'}>
        <Flex flexDirection={'column'} gap={'1%'} width={'100%'} justifyContent={'space-between'}>
          <NavBar></NavBar>
          <MenuBar></MenuBar>
        </Flex>
      </GridItem>
      <GridItem area="main" width={'100%'} height={'82dvh'} borderRadius={'10px'}>
        <HStack width={'100%'} height={'100%'} justifyContent={'space-between'}>
          <VStack
            padding={'1%'}
            bg={colorGenre}
            width={'100%'}
            height={'100%'}
            borderRadius={'10px'}
            justifyContent={'flex-start'}
          >
            <HStack justifyContent={'space-between'} width={'100%'}>
              <SearchInput></SearchInput>
              <ProductSort></ProductSort>
              <ProductFilter></ProductFilter>
            </HStack>
            <ProductGrid data={mainData} addingOrder={addingOrder}></ProductGrid>
          </VStack>
          <VStack
            bg={colorGenre}
            width={'50%'}
            height={'100%'}
            justify={'space-between'}
            borderRadius={'10px'}
            p={'1%'}
          >
            <OrderHeader></OrderHeader>
            <OrderList orderData={orders} setOrderData={setOrders}></OrderList>
            <OrderCharge data={orders}></OrderCharge>
          </VStack>
        </HStack>
      </GridItem>
    </Grid>
  )
}
