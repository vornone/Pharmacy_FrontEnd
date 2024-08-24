import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { HashRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme'
import LoginForm from './components/LoginForm'
import { Flex } from '@chakra-ui/react'
import App from './App'
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode}/>

        <App></App>

      <ToastContainer />
    </ChakraProvider>
    
  </React.StrictMode>


  </>
)
