// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react' // 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  styles: {
    global: () => ({
      body: {
        fontFamily: '"Roboto", "Noto", sans-serif"'
      }
    })
  }
}

// 3. extend the theme
const theme = extendTheme({ config })

export default theme
