import React from 'react'

const Navbar = () => {
  return (
    <div className='flex bg-black text-white p-2 flex-row w-full gap-6 items-center justify-center'>
        <a href="/">Home</a>
        <a href="/register">Registration</a>
        <a href="/login">Log in</a>
        <a href="/logout">Log Out</a>
        <a href="/about">About</a>
        <a href="/cart">Cart</a>


    </div>
  )
}

export default Navbar
