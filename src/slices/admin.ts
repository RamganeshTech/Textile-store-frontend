import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated:false,
    email:null
}


const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{
        setAdminLogin:(state, action)=>{
            console.log(action)
            // state.email = action.payload.email
            // state.isAuthenticated = action.payload.isAuthenticated
            return {...state, ...action.payload}
        }
    }
})

export const {setAdminLogin} = adminSlice.actions
export default adminSlice.reducer