import React, { useState } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import '../styles/clicksim1.css';


const ClickSim1 = () => {
    const [toggleCont, setToggleCont] = useState(false);
    const contRef = useClickOutside(()=>setToggleCont(false));
  
    return (
        <>
            <div className='container' ref={contRef}>
                <div className="btn" onClick={()=>setToggleCont(prev=>!prev)}>Click me</div>
                <div className={`contents ${toggleCont && 'show'}`}>
                    Hello I'm Awesome
                </div>
            </div>
        </>
  )
}

export default ClickSim1