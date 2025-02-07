import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  },
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: 'dist/main'
    },
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'electron/main/index.js')
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: 'dist/preload'
    },
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'electron/preload/index.js')
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  },
  renderer: {
    build: {
      outDir: 'dist/renderer'
    },
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'electron/renderer/index.js')
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
})
