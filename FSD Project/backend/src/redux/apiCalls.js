import { publicRequest } from "../requestMethod";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());

  try {
    // Assuming your backend supports sessions and returns a session token on successful login
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));

    // Store the session token in a secure way (e.g., in a cookie or local storage)
    localStorage.setItem('token', res.data.token);
  } catch (err) {
    console.error('Error during login:', err);

    // Check if the error is due to unauthorized access (401)
    if (err.response && err.response.status === 401) {
      console.error('Unauthorized access. Check credentials.');
    }

    dispatch(loginFailure());
  }
};
