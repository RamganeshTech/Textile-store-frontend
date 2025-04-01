import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  userId: string | null;
  isAuthenticated: boolean;
  userName?: string | null;
  email?: string | null;
}

const initialState: UserState = {
  userId: null,
  isAuthenticated: false,
  email: null,
  userName: null,
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
    },
    logoutUser: (state) => {
      state.userId = null;
      state.userName = null;
      state.email = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
