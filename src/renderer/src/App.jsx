import { Flex } from '@chakra-ui/react'
import 'react-toastify/dist/ReactToastify.css'
import { HashRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from './pages/mainpage/Layout'
import NewLoginForm from './pages/UserManagement/Login/NewLoginForm'
import { useState } from 'react'
import './index.css'
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('token') !== null 
  )
  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    navigate('/') // Navigate to home page after login
  }
  return (
    <>
      <Flex
        width={'100dvw'}
        height={'100dvh'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <HashRouter>
          <Layout></Layout>
        </HashRouter>
        <ToastContainer />
      </Flex>
    </>
  )
}

export default App
