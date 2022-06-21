import { useState } from 'react'

const BtnCnt = ({render, text}) => {
    const [show, setShow] = useState(false);
    const handleShow = ()=>setShow(prev=>!prev);
    return (
    <>
        <button onClick={handleShow}>{text}</button>
        {render(show)}
    </>
    );
}

export default BtnCnt