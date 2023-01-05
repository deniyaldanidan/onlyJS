import { ReactEventHandler, useEffect, useState } from 'react';
import '../styles/my-form.scss';
import { registerInitialLoad } from '../features/auth/authUtilities';
import useValidateInput from '../hooks/useValidateInput';
import validator from 'validator';
import { Link, useNavigate } from 'react-router-dom';
import Form1 from '../Components/Register/Form1';
import Form2 from '../Components/Register/Form2';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { authUser, resetStatusNError, setError } from '../features/auth/authSlice';
import { capitalize, isString } from 'lodash';


const Register = (): JSX.Element => {

    const [nextForm, setNextForm] = useState(false);
    const dispatch = useAppDispatch();
    const {status, error, data} = useAppSelector(state=>state.auth);
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

    const [uname, setUname, unameErr] = useValidateInput<registerInitialLoad['uname']>(
        "",
        "No space allowed. Username should only have alphanumeric characters and .-_",
        (inp) => inp.length ? validator.isAlphanumeric(inp, "en-US", { ignore: "_-." }) : true
    )

    const [password, setPassword, pwdErr] = useValidateInput<registerInitialLoad['password']>(
        "",
        "Must contain 2 symbols, 1 Capital letter and number. Should be atleast 10 characters long.",
        (inp) => inp.length ? validator.isStrongPassword(inp, { minLength: 10, minSymbols: 2 }) : true
    )

    const [confirm, setConfirm, confirmErr] = useValidateInput<registerInitialLoad['password']>(
        "",
        "Confirm must match the password",
        (inp) => inp.length ? inp === password : true
    )

    const [email, setEmail, emailErr] = useValidateInput<registerInitialLoad['email']>(
        "",
        "Should be a valid email",
        (inp) => inp.length ? validator.isEmail(inp) : true
    )

    const [fname, setFname, fnameErr] = useValidateInput<registerInitialLoad['fname']>(
        "",
        "should only contain alphabets A-Za-z",
        (inp) => inp.length ? validator.isAlpha(inp) : true
    )

    const [lname, setLname, lnameErr] = useValidateInput<registerInitialLoad['lname']>(
        "",
        "should only contain alphabets A-Za-z",
        (inp) => inp.length ? validator.isAlpha(inp) : true
    )

    const [location, setLocation, locationErr] = useValidateInput<registerInitialLoad['location']>(
        "",
        "should only contain alphanumeric character and _- symbols, spaces are allowed.",
        (inp) => inp.length ? validator.isAlphanumeric(inp, "en-US", { ignore: " -_" }) : true
    )

    const [bio, setBio] = useState<registerInitialLoad['bio']>("");

    const nextHandler: ReactEventHandler = e => {
        e.preventDefault();
        dispatch(resetStatusNError())
        if (uname.length && email.length && password.length && confirm.length && !unameErr && !emailErr && !pwdErr && !confirmErr) {
            return setNextForm(true);
        }
        dispatch(setError("Fill out all fields"))
    }

    const submitHandler:ReactEventHandler = e => {
        e.preventDefault()
        dispatch(resetStatusNError());
        if (!fname.length || !lname.length || isString(locationErr)){
            return dispatch(setError("Fill out all marked fields and provide proper value"))
        }
        dispatch(authUser({action: "register", initialPayload: {
            uname,
            password,
            email,
            fname: capitalize(fname),
            lname: capitalize(lname),
            location: capitalize(location),
            bio
        }}))
    }

    const backHandler = ()=>{
        setNextForm(false);
    }

    return (
        <div className="my-form">
            <div className="form-title">SignUp</div>
            <div className="error">{error}</div>
            <div className="multi-infos">
                <div className={`multi-info ${nextForm ? "" : "active"}`} data-step="1">Account</div>
                <div className={`multi-info ${!nextForm ? "" : "active"}`} data-step="2">Personal</div>
            </div>
            {!nextForm ? (
                <Form1
                    nextHandler={nextHandler}
                    unameOpts={[uname, setUname, unameErr]}
                    emailOpts={[email, setEmail, emailErr]}
                    pwdOpts={[password, setPassword, pwdErr]}
                    confirmOpts={[confirm, setConfirm, confirmErr]}
                />
            ) : (
                <Form2
                    submitHandler={submitHandler}
                    backHandler={backHandler}
                    fnameOpts={[fname, setFname, fnameErr]}
                    lnameOpts={[lname, setLname, lnameErr]}
                    locationOpts={[location, setLocation, locationErr]}
                    bioOpts={[bio, setBio]}
                />
            )}
            <div className="form-info">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </div>
    )
}

export default Register;