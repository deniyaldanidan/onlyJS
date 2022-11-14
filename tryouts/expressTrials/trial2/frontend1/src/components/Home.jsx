import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

const Home = () => {

    const [msg, setMsg] = useState("Hello");

    useEffect(()=>{
        const requestServer = async()=>{
            try {
                const result = await api.get("/");
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
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/links">Links</Link>
            </div>
        </div>
    )
}

export default Home