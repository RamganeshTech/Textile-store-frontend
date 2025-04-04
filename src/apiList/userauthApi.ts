import axios from "axios";
import Api from "../apiClient/apiClient";



export const loginUser = async (email: string, password: string, ) => {
    try {
      const response = await Api.post(`auth/userlogin`, { email, password });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || "Something went wrong";
    }
  };

  

  export const registerUser = async (userData: { userName: string; email: string; password: string, pincode:string, address:string, state:string }) => {
    try {
      const response = await Api.post(`auth/registeruser`, userData);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || "Something went wrong";
    }
  };


  export const logoutUser = async()=>{
    try {
      const response = await Api.post(`auth/logout`);
      console.log(response.data)
      return response.data;
    } catch (error: any) {
      throw error.response?.data || "Something went wrong";
    }
  }


  export const isAuthenticatedUser = async()=>{
    try {
      const response = await Api.get(`auth/isuserauthenticated`);
      console.log(response.data)
      return response.data;
    } catch (error: any) {
      throw error.response?.data || "Something went wrong";
    }
  }