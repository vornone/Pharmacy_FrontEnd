import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.min.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './store.js'
import {Provider as ChakraMainProvider}   from '@/components/ui/provider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <React.StrictMode>
      <Provider store={store}>
          <ChakraMainProvider>
            <App />
          </ChakraMainProvider>
      </Provider>
    </React.StrictMode>
  </>
)
