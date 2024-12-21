import { Flex, Spinner, Text, Toast, useToast } from '@chakra-ui/react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoginForm from './pages/UserManagement/Login/LoginForm.jsx'
import MainPage from './pages/MainPage.jsx'
import { useEffect, useState } from 'react'
import { serverUrl } from './api-clients/api-clients.js'

const App = () => {
  const toast = useToast()
  const [isServerRunning, setIsServerRunning] = useState('loading')
  const [initialLoad, setInitialLoad] = useState(true) // Track initial loading state
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('token') !== null // Check for a token in localStorage on app load
  )

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch(serverUrl + '/status', {
          signal: new AbortController().signal
        })
        if (response.ok) {
          setIsServerRunning('online')
        } else {
          setIsServerRunning('offline')
        }
      } catch (error) {
        console.error('Error checking server status:', error)
        setIsServerRunning('offline')
      } finally {
        setInitialLoad(false) // Initial loading is complete
      }
    }

    checkServerStatus() // Initial check

    const interval = setInterval(() => {
      checkServerStatus() // Check server without resetting loading state
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isServerRunning === 'online') {
      toast.closeAll()
      toast({
        title: 'Server is running',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    }
  }, [isServerRunning, toast])

  return (
    <Flex
      width={'100dvw'}
      height={'100dvh'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
    >
      {initialLoad ? (
        <>
          <Toast title="Server is loading" status="loading" duration={3000} />
        </>
      ) : isServerRunning === 'offline' ? (
        <Toast title="Server is offline" status="error" duration={3000} />
      ) : (
        <HashRouter>
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : (
                  <LoginForm
                    onLogin={() => {
                      setIsAuthenticated(true)
                    }}
                  />
                )
              }
            />
            <Route
              path="/"
              element={isAuthenticated ? <MainPage /> : <Navigate to="/login" replace />}
            />
          </Routes>
        </HashRouter>
      )}
      <ToastContainer />
    </Flex>
  )
}

export default App
