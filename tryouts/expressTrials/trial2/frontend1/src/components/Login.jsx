import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import { basicApi } from '../api/api';
import jwt_decode from 'jwt-decode';
import useAuth from '../context/AuthContext';
import InputSec from './InputSec';

const Login = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {setAuth} = useAuth();
  
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  const [err, setErr] = useState("");

  useEffect(()=>{
    setErr("");
  }, [username, pwd])

  const submitHandler = async e=>{
    e.preventDefault();
    setErr("");
    if (!username || !pwd) return setErr("fill out all fields before submission");
    try {
      const result = await basicApi.post("/login", {user:username, pwd}, {
        headers: {"Content-Type": "application/json"},
        withCredentials: true
      });
      console.log(result.data);
      const accessToken = result.data.accessToken;
      const roles = jwt_decode(accessToken)?.userInfo?.roles;
      console.log(roles);
      setAuth({username, roles, accessToken});
      setUsername("");
      setPwd("");
      return navigate(from, {replace:true});
    } catch (error) {
      console.log(error);
      if (error?.response?.status===404){
        error?.response?.data?.error ? setErr(error.response.data.error) : setErr("Error Happened");
        return;
      }
      return setErr("Error Happened")
    }
  }

  return (
    <div className='my-form'>
      <h1>Login</h1>
      <p className="main-error">{err}</p>
      <form onSubmit={submitHandler}>
        <InputSec
          inputId="username"
          value={username}
          setValue={setUsername}
          focusOnStart={true}
          label="Username"
          placeholder="Username"
          hasError={false}
          hasInfo={false}
          hasValidIcon={false}
        />
        <InputSec
          inputId="password"
          value={pwd}
          setValue={setPwd}
          inputType="password"
          label="Password"
          placeholder="Password"
          hasError={false}
          hasInfo={false}
          hasValidIcon={false}
        />
        <button type='submit'>Login</button>
      </form>
      <div className="info">
        Don't have an account YET? <Link to="/register">Register Here</Link>
      </div>
    </div>
  )
}

export default Login;