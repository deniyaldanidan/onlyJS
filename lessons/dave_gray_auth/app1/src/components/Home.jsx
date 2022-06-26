import React from 'react'
import {Link} from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../context/AuthProvider';

const Home = () => {
  const {setAuth} = useAuth();

  const signoutHandler = async()=>{
    try {
      const response = await axios.get("/logout", {
        withCredentials: true
      });
      console.log(response);
      setAuth({});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="my-box">
      <div className="page-title">Home</div>
      <p className='page-info'>You are logged in.. </p>
      <Link to="/editor">Go to Editor Page</Link>
      <Link to="/admin">Go to Admin Page</Link>
      <Link to="/lounge">Go to Lounge Page</Link>
      <Link to="/linkpage">Go to LinkPage Page</Link>
      <button onClick={signoutHandler}>Sign Out</button>
    </div>
  )
}

export default Home