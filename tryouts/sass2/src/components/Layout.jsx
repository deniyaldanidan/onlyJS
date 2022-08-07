import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer/Footer'
import Header from './Header/Header'

const Layout = () => {
  return (
    <>
    <Header />
    <div style={{height:"500px"}}></div>
        <Outlet/>
    <Footer />
    </>
  )
}

export default Layout