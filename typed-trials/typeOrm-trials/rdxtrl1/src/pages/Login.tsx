import { FormEventHandler, useEffect, useState } from 'react';
import '../styles/my-form.scss';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { authUser, resetStatusNError, setError } from '../features/auth/authSlice';
import {useAppDispatch, useAppSelector} from '../app/hooks';


const Login = ():JSX.Element=>{
    const dispatch = useAppDispatch();
    const {status, error, data} = useAppSelector(state=>state.auth);
    const [unameOrEmail, setUnameOrEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [pwdTogg, setPwdTogg] = useState<boolean>(false);
    const navigate = useNavigate();
    
    useEffect(()=>{
        return ()=>{
            dispatch(resetStatusNError())
        }
    }, [dispatch]);

    useEffect(()=>{
        if (status === "completed" && data.isAuth){
            navigate("/test-page")
        }
    }, [status, data.isAuth, navigate])
    
    const submitHandler:FormEventHandler = (e)=>{
        e.preventDefault();
        dispatch(resetStatusNError());
        if (!unameOrEmail.length || !password.length){
            return dispatch(setError("Fill all required fields"))
        }
        dispatch(authUser({action: "login", initialPayload: {unameOrEmail, password}}));
    }

    return (
        <div className="my-form">
            <div className="form-title">Login</div>
            <div className="error">{error}</div>
            <form onSubmit={submitHandler}>
                <div className="inp-grp md">
                    <label htmlFor="uname">Username Or Email</label>
                    <input type="text" id='uname' value={unameOrEmail} onChange={e=>{setUnameOrEmail(e.target.value)}} />
                </div>
                <div className="inp-grp md">
                    <label htmlFor="pwd">Password</label>
                    <div className="joined-input">
                        <input type={pwdTogg ? "text" : "password" } id='pwd' value={password} onChange={e=>setPassword(e.target.value)} />
                        <div className="joined-item" onClick={()=>{setPwdTogg(prev=>!prev)}}>{pwdTogg ? <AiOutlineEye/> : <AiOutlineEyeInvisible/> }</div>
                    </div>
                </div>
                <div className="btns-grp">
                    <button type='submit' disabled={status==="loading"} >{status==="loading" ? <div className='loading-ani'></div> : "login" }</button>
                    <button><span>Cancel</span></button>
                </div>
            </form>
            <div className="form-info">
                Don't have an account yet? <Link to="/signup">Sign up here</Link>
            </div>
        </div>
    )
}

export default Login;