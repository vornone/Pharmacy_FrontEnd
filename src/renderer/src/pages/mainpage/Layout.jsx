import React from 'react'
import { Grid, GridItem, VStack } from '@chakra-ui/react'
import Header from './Header'
import MainPage from './MainPage'
import Sidebar from './SideBar'
import { ColorModeProvider, useColorMode, useColorModeValue } from '@/components/ui/color-mode'
function Layout() {
  return (
    <VStack height="100vh" width="100vw">
      <Header w="100%" />
      <Grid
        width="100%"
        boxSizing="border-box"
        overflow="hidden"
        margin={0}
        templateColumns={{
          base: '1fr',
          lg: '60px 1fr'
        }}
        templateRows={{
          base: 'auto 1fr',
          lg: 'auto 1fr'
        }}
        templateAreas={{
          base: `"header"
               "nav"
               "main"`,
          lg: `"header header"
             "nav main"`
        }}
        borderTop={'1px solid'}
        borderTopColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <GridItem area="nav" minH={{ base: 'auto', lg: '100%' }} zIndex={2}>
          <Sidebar />
        </GridItem>
        <GridItem area="main" minH={{ base: 'auto', lg: '100%' }} w="100%" overflow="auto" p={5}>
          <MainPage />
        </GridItem>
      </Grid>
    </VStack>
  )
}

export default Layout
