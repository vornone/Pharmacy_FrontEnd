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
    textStyles: {
      h1: {
        fontSize: '3xl',
        color: 'red'
      },
      h2: {
        fontSize: '2xl'
      },
      h3: {
        fontSize: 'xl'
      }
    },
    breakpoints: {
      sm: '320px',
      md: '768px',
      lg: '960px',
      xl: '1200px'
    },
    tokens: {
      colors: {
        gray: {
          200: '#E2E8F0', // Light gray
          700: '#2D3748' // Dark gray
        },
        red: '#EE0F0F'
      }
    },
    semanticTokens: {
      colors: {
        danger: { value: '{colors.red}' }
      },
      fonts: {
        body: { value: '{Inter, sans-serif}' },
        heading: { value: '{fonts.heading}' }
      },
      borders: {
        light: { value: '{colors.gray.200}' }, // Correct reference
        dark: { value: '{colors.gray.700}' } // Correct reference
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
