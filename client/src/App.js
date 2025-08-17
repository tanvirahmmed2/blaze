import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './layouts/Navbar'
import Router from './Router'
import Footer from './layouts/Footer'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Router/>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
