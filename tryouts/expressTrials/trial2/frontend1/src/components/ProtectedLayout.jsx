import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import useAuth from '../context/AuthContext'
import PropTypes from 'prop-types';

const ProtectedLayout = ({ Allowed_Roles }) => {
  const { auth } = useAuth();
  const location = useLocation()

  return (
    auth?.roles?.find(role => Allowed_Roles.includes(role)) ? <Outlet /> : (
      auth?.accessToken ? <Navigate to="/unauthorized" replace /> : <Navigate to="/login" state={{ from: location }} replace />
    )
  )
}

ProtectedLayout.propTypes = {
  Allowed_Roles: PropTypes.array.isRequired
}


export default ProtectedLayout