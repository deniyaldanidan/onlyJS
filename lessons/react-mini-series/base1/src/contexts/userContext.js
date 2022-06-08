import {createContext, useContext, useState} from 'react';

export const userContext = createContext({
    user: null,
    logIn: ()=>{},
    logOut: ()=>{}
});

const USER = {name: "Guest", isGuestUser: true};

export function UserContextProvider({children}){
    const [user, setUser] = useState(USER)

    const logIn = (uname)=>{
        setUser({name: uname, isGuestUser:false})
    }

    const logOut = ()=>{
        setUser(USER);
    }

    return (
        <userContext.Provider value={{user, logIn, logOut}}>
            {children}
        </userContext.Provider>
    )
}

export const useUserContext = ()=>{
    const {user, logIn, logOut} = useContext(userContext);
    return {user, logIn, logOut};
}