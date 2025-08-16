import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row w-full gap-6 items-center justify-center'>
        <a href="/">Home</a>
        <a href="/register">Registration</a>
        <a href="/login">Log in</a>
        <a href="/logout">Log Out</a>


    </div>
  )
}

export default Navbar
