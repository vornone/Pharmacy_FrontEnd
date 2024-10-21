import { Flex } from '@chakra-ui/react'
import 'react-toastify/dist/ReactToastify.css'
import { HashRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import LoginForm from './pages/UserManagement/Login/LoginForm.jsx'
import { ToastContainer } from 'react-toastify'
import MainPage from './pages/MainPage.jsx'
import TestAPI from './components/test-component/TestAPI.jsx'
const App = () => {
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
            <Route path="/login" element={<LoginForm></LoginForm>}></Route>
            <Route path="/" element={<TestAPI></TestAPI>}></Route>
          </Routes>
        </HashRouter>
        <ToastContainer />
      </Flex>
    </>
  )
}

export default App
