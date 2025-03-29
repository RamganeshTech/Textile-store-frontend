import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import Api from '../apiClient/apiClient'
import { setUser } from '../slices/user'
import { useDispatch } from 'react-redux'

const useRefreshtoken =  () => {

    useEffect(()=>{
        const getRefreshtoken = async ()=>{
           try{
            let data:any = await getRefreshtoken()
           }
           catch(error){
            if(error instanceof Error){
                throw new Error(error.message)
            }
           
           }
        }

         getRefreshtoken()
    }, [])


    return {}
}

export default useRefreshtoken