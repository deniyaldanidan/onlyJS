import { createContext, useContext, useState } from "react";


const AuthContext = createContext({});

export const AuthProvider = ({children})=>{
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{auth, setAuth}} >
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = ()=>{
    const {auth, setAuth} = useContext(AuthContext);

    return {auth, setAuth};
}
export default useAuth;