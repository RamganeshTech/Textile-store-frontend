import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userAddress {
  street: (string | null);
  doorNo: (string | null);
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
    doorNo: null,
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
    setUser: (state, action: PayloadAction<UserState>) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.phoneNumber = action.payload?.phoneNumber ?? null
      state.address = action.payload?.address ?? {
        street: null,
        doorNo: null,
        landmark: null,
        state: null,
        district: null,
        pincode: null
      }
    },
    logoutUser: (state) => {
      state.userId = null;
      state.userName = null;
      state.email = null;
      state.isAuthenticated = false;
      state.address = {
        street: null,
        doorNo: null,
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
