import { Flex } from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';
import { HashRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm';
import { ToastContainer } from 'react-toastify';
import MainPage from './pages/MainPage';
const App = () => {
   return ( 
   <>
  <Flex width={"100dvw"} height={"100dvh"} justifyContent={"center"} alignItems={"center"} >
        <HashRouter>
            <Routes>
                <Route path="/login" element={<LoginForm></LoginForm>}></Route>
                <Route path="/" element={<MainPage></MainPage>}></Route>
            </Routes>
        </HashRouter>
        <ToastContainer />
    </Flex>
    </>
)};

export default App;