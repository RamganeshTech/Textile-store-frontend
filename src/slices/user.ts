import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userAddress {
  street: (string | null);
  doorno: (string | null);
  landmark: (string | null);
  state: (string | null);
  district: (string | null);
  pincode: (string | null);
}
export interface UserState {
  userId: string | null;
  isAuthenticated: boolean;
  userName?: string | null;
  email?: string | null;
  phoneNumber:string | null
  address: userAddress | null
}

const initialState: UserState = {
  userId: null,
  isAuthenticated: false,
  email: null,
  userName: null,
  phoneNumber: null,
  address: {
    street: null,
    doorno: null,
    landmark: null,
    state: null,
    district: null,
    pincode: null
  } 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      // state.userId = action.payload.userId;
      // state.userName = action.payload.userName;
      // state.email = action.payload.email;
      // state.isAuthenticated = action.payload.isAuthenticated;
      // state.phoneNumber = action.payload?.phoneNumber ?? null
      // state.address = action.payload?.address ?? {
      //   street: action.payload.address?.street || null,
      //   doorno: action.payload.address?.doorno || null,
      //   landmark: action.payload.address?.landmark || null,
      //   state: action.payload.address?.state || null,
      //   district: action.payload.address?.district || null,
      //   pincode: action.payload.address?.pincode || null
      // }
    return {
      ...state,
      ...action.payload,
      address: {
        street: action.payload.address?.street ?? state.address?.street ?? null,
        doorno: action.payload.address?.doorno ?? state.address?.doorno ?? null,
        landmark: action.payload.address?.landmark ?? state.address?.landmark ?? null,
        state: action.payload.address?.state ?? state.address?.state ?? null,
        district: action.payload.address?.district ?? state.address?.district ?? null,
        pincode: action.payload.address?.pincode ?? state.address?.pincode ?? null
      }
      } 
    },
    logoutUser: (state) => {
      state.userId = null;
      state.userName = null;
      state.email = null;
      state.isAuthenticated = false;
      state.address = {
        street: null,
        doorno: null,
        landmark: null,
        state: null,
        district: null,
        pincode: null
      }
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
