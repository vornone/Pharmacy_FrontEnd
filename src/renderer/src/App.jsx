import { Flex } from '@chakra-ui/react'
import 'react-toastify/dist/ReactToastify.css'
import { HashRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AdminPage from './../components/admin/AdminPage';
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
            <Route path="/" element={<AdminPage />}></Route>
          </Routes>
        </HashRouter>
        <ToastContainer />
      </Flex>
    </>
  )
}

export default App
