import axios from "axios";
import Api from "../apiClient/apiClient";
import { setUser } from "../slices/user";
import store from './../store/store';


const getRefreshtoken = async (): Promise<{ ok: boolean }>=>{
    try{
     let {data} = await Api.get('/auth/refreshtoken')
        store.dispatch(setUser({isAuthenticated:data.ok, userId:data.userId}))
         return {ok:data.ok}
    }
    catch(error){
if (axios.isAxiosError(error) && error.response) {
    store.dispatch(setUser({ isAuthenticated: error.response.data.ok, userId: null }));
  } else {
    store.dispatch(setUser({ isAuthenticated: false, userId: null }));
  }
      return { ok: false };
    
    }
 }


 export default getRefreshtoken;