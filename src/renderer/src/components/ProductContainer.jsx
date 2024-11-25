import React from 'react'
import { Box } from '@chakra-ui/react'
function ProductContainer({ children }) {
  return (
    <Box
      width="100%"
      borderRadius={10}
      overflow={'hidden'}
      shadow={'md'}
      height={'100%'}
    >
      {children}
    </Box>
  )
}

export default ProductContainer
