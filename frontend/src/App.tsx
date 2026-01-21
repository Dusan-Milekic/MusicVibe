
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import SearchMusicPage from './pages/SearchMusicPage'
import Library from './pages/Libarary'
function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
      
    
        <Route path="/" Component={LandingPage} ></Route>
        <Route path="/register" Component={RegisterPage}></Route>
        <Route path="/login" Component={LoginPage}></Route>
        <Route path="/dashboard" Component={DashboardPage}></Route>
        <Route path='/search' Component={SearchMusicPage}></Route>
        <Route path='/library' Component={Library}></Route>
      </Routes>
    </BrowserRouter>
     
      
    </>
  )
}

export default App
