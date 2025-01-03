import { Box} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const ProductContainer = ({ children }) => {
  return (
    <Box
      _hover={{ transform: 'scale(1.05)' }} // Slight zoom on hover
      _active={{ transform: 'scale(0.95)' }} // Shrink on click
      animation={`${fadeIn} 0.4s ease-in-out`} // Smooth fade-in effect
      boxShadow="lg"
      rounded="lg"
      exit={{ opacity: 0, transform: 'translateY(20px)' }}
      transition="transform 0.2s ease"
    >
      {children}
    </Box>
  )
}

export default ProductContainer
