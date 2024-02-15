// userRedux.js
import { createSlice } from "@reduxjs/toolkit";
import { clearCart } from "./cartRedux";

// Action to set the user data in local storage
const setUserDataInLocalStorage = (userData) => {
  localStorage.setItem("userData", JSON.stringify(userData));
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem("userData")) || null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;

      // Save user data in local storage during login
      setUserDataInLocalStorage(action.payload);
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;

      // Clear the user cart when the user logs out
      clearCart();

      // Clear user data from local storage during logout
      localStorage.removeItem("userData");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
