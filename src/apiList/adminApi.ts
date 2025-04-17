import { useIsMutating, useMutation, useQuery } from "@tanstack/react-query"
import Api from "../apiClient/apiClient"
import { TrySharp } from "@mui/icons-material"

export const adminLogin = async (loginData:{email:string, password:string})=>{
   try{
    const {data}= await Api.post('/admin/adminlogin', loginData)
    console.log(data)
    return data
   }
   catch(error){
    throw error;
   }
}

export const adminLogout = async ()=>{
  try{
    const {data}= await Api.post('/admin/adminlogout')
    console.log(data)
    return data
  }
  catch(error){
    throw error;
   }
}

export const isAdminAuthenticated = async ()=>{
    try{
        const {data}= await Api.get('/admin/isauthenticated')
        console.log(data)
        return data
      }
      catch(error){
        throw error;
       } 
}


export const useAdminLogin= ()=>{
    return useMutation({
        mutationFn: adminLogin,
    })
}

export const useAdminLogout = ()=> {
    return useMutation({
        mutationFn: adminLogout,
    })
}

export const useIsAdminAuthenticated = ()=>{
    return useQuery({
        queryKey: ['admin'],
        queryFn: isAdminAuthenticated,
        retry: false,
    })
}   