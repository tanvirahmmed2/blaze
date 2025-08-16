import React from 'react'
import {Routes, Route} from 'react-router-dom'
import About from './component/About'
import Navbar from './component/Navbar'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/about' element={ <About/>}/>
      </Routes>
    </div>
  )
}

export default App
