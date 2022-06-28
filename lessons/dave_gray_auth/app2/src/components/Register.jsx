import React from 'react'
import { useRef, useEffect, useState } from 'react';
import axios from '../api/axios'
import { Link } from 'react-router-dom';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const[validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const[validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const[validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        userRef.current.focus();
    }, [])

    useEffect(()=>{
        if(user){
            const result = USER_REGEX.test(user);
            console.log(result, user);
            setValidName(result);
        }
    }, [user]);

    useEffect(()=>{
        if(pwd){
            const result = PWD_REGEX.test(pwd);
            console.log(result, pwd);
            setValidPwd(result);
        }
        if(matchPwd){
            const match = pwd === matchPwd;
            setValidMatch(match);
        }
    }, [pwd, matchPwd]);

    useEffect(()=>{
        setErrMsg("");
    }, [user, pwd, matchPwd]);

    const handleSubmit = async e=>{
        e.preventDefault();
        //  If Button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if(!v1 || !v2){
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const response = await axios.post("/register", JSON.stringify({user, pwd}), {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });
            console.log(response.data);
            console.log(response);
            setSuccess(true);
            setErrMsg("");
            // clear input fields
        } catch (err) {
            if(!err?.response){
                setErrMsg("No Server Response");
            } else if (err.response?.status === 409){
                setErrMsg("Username is taken");
            } else{
                setErrMsg("Registration Failed");
            }
            errRef.current.focus();
        }
    }
  
    return (
    <>
    {
        success ? <div className="success">Success <Link to="/login"> Login here</Link></div> :
        <section className='my-form'>
            <h1>Register</h1>
            <p ref={errRef} className={`err-msg ${errMsg ? "show" : ""}`} >Error Happened: {errMsg}</p>
            <form onSubmit={handleSubmit} >
                <div className='inp-grp'>
                    <label htmlFor="username" className={`label ${(!validName && user) ? "invalid" : ""}`}>Username</label>
                    <input 
                        type="text" 
                        id='username' 
                        ref={userRef} 
                        onChange={e=>setUser(e.target.value)} 
                        required 
                        placeholder='Username'
                        onFocus={()=>setUserFocus(true)} 
                        onBlur={()=>setUserFocus(false)} 
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        />
                    <p id="uidnote" className={`instructions ${(userFocus && user && !validName) ? "show" :  ""}`} >
                        4 to 24 characters, Must begin with a letter, Letters, numbers, underscores, hyphens are allowed.
                    </p>
                </div>
                <div className='inp-grp'>
                    <label htmlFor="pwd" className={`label ${(!validPwd && pwd) ? "invalid" : ""}`}>Password</label>
                    <input 
                        type="password" 
                        id='pwd'  
                        onChange={e=>setPwd(e.target.value)} 
                        required 
                        placeholder='Password'
                        onFocus={()=>setPwdFocus(true)} 
                        onBlur={()=>setPwdFocus(false)} 
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        />
                    <p id="pwdnote" className={`instructions ${(pwdFocus && pwd && !validPwd) ? "show" :  ""}`} >
                        8 to 24 characters, Must include uppercase and lowercase letters, a number and a special character. Allowed special characters: !@#$%
                    </p>
                </div>
                <div className='inp-grp'>
                    <label htmlFor="match" className={`label ${(!validMatch && matchPwd) ? "invalid" : ""}`}>Confirm Password</label>
                    <input 
                        type="password" 
                        id='match'  
                        onChange={e=>setMatchPwd(e.target.value)} 
                        required 
                        placeholder='retype your password'
                        onFocus={()=>setMatchFocus(true)} 
                        onBlur={()=>setMatchFocus(false)} 
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="matchnote"
                        />
                    <p id="matchnote" className={`instructions ${(matchFocus && matchPwd && !validMatch) ? "show" :  ""}`} >
                        Must Match Password
                    </p>
                </div>

                <button disabled={(validName && validMatch && validPwd) ? false : true} className={`submit-btn`} >Sign Up</button>
            </form>
            <div className="bottom-sec">
                <p>Already Registered?</p>
                <Link to="/login">Login</Link>
            </div>
            <Link to="/linkpage">Go to LinkPage</Link>
        </section>
    }
    </>
    )
}

export default Register