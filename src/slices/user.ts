import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userId: string | null;
  userName: string | null;
  email: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  userId: null,
  userName: null,
  email: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.isAuthenticated = true;
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
