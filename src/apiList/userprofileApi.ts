import Api from "../apiClient/apiClient";
import { useMutation } from "@tanstack/react-query";
import { userAddress } from "../slices/user";

export const verifyPassword = async(password:string)=>{
    try {
        const response = await Api.patch(`/profile/verifypassword`,{password} );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  export const changePassword = async(data:{newPassword:string, currentPassword:string, confirmPassword:string})=>{
    try {
      const response = await Api.patch(`/profile/changepassword`, data);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

export const updateUserEmail = async(email:string)=>{
    try {
      const response = await Api.patch(`/profile/updateemail`, {email});
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }


  export const updateUserPhoneNo = async(phoneNo:string)=>{
    try {
      const response = await Api.patch(`/profile/updatephoneno`, {phoneNo});
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }


  export const updateUserUserName = async(userName:string)=>{
    try {
      const response = await Api.patch(`/profile/updateusername`, {userName});
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  export const updateAddress = async(userData:userAddress)=>{
    try {
      const response = await Api.patch(`/profile/updateaddress`, userData);
      return response.data;
    } catch (error: any) {
      throw error;
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

 export const useChangeAddress = ()=>{
  return useMutation({
       mutationFn: updateAddress,
     
   })
}