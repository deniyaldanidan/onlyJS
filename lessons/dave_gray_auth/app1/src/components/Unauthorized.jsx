import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Unauthorized = () => {
  const navigate = useNavigate()
  return (
    <div className="my-box">
      <div className="page-title">Unauthorized</div>
      <div className="page-info">You cant go there</div>
      <Link to="/">To Home Page</Link>
      <Link to="/linkpage">To Link Page</Link>
      <button onClick={()=>navigate(-1)}>Go Back</button>
    </div>
  )
}

export default Unauthorized