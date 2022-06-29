import { Outlet } from 'react-router-dom';
import {useState, useEffect} from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../context/AuthProvider';
import useLocalStorage from '../hooks/useLocalStorage';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth} = useAuth();
    const [persist] = useLocalStorage('persist', false);

    useEffect(()=>{
        let isMounted = true;
        const verifyRefreshToken = async ()=>{
            try{
                await refresh();
            }
            catch(err){
                console.log(err);
            } finally{
                isMounted && setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
        
        return ()=> isMounted = false;
        // eslint-disable-next-line
    }, []);

    useEffect(()=>{
        console.log(`isLoading ${isLoading}`);
        console.log(auth?.accessToken);
        // eslint-disable-next-line
    }, [isLoading]) 

    return (
        <>
            {!persist ? <Outlet/> : isLoading ? <p>Loading ...</p> : <Outlet/>}
        </>
    )
}

export default PersistLogin