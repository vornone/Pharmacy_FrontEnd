import React from 'react'
import { Box } from '@chakra-ui/react'
function ProductContainer({ children }) {
  return (
    <Box width="100%" height="175px" borderRadius={10} overflow={'hidden'} shadow={'md'}>
      {children}
    </Box>
  )
}

export default ProductContainer
