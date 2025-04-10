import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../store/store';

type ProtectedRoutesProp ={
    children: ReactElement
}

const ProtectedRoutes:React.FC<ProtectedRoutesProp> = ({children}) => {
   let isAuthenticated =  useSelector((state:RootState)=> state.user.isAuthenticated)
  return isAuthenticated ? children : <Navigate to={'/login'} />
}

export default ProtectedRoutes