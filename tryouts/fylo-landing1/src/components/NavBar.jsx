import React from 'react'
import logo from '../imgs/logo.svg';

const NavBar = () => {
  return (
    <div className='flex justify-between items-center mx-auto px-4 py-16 sm:px-6 md:px-12 xl:px-14'>
        <div>
            <img src={logo} alt="" className='w-3/5 md:w-3/4' />
        </div>
        <div className='flex items-center space-x-6 text-xs text-gray-300 sm:text-base md:space-x-12 md:text-lg xl:text-xl'>
            <a href="/" className='hover:text-white hover:underline'>Features</a>
            <a href="/" className='hover:text-white hover:underline'>Team</a>
            <a href="/" className='hover:text-white hover:underline'>Sign in</a>
        </div>
    </div>
  )
}

export default NavBar