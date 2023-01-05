import { Outlet } from "react-router-dom";
import '../styles/main.scss'
import { TbBulb } from 'react-icons/tb';
import { AiOutlineHome, AiOutlineLogin, AiOutlineLogout, AiOutlinePlusCircle, AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai';
import { BiTestTube } from 'react-icons/bi';
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logoutUser } from "../features/auth/authSlice";

const MainLayout = () => {
    const { isAuth, fullname } = useAppSelector(state => state.auth.data);
    const dispatch = useAppDispatch();

    const logoutHandler = ()=>{
        dispatch(logoutUser())
    }

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
                    {
                        isAuth ? (
                            <div className="info-menu">Hi, {fullname}</div>
                        ) :""
                    }
                    <Link to="/" className="menu" data-info="Home" ><AiOutlineHome /></Link>
                    <Link to="/test-page" data-info="Test" className="menu"><BiTestTube /></Link>
                    {
                        isAuth ?
                            (
                                <>
                                    <Link to="/add-idea" data-info="Add Idea" className="menu"><AiOutlinePlusCircle /></Link>

                                    <Link to="/" className="menu" data-info="Profile" ><AiOutlineUser /></Link>
                                    <div data-info="Logout" className="menu" onClick={logoutHandler} ><AiOutlineLogout /></div>
                                </>
                            )
                            :
                            (
                                <>

                                    <Link to="/signup" className="menu" data-info="Sign Up" ><AiOutlineUserAdd /></Link>
                                    <Link to="/login" data-info="Login" className="menu"><AiOutlineLogin /></Link>
                                </>
                            )
                    }
                </div>
            </nav>
            <div className="app-body">
                <Outlet />
            </div>
            <footer>
                &copy; 2022
                <br />
                All rights reserved
            </footer>
        </div>
    )
}

export default MainLayout;