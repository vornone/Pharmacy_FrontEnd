import { Grid, GridItem, HStack, Show, VStack, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import { redirect } from 'react-router-dom'
import MenuBar from '../components/MenuBar'
export default function MainPage() {
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
          <Flex bg={'gray.700'} height={'100%'} width={'100%'}></Flex>
          <Flex bg={'gray.700'} height={'100%'} width={'100%'}></Flex>
        </HStack>
      </GridItem>
    </Grid>
  )
}
