import { UserProfile } from "@/interfaces/global";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  user: UserProfile | null;
  token: string | null;
} = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
