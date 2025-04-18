import React, { ReactElement } from 'react'
import {  Navigate } from 'react-router-dom'
import Loading from '../LoadingState/Loading'
import useAdminAuthenticated from '../../hooks/useAdminAuthenticated'

type ProtectedAdminRoutesProp = {
    children: ReactElement
    // adminauthloading:boolean
}

const ProtectedAdminRoutes:React.FC<ProtectedAdminRoutesProp> = ({children}) => {
 const {adminauthloading, data} =  useAdminAuthenticated()
 // let admin = useSelector((state:RootState)=> state.admin)
 // let {isLoading:adminauthloading,data} = useIsAdminAuthenticated()
// let dispatch = useDispatch<AppDispatch>()

// useEffect(() => {
//     console.log("adminloding", adminauthloading)
//     console.log("data", data)
//     if (!adminauthloading && data) {
//       if (data.isAuthenticated) {
//         dispatch(setAdminLogin({ email: data.email, isAuthenticated: true }))
//       } else {
//         dispatch(setAdminLogin({ email: null, isAuthenticated: false }))
//       }
//     }
//   }, [adminauthloading, dispatch])


 if(adminauthloading) return <div className='h-[100vh] flex justify-center items-center'><Loading /></div>


if(!adminauthloading && data?.isAuthenticated ){
   
    return children
}
else if(!adminauthloading && !data?.isAuthenticated){
     return <Navigate to={'/adminlogin'} />
}
}

export default ProtectedAdminRoutes