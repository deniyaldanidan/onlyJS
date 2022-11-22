import { useState, createContext, useContext } from 'react';
import ROLES_LIST from '../ROLES_LIST';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})

    const isAdmin = auth?.roles?.find(role=>role===ROLES_LIST.Admin);
    const isEditor = auth?.roles?.find(role=>role===ROLES_LIST.Editor);

    return (
        <AuthContext.Provider value={{ auth, setAuth, isAdmin, isEditor }}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    const { auth, setAuth, isAdmin, isEditor } = useContext(AuthContext);
    return { auth, setAuth, isAdmin, isEditor };
}