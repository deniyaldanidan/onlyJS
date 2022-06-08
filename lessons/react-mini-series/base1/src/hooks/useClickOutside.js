import {useRef, useEffect} from 'react';


export default function useClickOutside (handler){
    let myRef = useRef(null);

    useEffect(()=>{
        let myEventHandler = (e)=>{
            if(!myRef.current.contains(e.target)){
                handler();
            }
        };
        document.addEventListener("click", myEventHandler);
        return ()=>{
            document.removeEventListener("click", myEventHandler);
        }
    }, [handler]);

    return myRef;
} 