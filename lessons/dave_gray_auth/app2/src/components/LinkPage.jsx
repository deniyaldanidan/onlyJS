import React from 'react'
import { Link } from 'react-router-dom'

const LinkPage = () => {
  return (
    <div className="my-box">
      <div className="page-title">Link Page</div>
      <div className="links-sec">
        <div className="sec-title">Public Pages</div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
      <div className="links-sec">
        <div className="sec-title">Private Pages</div>
        <Link to="/">Home</Link>
        <Link to="/editor">Editor's Page</Link>
        <Link to="/admin">Admin's Page</Link>
        <Link to="/lounge">Lounge</Link>
      </div>
    </div>
  )
}

export default LinkPage