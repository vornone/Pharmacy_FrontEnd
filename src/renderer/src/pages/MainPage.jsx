import { Grid, GridItem, HStack, Show, VStack, Flex, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import { redirect } from 'react-router-dom'
import MenuBar from '../components/MenuBar'
import ProductGrid from '../components/ProductGrid'
import SearchInput from '../components/SearchInput'
import ProductFilter from '../components/ProductFilter'
import ProductSort from '../components/ProductSort'

export default function MainPage() {
  const colorGenre = useColorModeValue('gray.50', 'gray.600')
  return (
    <Grid
      boxSizing="border-box"
      width={'100%'}
      height={'100%'}
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
      <GridItem area="header">
        <Flex flexDirection={'column'} gap={'1%'} width={'100%'} paddingX={'1%'}>
          <NavBar></NavBar>
          <MenuBar></MenuBar>
        </Flex>
      </GridItem>
      <GridItem area="main" padding={'1%'} width={'100%'} height={'100%'}>
        <HStack height={'100%'} width={'100%'}>
          <VStack
            bg={colorGenre}
            width={'100%'}
            height={'100%'}
            padding={'1%'}
            borderRadius={'10px'}
          ></VStack>
          <VStack
            bg={colorGenre}
            width={'100%'}
            height={'100%'}
            padding={'1%'}
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
