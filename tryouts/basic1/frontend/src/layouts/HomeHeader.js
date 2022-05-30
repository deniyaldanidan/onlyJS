import { useState } from 'react';
import LoginFormPortal from '../components/LoginForm';
import PortalBtn from '../components/PortalBtn';

const HomeHeader = () => {
    const [logState, setLogState] = useState(false);
    // const [regState, setRegState] = useState(false);

    const showHideLogin = (value)=>{
        setLogState(value);
    }

  return (
    <header>
        <div className="head-logo">My-Todo</div>
        <div className="head-menu">
            <a href="/">Home</a>
            <a href="/">About</a>
            <a href="/">How it works</a>
        </div>
        <div className="head-menu">
            <PortalBtn btnText="Login" btnAction={showHideLogin} portalState={logState} > <LoginFormPortal closeAction={showHideLogin}/> </PortalBtn>
            <div>Register</div>
        </div>
    </header>
  )
}

export default HomeHeader