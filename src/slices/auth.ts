// import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// interface AuthState {
//   user: { name: string; email: string } | null;
//   token: string | null;
// }

// const initialState: AuthState = {
//   user: null,
//   token: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<{ name: string; email: string }>) => {
//       state.user = action.payload;
//     },
//     setToken: (state, action: PayloadAction<string>) => {
//       state.token = action.payload;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//     },
//   },
// });

// export const { setUser, setToken, logout } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
    user: { name: string; email: string } | null;
    token: string | null;
  }

const initialState:AuthState = {
    user:{
        name:"",
        email:""
    },
    // user:null,
    token:null,
}

const auth = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser: (state, action: PayloadAction<{ name: string; email: string }>) => {
            state.user = action.payload;
          },
          setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
          },
          logout: (state) => {
            state.user = null;
            state.token = null;
          },
        },
})


export const {setToken, setUser, logout } = auth.actions 

export default auth.reducer;