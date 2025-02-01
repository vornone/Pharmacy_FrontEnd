import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    fonts: {
      heading: `'Poppins', sans-serif`,
      body: `'Poppins', sans-serif`,
  
    },
    global: {

      // Global body styling

      // Global scrollbar styling
      '::-webkit-scrollbar': {
        width: '8px' // Scrollbar width
      },
      '::-webkit-scrollbar-thumb': {
        background: 'green.500' // Thumb color
      },
      '::-webkit-scrollbar-track': {
        background: 'gray.200' // Track color
      },

      // Global link styling
      a: {
        color: 'green.500', // Link color
        textDecoration: 'none', // Remove underline
        _hover: {
          textDecoration: 'underline' // Underline on hover
        }
      }

      // Other global styles...
    }
  }
})

export default theme
