import { Dispatch, SetStateAction, useEffect, useState } from 'react';


export default function useLocalStorage(key:string, defaultVal:string):[string, Dispatch<SetStateAction<string>>]{
    const [val, setVal] = useState(()=>{
        let currentValue:string;
        try {
            currentValue = JSON.parse(localStorage.getItem(key) || String(defaultVal))
        } catch (error) {
            currentValue = defaultVal;
        }
        return currentValue;
    });

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(val))
    }, [key, val])


    return [val, setVal]
}