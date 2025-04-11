import React, { useEffect } from 'react'
import { useIsAdminAuthenticated } from '../apiList/adminApi'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store/store'
import { setAdminLogin } from '../slices/admin'

const useAdminAuthenticated = () => {
    let {mutate: isAdminAuthenticated, isPending, isError} = useIsAdminAuthenticated()

    let dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        isAdminAuthenticated(undefined,{
            onSuccess:(data)=>{
                dispatch(setAdminLogin({email:data.email, isAuthenticated: data.isAuthenticated}))
            },
            onError:()=>{
                dispatch(setAdminLogin({email:null, isAuthenticated: false}))
            }
        })
    }, [dispatch])
}

export default useAdminAuthenticated