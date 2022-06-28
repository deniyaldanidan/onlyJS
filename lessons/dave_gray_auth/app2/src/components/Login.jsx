import React, {useState, useEffect, useRef} from 'react'
import axios from '../api/axios';
import useAuth from '../context/AuthProvider';
import {Link, useNavigate, useLocation} from 'react-router-dom';

const Login = () => {
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");

    const [errMsg, setErrMsg] = useState("");


    useEffect(()=>{
        userRef.current.focus();
    }, [])

    useEffect(()=>{
        setErrMsg("");
    }, [user, pwd])

    const submitHandler = async (e)=>{
        e.preventDefault();
        if(!user || !pwd) return setErrMsg("Please Fill all spaces");

        try {
            const response = await axios.post("/auth", JSON.stringify({user, pwd}), {
                headers: {'Content-Type' : 'application/json'},
                withCredentials: true
            });
            console.log(response?.data);
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({user, pwd, roles, accessToken});
            setUser("");
            setPwd("");
            navigate(from, {replace:true});
        } catch (err) {
            if(!err?.response){
                setErrMsg("No server response");
            } else if( err.response?.status === 400 ){
                setErrMsg("Invalid Entry");
            } else if(err.response?.status === 401){
                setErrMsg("Invalid Credentials");
            } else{
                setErrMsg("Login Failed");
            }
            errRef.current.focus();
        }
    }

    return (
        <section className="my-form">
            <p ref={errRef} className={`err-msg ${errMsg ? 'show' : ''}`}>{errMsg}</p>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div className="inp-grp">
                    <label htmlFor="username" className='label'>Username</label>
                    <input ref={userRef} type="text" id='username' value={user} onChange={e=>setUser(e.target.value)} />
                </div>
                <div className="inp-grp">
                    <label htmlFor="pwd" className='label'>Password</label>
                    <input type="password" id='pwd' value={pwd} onChange={e=>setPwd(e.target.value)} />
                </div>
                <button className='submit-btn'>Login</button>
            </form>
            <div className="bottom-sec">
                <p>Don't have an account yet? </p>
                <Link to="/register">Register</Link>
            </div>
            <Link to="/linkpage">Go to LinkPage</Link>
        </section>
    )
}

export default Login