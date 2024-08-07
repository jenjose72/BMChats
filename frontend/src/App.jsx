import { useState } from 'react'
import {Navigate,Route,Routes} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login/Login.jsx'
import Signup from './pages/signup/SignUp.jsx'
import Home from './pages/home/Home.jsx'
import { Toaster } from'react-hot-toast'
import { useAuthContext } from './context/AuthContext.jsx'
function App() {
  const {authUser}=useAuthContext()

  return (
    <div className=" h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={authUser?<Home />:<Navigate to='/login'/>}/>
        <Route path="/login" element={authUser?<Navigate to='/'/>:<Login />} />
        <Route path="/signup" element={authUser?<Navigate to='/'/>:<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
