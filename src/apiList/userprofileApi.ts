import Api from "../apiClient/apiClient";
import { useMutation } from "@tanstack/react-query";


`/profile/updateemail',
/profile/updatephoneno', 
/profile/updateusername',
/profile/verifypassword',
/profile/changepassword',
`


export const verifyPassword = async(password:string)=>{
    try {
        console.log("verifypassword api password",password)
        const response = await Api.patch(`/profile/verifypassword`,{password} );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || "Something went wrong";
    }
  }

  export const changePassword = async(data:{newPassword:string, currentPassword:string, confirmPassword:string})=>{
    try {
      const response = await Api.patch(`/profile/changepassword`, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || "Something went wrong";
    }
  }

export const updateUserEmail = async(email:string)=>{
    try {
      const response = await Api.patch(`/profile/updateemail`, {email});
      return response.data;
    } catch (error: any) {
      throw error.response?.data || "Something went wrong";
    }
  }


  export const updateUserPhoneNo = async(phoneNo:string)=>{
    try {
      const response = await Api.patch(`/profile/updatephoneno`, {phoneNo});
      return response.data;
    } catch (error: any) {
      throw error.response?.data || "Something went wrong";
    }
  }


  export const updateUserUserName = async(userName:string)=>{
    try {
      const response = await Api.patch(`/profile/updateusername`, {userName});
      return response.data;
    } catch (error: any) {
      throw error.response?.data || "Something went wrong";
    }
  }


export const useChangePassword = ()=>{
   return useMutation({
        mutationFn: changePassword,
      
    })
}


export const useVerifyPassword = ()=>{
    return useMutation({
         mutationFn: verifyPassword,
       
     })
 }

 export const useChangeEmail = ()=>{
    return useMutation({
         mutationFn: updateUserEmail,
       
     })
 }


 export const useChangeUserName = ()=>{
    return useMutation({
         mutationFn: updateUserUserName,
       
     })
 }


 export const useChangePhoneNo = ()=>{
    return useMutation({
         mutationFn: updateUserPhoneNo,
       
     })
 }