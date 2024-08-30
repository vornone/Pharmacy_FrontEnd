import { SimpleGrid } from '@chakra-ui/react'
import React, { useState } from 'react'
import ProductCard from './ProductCard'
import ProductContainer from './ProductContainer'

function ProductGrid({ data, addingOrder
}) {

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 5 }}
      spacing={4}
      width={'100%'}
      maxHeight={'100%'}
      overflowY={'auto'}
      position={'relative'}
      paddingRight={'1%'}
      rowGap={2}
      py={2}
    >
      {data.map((item) => (
        <ProductContainer key={item.id}>
          <ProductCard props={item} evenhandler={()=>addingOrder(item)}/>
        </ProductContainer>
      ))}
    </SimpleGrid>
  )
}

export default ProductGrid
