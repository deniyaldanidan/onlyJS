import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='navbar'>
        <div className="logo">Frame Me</div>
        <div className="menus">
            <Link to="/" className='menu'>Home</Link>
            <Link to="/about" className='menu'>About</Link>
            <Link to="/blogs" className='menu'>Blogs</Link>
            <Link to="/shop" className='menu'>Shop</Link>
        </div>
        <div className="menus">
          <div className="menu">Login</div>
          <div className="menu">Register</div>
        </div>
    </div>
  )
}

export default NavBar