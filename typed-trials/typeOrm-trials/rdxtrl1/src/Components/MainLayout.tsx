import { Outlet } from "react-router-dom";
import '../styles/main.scss'
import { TbBulb } from 'react-icons/tb';
import { AiOutlineHome, AiOutlineLogin, AiOutlineLogout, AiOutlinePlusCircle, AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai';
import { Link } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="app">
            <nav>
                <div className="logo">
                    <TbBulb />
                    <span>
                        Ideas
                    </span>
                </div>
                <div className="menus">
                    <Link to="/" className="menu" data-info="Home" ><AiOutlineHome /></Link>
                    <Link to="/add-idea" data-info="Add Idea" className="menu"><AiOutlinePlusCircle /></Link>
                    <Link to="/" className="menu" data-info="Profile" ><AiOutlineUser /></Link>
                    <Link to="/" className="menu" data-info="Sign Up" ><AiOutlineUserAdd /></Link>
                    <Link to="/" data-info="Login" className="menu"><AiOutlineLogin /></Link>
                    <Link to="/" data-info="Logout" className="menu"><AiOutlineLogout /></Link>
                </div>
            </nav>
            <div className="app-body">
                <Outlet />
            </div>
            <footer>
                &copy; 2022
                <br/>
                All rights reserved
            </footer>
        </div>
    )
}

export default MainLayout;