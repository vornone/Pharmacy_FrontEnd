import { Grid, GridItem, HStack, Show, VStack, Flex, useColorModeValue, OrderedList } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import { redirect } from 'react-router-dom'
import MenuBar from '../components/MenuBar'
import ProductGrid from '../components/ProductGrid'
import SearchInput from '../components/SearchInput'
import ProductFilter from '../components/ProductFilter'
import ProductSort from '../components/ProductSort'
import OrderList from '../components/OrderList'

export default function MainPage() {
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
      gap={'2%'}
    >
      <GridItem area="header"  >
        <Flex flexDirection={'column'} gap={'1%'} width={'100%'}>
          <NavBar></NavBar>
          <MenuBar></MenuBar>
        </Flex>
      </GridItem >
      <GridItem area="main" width={'100%'} height={'100%'} maxHeight={'85dvh'} borderRadius={'10px'} >
        <HStack  width={'100%'} height={'100%'} justifyContent={'space-between'}>
          <VStack 
            bg={colorGenre}
            width={'50%'}
            height={'100%'}
            justify={'space-between'}
            borderRadius={'10px'}
            p={'1%'}
          >
            <OrderList></OrderList>
          </VStack>
          <VStack
            padding={'1%'}
            bg={colorGenre}
            width={'100%'}
            height={'100%'}
            borderRadius={'10px'}
          >
            <HStack justifyContent={'space-between'} width={'100%'}>
              <SearchInput></SearchInput>
              <ProductSort></ProductSort>
              <ProductFilter></ProductFilter>
            </HStack>
            <ProductGrid></ProductGrid>
          </VStack>
        </HStack>
      </GridItem>
    </Grid>
  )
}
