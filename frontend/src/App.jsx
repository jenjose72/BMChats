import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login/Login.jsx'
import Signup from './pages/signup/SignUp.jsx'
import Home from './pages/home/Home.jsx'

function App() {

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Home/>
    </div>
  )
}

export default App
