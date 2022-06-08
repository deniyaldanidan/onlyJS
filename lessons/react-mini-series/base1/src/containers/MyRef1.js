import {useEffect, useRef} from 'react';
import Input from '../components/MyRef1/Input';


const MyRef1 = () => {
    const fnameRef = useRef(null);
    const lnameRef = useRef(null);
    const submitRef = useRef(null);

    useEffect(()=>{
        fnameRef.current.focus();
    }, [])

    return (
        <>
            <Input type="text" placeholder="first name" onKeyDown={(e)=>e.key==='Enter' && lnameRef.current.focus()} ref={fnameRef} />
            <Input type="text" placeholder="last name" ref={lnameRef} onKeyDown={e=>e.key==='Enter' && submitRef.current.focus()} />
            <button ref={submitRef} onKeyDown={()=>console.log("Button is clicked")}>Submit</button>
        </>
    )
}

export default MyRef1