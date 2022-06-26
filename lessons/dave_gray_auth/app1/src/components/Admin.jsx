import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <div className="my-box">
      <div className="page-title">Admin Page</div>
      <div className="page-info">Hello Admin.</div>
      <Link to="/">To Home Page</Link>
    </div>
  )
}

export default Admin