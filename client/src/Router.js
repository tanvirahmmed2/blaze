import React from 'react'
import {Routes, Route} from 'react-router-dom'
import About from './pages/About'
import Cart from './pages/Cart'
import Register from './pages/Register'
import Login from './pages/Login'
import Error from './pages/Error'


const Router = () => {
  return (
    <Routes>
        <Route path='/about' element={ <About/>}/>
        <Route path='/register' element={ <Register/>}/>
        <Route path='/login' element={ <Login/>}/>
        <Route path='/cart' element={ <Cart/>}/>
        <Route path='/*' element={ <Error/>}/>
      </Routes>
  )
}

export default Router
