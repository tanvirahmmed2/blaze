import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full bg-green-500 text-white py-6 flex flex-col md:flex-row gap-4 items-center justify-center'>
        <form           className='w-auto rounded-xl flex flex-col items-center justify-center border-2  gap-2 p-4'>
            <label htmlFor="subscribe" >subscribe</label>
            <input type="text" name='subscribe' id='subscribe' placeholder='enter your email' className='border-2 outline-none py-2 px-4 rounded-lg'/>
            <button type='submit' className='border-2 px-2 rounded-lg'>Subscribe</button>
        </form>
        <div>
            <p className='w-auto flex flex-row'>Copyright by @ <a href="https://tanvirahmmed.netlify.app">Tanvir Ahmmed</a></p>

        </div>
    </footer>
  )
}

export default Footer
