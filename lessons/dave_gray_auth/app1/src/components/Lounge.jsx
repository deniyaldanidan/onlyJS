import React from 'react'
import { Link } from 'react-router-dom'

const Lounge = () => {
  return (
    <div className="my-box">
      <div className="page-title">Lounge Page</div>
      <div className="page-info">Hello Editor or Admin.</div>
      <Link to="/">To Home Page</Link>
    </div>
  )
}

export default Lounge