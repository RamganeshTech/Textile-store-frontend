import { useEffect } from 'react'
import { useIsAdminAuthenticated } from '../apiList/adminApi'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store/store'
import { setAdminLogin } from '../slices/admin'

const useAdminAuthenticated = () => {
    // let {mutate: isAdminAuthenticated, isPending:adminauthloading, isError, data} = useIsAdminAuthenticated()
    let {  data, isLoading:adminauthloading} = useIsAdminAuthenticated()

    let dispatch = useDispatch<AppDispatch>()

    // useEffect(()=>{
    //     console.log(data, "from admin auth custome hook")
    //     isAdminAuthenticated({
    //         onSuccess:(data)=>{
    //             console.log(data, "from admin auth custome hook")
    //             dispatch(setAdminLogin({email:data.email, isAuthenticated: data.isAuthenticated}))
    //         },
    //         onError:()=>{
    //             dispatch(setAdminLogin({email:null, isAuthenticated: false}))
    //         },
    //         onSettled(data, error, variables, context) {
    //             console.log(data, "from onsettled")
    //         },
    //     })
    // }, [dispatch])

  useEffect(() => {
    //   console.log("adminloding", adminauthloading)
    //   console.log("data", data)
      if (!adminauthloading && data) {
        if (data.isAuthenticated) {
          dispatch(setAdminLogin({ email: data.email, isAuthenticated: true }))
        } else {
          dispatch(setAdminLogin({ email: null, isAuthenticated: false }))
        }
      }
    }, [adminauthloading, dispatch])

    return {adminauthloading, data}
}

export default useAdminAuthenticated