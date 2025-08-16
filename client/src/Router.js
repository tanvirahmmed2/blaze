import React from 'react'
import {Routes, Route} from 'react-router-dom'
import About from './component/About'
import Cart from './component/Cart'
import Register from './component/Register'
import Login from './component/Login'
import Error from './component/Error'


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
