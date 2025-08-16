import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex bg-green-600 text-white p-2 flex-row w-full gap-6 items-center justify-center'>
        <Link to="/">Home</Link>
        <Link to="/register">Registration</Link>
        <Link to="/login">Log in</Link>
        <Link to="/logout">Log Out</Link>
        <Link to="/about">About</Link>
        <Link to="/cart">Cart</Link>


    </div>
  )
}

export default Navbar
