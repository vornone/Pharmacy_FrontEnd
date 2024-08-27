import { SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import ProductCard from './ProductCard'
import ProductContainer from './ProductContainer'


function ProductGrid({ data}) {
  const hello = (e) => {
    alert(e.name)
  }
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 4 }}
      spacing={4}
      width={'100%'}
      height={'100%'}
      overflowY={'auto'}
      position={'relative'}
      paddingRight={'1%'}
      rowGap={2}
    >
      {data.map((item) => (
        <ProductContainer key={item.name}>
          <ProductCard props={item} evenhandler={()=>hello(item)}/>
        </ProductContainer>
      ))}
    </SimpleGrid>
  )
}

export default ProductGrid
