import { Grid, GridItem, HStack, Show, VStack, Flex, useColorModeValue, OrderedList, Heading } from '@chakra-ui/react'
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
import { hello, orderData } from '../data/data'

export default function MainPage() {
  const[orders, setOrders] = useState(orderData)
  const addingOrder = (e) => {
    const newOrders = [...orders]
    newOrders.push(e)
    setOrders(newOrders)
    console.log(orders)
  }

  function deleteOrder(id) {
    const newOrders = [...orders]
    newOrders.splice(id, 1)
    setOrders(newOrders)
  }
  const totalPrice=orders.reduce((acc, cur) => acc + parseFloat(cur.price ), 0).toFixed(2);
  const colorGenre = useColorModeValue('gray.50', 'gray.600')
  return (
    <Grid
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

      <GridItem area="header" p={'1%'} borderRadius={'10px'}  >
        <Flex flexDirection={'column'} gap={'1%'} width={'100%'} justifyContent={'space-between'}>
          <NavBar></NavBar>
          <MenuBar></MenuBar>
        </Flex>
      </GridItem >
      <GridItem area="main" width={'100%'} height={'100%'} maxHeight={'85dvh'} borderRadius={'10px'} >
        <HStack  width={'100%'} height={'100%'} justifyContent={'space-between'}>
          
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
            <ProductGrid data={hello}  addingOrder={addingOrder}></ProductGrid>
          </VStack>
          <VStack 
            bg={colorGenre}
            width={'40%'}
            height={'100%'}
            justify={'space-between'}
            borderRadius={'10px'}
            p={'1%'}
          >
            <OrderHeader></OrderHeader>
            <OrderList data={orders}></OrderList>
            <OrderCharge subTotal={totalPrice}></OrderCharge>
          </VStack>
        </HStack>
      </GridItem>
    </Grid>
  )
}
