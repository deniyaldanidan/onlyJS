import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';
import { basicApi } from '../api/api';
import jwt_decode from 'jwt-decode';
import useAuth from '../context/AuthContext';
import InputSec from './InputSec';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

const Register = () => {

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [match, setMatch] = useState("");

  const [userErr, setUserErr] = useState("");
  const [pwdErr, setPwdErr] = useState("");

  const [validUser, setValidUser] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  const [err, setErr] = useState("");

  useEffect(() => {
    setValidUser(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPwd(validator.isStrongPassword(pwd))
  }, [pwd])

  useEffect(() => {
    setValidMatch(pwd === match)
  }, [pwd, match]);

  useEffect(() => {
    setErr("");
  }, [username, pwd, match])

  const submitHandler = async e => {
    e.preventDefault();
    setErr("");
    setUserErr("");
    setPwdErr("");
    if (!validUser || !validPwd) return setErr("fill out all fields before submission");
    try {
      const result = await basicApi.post("/register", { user: username, pwd }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });
      console.log(result.data);
      const accessToken = result.data.accessToken;
      const roles = jwt_decode(accessToken)?.userInfo?.roles;
      console.log(roles);
      setAuth({ username, roles, accessToken });
      setUsername("");
      setPwd("");
      setMatch("");
      navigate("/", { replace: true });
      return;
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 409) {
        const errObj = error.response?.data?.errors;
        console.log(errObj);
        errObj?.username && setUserErr(errObj.username);
        errObj?.password && setPwdErr(errObj.password);
        return;
      }
      if (error?.response?.status === 404) {
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
        <InputSec
          inputId="username"
          value={username}
          setValue={setUsername}
          valid={validUser}
          focusOnStart={true}
          err={userErr}
          label="Username"
          placeholder="username"
          info={() => (
            <>
              <span>Username should only contain Alphabets A-Z a-z, Numbers 0-9 and Characters -_</span>
              <span>Username should contain atleast 4 characters</span>
              <span>Username should not exceed 23 characters</span>
            </>
          )}
        />
        <InputSec
          inputId="password"
          value={pwd}
          setValue={setPwd}
          inputType='password'
          valid={validPwd}
          err={pwdErr}
          label="Password"
          placeholder="password"
          info={() => (
            <>
              <span>Password should contain atleast one Alphabet (both uppercase and lowercase), one Number 0-9 and one Special Character</span>
              <span>Password should contain atleast 8 characters</span>
            </>
          )}
        />
        <InputSec
          inputId="match"
          value={match}
          setValue={setMatch}
          inputType='password'
          valid={validMatch}
          label="Confirm Password"
          placeholder="Re-Type the password here"
          hasError={false}
          hasInfo={false}
        />
        <button type='submit'>Register</button>
      </form>
      <div className="info">
        Already Registered? <Link to="/login">Login Here</Link>
      </div>
    </div>
  )
}

export default Register