// actions.js
import { publicRequest } from '../requestMethod'; // Import your axios instance for public requests

// Define action types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
export const FETCH_CART_FAILURE = 'FETCH_CART_FAILURE';

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

// You can add more action types and creators as needed
