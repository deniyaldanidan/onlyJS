import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {basicApi} from "../api/api";
import useAuth from "../context/AuthContext";
import useLogout from "../hooks/useLogout";

const Home = () => {

    const [msg, setMsg] = useState("Hello");
    const {auth} = useAuth();
    const handleLogout = useLogout();

    useEffect(()=>{
        const requestServer = async()=>{
            try {
                const result = await basicApi.get("/");
                // console.log(result);
                setMsg(result.data.message)
            } catch (error) {
                console.log(error);
                setMsg("Hello")
            }
        }
        requestServer();
    }, [])

    return (
        <div>
            <h1>{msg}</h1>
            <div className="links">
                {auth?.accessToken ? (<><Link to="/links" className="mylink" >Links</Link><button onClick={handleLogout} className="mylink" >Logout</button></>) : (<><Link to="/login" className="mylink" >Login</Link><Link to="/register" className="mylink" >Register</Link></>)}
            </div>
        </div>
    )
}

export default Home