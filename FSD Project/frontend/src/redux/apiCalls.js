// api calls.js

import { publicRequest } from "../requestMethod";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { fetchCart } from "./action"; // Import fetchCart action

export const login = async (dispatch, user) => {
  dispatch(loginStart());

  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));

    // Store the session token in a secure way (e.g., in a cookie or local storage)
    localStorage.setItem('token', res.data.token);

    // Fetch user cart after successful login
    dispatch(fetchCart(res.data.id));
  } catch (err) {
    console.error('Error during login:', err);

    // Check if the error is due to unauthorized access (401)
    if (err.response && err.response.status === 401) {
      console.error('Unauthorized access. Check credentials.');
      // Handle unauthorized access, e.g., redirect to login page
    }

    dispatch(loginFailure());
  }
};
