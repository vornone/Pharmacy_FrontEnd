import { Flex } from '@chakra-ui/react'
import 'react-toastify/dist/ReactToastify.css'
import { HashRouter } from 'react-router-dom'
import { Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from './pages/mainpage/Layout'
import { useNavigate } from 'react-router-dom'
import NewLoginForm from './pages/UserManagement/Login/NewLoginForm'
import { useState } from 'react'
import './index.css'
const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
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
                <Routes>
                  <Route
                    path="/*"
                    element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="/login"
                    element={
                      isAuthenticated ? (
                        <Navigate to="/*" />
                      ) : (
                        <NewLoginForm onLogin={handleLoginSuccess} />
                      )
                    }
                  />
                </Routes>
              </HashRouter>
        <ToastContainer />
      </Flex>
    </>
  )
}

export default App
