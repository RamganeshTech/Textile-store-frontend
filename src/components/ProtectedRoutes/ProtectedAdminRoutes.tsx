import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { data, Navigate, Outlet, useNavigate } from 'react-router-dom'
import Loading from '../LoadingState/Loading'
import useAdminAuthenticated from '../../hooks/useAdminAuthenticated'

type ProtectedAdminRoutesProp = {
    children: ReactElement
    // adminauthloading:boolean
}

const ProtectedAdminRoutes:React.FC<ProtectedAdminRoutesProp> = ({children}) => {
 const {adminauthloading, data} =  useAdminAuthenticated()
 let admin = useSelector((state:RootState)=> state.admin)
//  console.log("from PR of adsmin",admin)

//  console.log("adminauthloading", adminauthloading)
 if(adminauthloading || !data?.isAuthenticated) return <Loading />
return admin.isAuthenticated ? children : <Navigate to={'/adminlogin'} />
}

export default ProtectedAdminRoutes