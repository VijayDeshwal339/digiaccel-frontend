import React from 'react'
import OnBoarding from './pages/OnBoarding'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Addtask from './pages/Addtask'

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<OnBoarding/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/add' element={<Addtask/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App