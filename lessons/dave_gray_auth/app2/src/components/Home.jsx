import React from 'react'
import {Link} from 'react-router-dom';
import useLogout from '../context/useLogout';

const Home = () => {
  const logout = useLogout()

  return (
    <div className="my-box">
      <div className="page-title">Home</div>
      <p className='page-info'>You are logged in.. </p>
      <Link to="/editor">Go to Editor Page</Link>
      <Link to="/admin">Go to Admin Page</Link>
      <Link to="/lounge">Go to Lounge Page</Link>
      <Link to="/linkpage">Go to LinkPage Page</Link>
      <button onClick={()=> logout()}>Sign Out</button>
    </div>
  )
}

export default Home