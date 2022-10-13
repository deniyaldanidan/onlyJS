import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';
import './nav2.scss';


const Nav2 = ()=>{
    const [navState, setNavState] = useState(false);

    return (
        <div className='nav2'>
            <Header navTogg={()=>setNavState(prev=>!prev)} />
            <div className="body" style={{display:"flex", gap:0}}>
                <SideBar navState={navState} />
                <Outlet />
            </div>
        </div>
    )
}

export default Nav2;