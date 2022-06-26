import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../context/AuthProvider'


const RequireAuth = ({allowedRoles}) => {
    const {auth} = useAuth();
    const location = useLocation();

    const renderFunc = ()=>{
        if (auth?.roles?.find(role=>allowedRoles?.includes(role))){
            return <Outlet/>
        } else if( auth?.user){
            return <Navigate to="/unauthorized" state={{from:location}} replace />
        }
        return <Navigate to="/login" state={{from: location}} replace />;
    }
  
    return (
      <>
        {renderFunc()}
      </>
    )
}

export default RequireAuth

// auth?.roles?.find(role=>allowedRoles?.includes(role)) ? <Outlet/> : auth?.user ? <Navigate to="/unauthorized" state={{from:location}} replace /> :<Navigate to="/login" state={{from: location}} replace />