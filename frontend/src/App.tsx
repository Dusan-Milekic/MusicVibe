
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
      
    
        <Route path="/" Component={LandingPage} ></Route>
        <Route path="/register" Component={RegisterPage}></Route>
        <Route path="/login" Component={LoginPage}></Route>
      </Routes>
    </BrowserRouter>
     
      
    </>
  )
}

export default App
