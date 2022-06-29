import { useState, useEffect } from "react";

const getLocalValue = (key,  initValue) =>{
    // SSR Next.js
    if (typeof window === 'undefined') return initValue;

    // if a value is already stored
    const localValue = JSON.parse(localStorage.getItem(key));
    if (localValue) return localValue;

    // if a initvalue is function
    if(initValue instanceof Function) return initValue();

    return initValue;
}

const useLocalStorage = (key, initialValue) => {
  
    const [value, setValue] = useState(()=> getLocalValue(key, initialValue));
  
    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue] ;
}

export default useLocalStorage