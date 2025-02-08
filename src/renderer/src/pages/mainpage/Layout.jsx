import React from 'react'
import { Grid, GridItem, Text, Flex } from '@chakra-ui/react'
import Header from './Header'
import MainPage from './MainPage'
function Layout() {
  return (
  <>
    <Grid

    boxSizing={'border-box'}  
    gap={5}
    p={5}
      h={'100%'}
      w={'100%'} 
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
      }}>
        {/* <GridItem as={'header'} area={'header'} h={'25%'}><Header /></GridItem> */}
        <GridItem area={'main'} h={'100%'} w={'100%'}><MainPage /></GridItem>
    </Grid>
    </>
  )
}

export default Layout