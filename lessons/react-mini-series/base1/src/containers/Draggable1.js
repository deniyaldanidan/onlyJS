import React, { useState } from 'react';
import Dialog from '../components/draggable1/Dialog';
import '../styles/draggable1.css';


const Draggable1 = () => {
    const [show, setShow] = useState(false)

  
    return (
        <>
            <div className='open-btn' onClick={()=>setShow(true)}>Open Dialog</div>
            {show && <Dialog closeHandler={()=>setShow(false)} />}      
        </>
    )
}

export default Draggable1