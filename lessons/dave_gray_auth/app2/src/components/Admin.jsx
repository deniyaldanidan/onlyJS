import React from 'react'
import { Link } from 'react-router-dom';
import Users from './Users';

const Admin = () => {
  return (
    <div className="my-box">
      <div className="page-title">Admin Page</div>
      <div className="my-list">
        <Users />
      </div>
      <Link to="/">To Home Page</Link>
    </div>
  )
}

export default Admin