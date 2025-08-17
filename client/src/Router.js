import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Cart from './pages/Cart'
import Register from './pages/Register'
import Login from './pages/Login'
import Error from './pages/Error'
import Home from './pages/Home'


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
