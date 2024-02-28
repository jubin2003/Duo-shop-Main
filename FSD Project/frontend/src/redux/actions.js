// actions.js
import { createAsyncThunk } from '@reduxjs/toolkit';

// Define action types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
export const FETCH_CART_FAILURE = 'FETCH_CART_FAILURE';
export const REMOVE_CART_ITEM = 'cart/removeCartItem';
// Define action creators
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const fetchCart = (userId) => async (dispatch) => {
  try {
    const res = await publicRequest.get(`/cart/find/${userId}`);
    dispatch({ type: FETCH_CART_SUCCESS, payload: res.data.products });
  } catch (err) {
    console.error('Error fetching cart:', err);
    dispatch({ type: FETCH_CART_FAILURE });
  }
};

// Additional action creators can be added here as needed
// Action creators
export const removeCartItem = createAsyncThunk(
    REMOVE_CART_ITEM,
    async (productId, thunkAPI) => {
      try {
        await axios.delete(`/cart/${productId}`);
        return productId; // Return the productId for removal from state
      } catch (error) {
        throw new Error(error.message);
      }
    }
  );