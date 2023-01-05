import { ReactEventHandler, useState}  from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { registerInitialLoad } from '../../features/auth/authUtilities';
import { validOutType } from '../../hooks/useValidateInput';

type Form1PropsType = {
    nextHandler: ReactEventHandler,
    unameOpts: validOutType<registerInitialLoad['uname']>,
    emailOpts: validOutType<registerInitialLoad['email']>,
    pwdOpts: validOutType<registerInitialLoad['password']>,
    confirmOpts: validOutType<registerInitialLoad['password']>
}


const Form1 = ({nextHandler, unameOpts, emailOpts, pwdOpts, confirmOpts}:Form1PropsType):JSX.Element=>{
    const [uname, setUname, unameErr] = unameOpts;
    const [email, setEmail, emailErr] = emailOpts;
    const [password, setPassword, pwdErr] = pwdOpts;
    const [confirm, setConfirm, confirmErr] = confirmOpts;

    const [pwdTogg, setPwdTogg] = useState<boolean>(false);
    const [confirmTogg, setConfirmTogg] = useState<boolean>(false);

    return (
        <form onSubmit={nextHandler}>
                    <div className="dual-grouped-input">
                        <div className="inp-grp sm">
                            <label htmlFor="username">Username</label>
                            <div className="error-inp">
                                <input type="text" value={uname} required onChange={e => setUname(e.target.value)} />
                                <div className="inp-err">{unameErr}</div>
                            </div>
                        </div>
                        <div className="inp-grp sm">
                            <label htmlFor="email">Email</label>
                            <div className="error-inp">
                                <input type="email" id='email' value={email} required onChange={e => setEmail(e.target.value)} />
                                <div className="inp-err">{emailErr}</div>
                            </div>
                        </div>
                    </div>
                    <div className="dual-grouped-input">
                        <div className="inp-grp sm">
                            <label htmlFor="pwd">Password</label>
                            <div className="error-inp">
                                <div className="joined-input">
                                    <input type={pwdTogg ? "text" : "password"} required id="pwd" value={password} onChange={e => setPassword(e.target.value)} />
                                    <div className="joined-item" onClick={() => { setPwdTogg(prev => !prev) }}>{pwdTogg ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</div>
                                </div>
                                <div className="inp-err">{pwdErr}</div>
                            </div>
                        </div>
                        <div className="inp-grp sm">
                            <label htmlFor="confirm">Confirm</label>
                            <div className="error-inp">
                                <div className="joined-input">
                                    <input type={confirmTogg ? "text" : "password"} required id="confirm" value={confirm} onChange={e => setConfirm(e.target.value)} />
                                    <div className="joined-item" onClick={() => { setConfirmTogg(prev => !prev) }}>{confirmTogg ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</div>
                                </div>
                                <div className="inp-err">{confirmErr}</div>
                            </div>
                        </div>
                    </div>
                    <div className="btns-grp">
                        <button type='submit'>Next</button>
                    </div>
                </form>
    )
}

export default Form1;