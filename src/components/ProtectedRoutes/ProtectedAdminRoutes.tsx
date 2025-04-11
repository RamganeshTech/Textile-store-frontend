import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

type ProtectedAdminRoutesProp = {
    children: ReactElement
}

const ProtectedAdminRoutes:React.FC<ProtectedAdminRoutesProp> = ({children}) => {
 let admin = useSelector((state:RootState)=> state.admin)
return admin.isAuthenticated ? children : <Navigate to={'/adminlogin'} />
}

export default ProtectedAdminRoutes