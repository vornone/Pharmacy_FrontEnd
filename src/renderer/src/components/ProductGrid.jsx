import { SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import ProductCard from './ProductCard'
import ProductContainer from './ProductContainer'

function ProductGrid() {
  const skeleton = []
  const data = []
  for (let i = 0; i < 20; i++) {
    skeleton.push(i)
    data.push({
      id: `${Math.random().toFixed(0)}`,
      price: `${(Math.random() * 11).toFixed(2)}`,
      name: `Product ${i + 1}`,
      image: 'src',
      stock: `${(Math.random() * 100).toFixed(0)}`
    })
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
    >
      {skeleton.map((item) => (
        <ProductContainer key={item}>
          <ProductCard {...data[item]} />
        </ProductContainer>
      ))}
    </SimpleGrid>
  )
}

export default ProductGrid
