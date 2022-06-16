import { createContext, useContext, useEffect, useState } from "react";
import peopleApi  from "../api/peopleApi";

export const peopleContext = createContext();

export const PeopleContextProvider = ({children})=>{
    const [peoples, setPeoples] = useState([]);

    const fetchPeoples = async(myfilter="")=>{
        try {
            let peoples = await peopleApi.get(`/?filter=${myfilter}`);
            return peoples.data;
        } catch (error) {
            console.error(error)
            return [];
        }
    }

    useEffect(()=>{
        const getPeoples = async ()=>{
            let peoples = await fetchPeoples();
            setPeoples(peoples);
        }
        getPeoples();

        return ()=>setPeoples([]);
    }, []);


    return (
        <peopleContext.Provider value={{peoples, fetchPeoples}}>
            {children}
        </peopleContext.Provider>
    )
}

const usePeopleContext = ()=>{
    return useContext(peopleContext);
}

export default usePeopleContext;