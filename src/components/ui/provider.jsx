'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'
import { system } from '@/renderer/src/theme'
export function Provider(props) {
  return (
    <ChakraProvider value={{ ...defaultSystem, ...system }}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
