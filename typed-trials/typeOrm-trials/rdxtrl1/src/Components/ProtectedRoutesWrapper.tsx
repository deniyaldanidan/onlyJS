import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";


const ProtectedRoutesWrapper = ()=>{
    const {isAuth} = useAppSelector(state=>state.auth.data);
    
    return isAuth ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutesWrapper;