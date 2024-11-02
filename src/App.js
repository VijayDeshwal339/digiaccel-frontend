import React from 'react'
import OnBoarding from './pages/OnBoarding'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Addtask from './pages/Addtask'
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
   <BrowserRouter>
   <Toaster/>
    <Routes>
      <Route path='/' element={<OnBoarding/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/add' element={<Addtask/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App