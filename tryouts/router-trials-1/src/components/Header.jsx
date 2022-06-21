import React from 'react'
import {Link} from 'react-router-dom'


const Header = () => {
  return (
    <div className="header">
        <Link className="logo" to="/" >Routing</Link>
        <div className="menu">
            <Link to="/">Home</Link>
            <Link to="/todo">Todos</Link>
            <Link to="/about">About</Link>
            <Link to="/faq" >FAQ</Link>
        </div>
    </div>
  )
}

export default Header