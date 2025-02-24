import {
  createSystem,
  defaultBaseConfig,
  defineConfig,
  mergeConfigs,
  defaultConfig
} from '@chakra-ui/react'

// Step 1: Define your custom theme
const customConfig = defineConfig({
  theme: {

    breakpoints: {
      sm: '320px',
      md: '768px',
      lg: '960px',
      xl: '1200px'
    },
    tokens: {
      bgColor: { value: '{colors.gray.200}' },
      borders: {
        light: { value: '{colors.gray.200}' }, // Correct reference
        dark: { value: '{colors.gray.700}' } // Correct reference
      }
    },
    semanticTokens: {
      fonts: {
        body: { value: 'Montserrat' },
        heading: { value: 'Inter' }
      },
      colors: {
        danger: { value: '{colors.red}' }
      },
      fonts: {
        body: { value: '{Inter, sans-serif}' },
        heading: { value: '{fonts.heading}' }
      },
      borders: {
        light: { value: '{colors.gray.200}' },
        dark: { value: '{colors.gray.700}' }
      }
    },
    keyframes: {
      spin: {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' }
      }
    }
  }
})

// Step 2: Merge with the default configuration
const mergedConfig = mergeConfigs(defaultConfig, customConfig)

// Step 3: Create the system
export const system = createSystem(mergedConfig)
