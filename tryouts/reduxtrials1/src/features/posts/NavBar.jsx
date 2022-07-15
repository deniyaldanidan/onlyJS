import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {fetchNotifications} from '../notifications/notificationsSlice';

const NavBar = () => {

  const dispatch = useDispatch()
  const fetchNewNotifs = ()=>dispatch(fetchNotifications())

  
  return (
    <div className='nav'>
        <div className="logo">PostMe</div>
        <div className="menu">
            <Link to="/">Home</Link>
            <Link to="/add">Add</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifs">Notifs</Link>
        </div>
        <div>
          <button onClick={fetchNewNotifs} >Refresh Notifs</button>
        </div>
    </div>
  )
}

export default NavBar