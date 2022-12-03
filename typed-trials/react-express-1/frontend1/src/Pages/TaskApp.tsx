// import {} from 'react'

import { Link, Outlet } from "react-router-dom";
import {AiOutlineHome, AiOutlinePlus, AiOutlineLogin, AiOutlineLogout, AiOutlineUserAdd } from 'react-icons/ai';


const TaskApp = ():JSX.Element => {


    return (
        <div className="task-app">
            <div className="app-header">
                <div className="app-logo">My Tasks</div>
                <div className="header-menus">
                    <Link to="/" className="h-m-i"><AiOutlineHome/></Link>
                    <Link to="/add" className="h-m-i"><AiOutlinePlus/></Link>
                    <Link to="/register" className="h-m-i"><AiOutlineUserAdd/></Link>
                    <Link to="/login" className="h-m-i"><AiOutlineLogin/></Link>
                    <Link to="/register" className="h-m-i"><AiOutlineLogout/></Link>
                </div>
            </div>
            <div className="app-body">
                <Outlet/>
            </div>
        </div>
    )
}

export default TaskApp;