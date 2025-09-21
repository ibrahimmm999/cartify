import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialToken = localStorage.getItem("token");
let initialData = null;

if (initialToken) {
  try {
    initialData = jwtDecode(initialToken);
  } catch (error) {
    localStorage.removeItem("token");
  }
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: initialData,
  },
  reducers: {
    setUser: (state, action) => {
      const userData = jwtDecode(action.payload.token);
      state.data = userData;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.data = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
