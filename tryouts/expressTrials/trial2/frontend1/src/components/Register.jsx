import React, {useState, useEffect, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import validator from 'validator';
import {MdClose, MdCheck} from 'react-icons/md';
import { basicApi } from '../api/api';
import jwt_decode from 'jwt-decode';
import useAuth from '../context/AuthContext';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

const Register = () => {

  const navigate = useNavigate();
  const {setAuth} = useAuth();
  const userRef = useRef();
  
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [match, setMatch] = useState("");

  const [userErr, setUserErr] = useState("");
  const [pwdErr, setPwdErr] = useState("");

  const [validUser, setValidUser] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  const [userFocus, setUserFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [err, setErr] = useState("");

  useEffect(()=>{
    userRef.current.focus();
  }, []);

  useEffect(()=>{
    setValidUser(USER_REGEX.test(username))
  }, [username])

  useEffect(()=>{
    setValidPwd(validator.isStrongPassword(pwd))
  }, [pwd])

  useEffect(()=>{
    setValidMatch(pwd===match)
  }, [pwd, match]);

  useEffect(()=>{
    setErr("");
  }, [username, pwd, match])

  const submitHandler = async e=>{
    e.preventDefault();
    setErr("");
    setUserErr("");
    setPwdErr("");
    if (!username || !pwd) return setErr("fill out all fields before submission");
    try {
      const result = await basicApi.post("/register", {user:username, pwd}, {
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
      setMatch("");
      navigate("/", {replace:true});
      return;
    } catch (error) {
      console.log(error);
      if (error?.response?.status===409){
        const errObj = error.response?.data?.errors;
        console.log(errObj);
        errObj?.username && setUserErr(errObj.username);
        errObj?.password && setPwdErr(errObj.password);
        return;
      }
      if (error?.response?.status===404){
        error?.response?.data?.error ? setErr(error.response.data.error) : setErr("Error Happened");
        return;
      }
      return setErr("Error Happened")
    }
  }

  return (
    <div className='my-form'>
      <h1>Register</h1>
      <p className="main-error">{err}</p>
      <form onSubmit={submitHandler}>
        <div className="input-sec">
          <label htmlFor="username">
            <span>Username</span> 
            {username ? <span>{validUser ? <MdCheck className='icon' /> : <MdClose className='icon invalid' /> } </span> : ""}
          </label>
          <input ref={userRef} type="text" id='username' placeholder='username' value={username} required onChange={e=>setUsername(e.target.value)} onFocus={()=>setUserFocus(true)} onBlur={()=>setUserFocus(false)} />
          <p className="input-error">{userErr}</p>
          { (!validUser && userFocus && username) ? <div className="input-info">
            <span>Username should only contain Alphabets A-Z a-z, Numbers 0-9 and Characters -_</span>
            <span>Username should contain atleast 4 characters</span>
            <span>Username should not exceed 23 characters</span>
          </div> : "" }
        </div>
        <div className="input-sec">
          <label htmlFor="password">
            <span>Password</span>
            {pwd ? <span>{validPwd ? <MdCheck className='icon' /> : <MdClose className='icon invalid' /> } </span> : ""}
          </label>
          <input type="password" id='password' required placeholder='password' value={pwd} onChange={e=>setPwd(e.target.value)} onFocus={()=>setPwdFocus(true)} onBlur={()=>setPwdFocus(false)} />
          <p className="input-error">{pwdErr}</p>
          { (!validPwd && pwdFocus) ? <div className="input-info">
            <span>Password should contain atleast one Alphabet (both uppercase and lowercase), one Number 0-9 and one Special Character</span>
            <span>Password should contain atleast 8 characters</span>
          </div> : "" }
        </div>
        <div className="input-sec">
          <label htmlFor="match">
            <span>Confirm Password</span>
            {match ? <span>{validMatch ? <MdCheck className='icon' /> : <MdClose className='icon invalid' /> } </span> : ""}
          </label>
          <input type="password" id='match' required placeholder='Re-Type the password here' value={match} onChange={e=>setMatch(e.target.value)}/>
        </div>
        <button type='submit'>Register</button>
      </form>
      <div className="info">
        Already Registered? <Link to="/login">Login Here</Link>
      </div>
    </div>
  )
}

export default Register