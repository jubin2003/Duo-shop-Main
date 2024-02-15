// cartredux.js

import { createSlice } from "@reduxjs/toolkit";
import { FETCH_CART_SUCCESS, FETCH_CART_FAILURE } from './action'; // Correct the import path

// Function to calculate total quantity
const calculateQuantity = (products) => {
  return products.reduce((totalQuantity, product) => totalQuantity + product.quantity, 0);
};

// Function to calculate total price
const calculateTotal = (products) => {
  return products.reduce((totalPrice, product) => totalPrice + (product.price * product.quantity), 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FETCH_CART_SUCCESS, (state, action) => {
        state.products = action.payload;
        state.quantity = calculateQuantity(action.payload);
        state.total = calculateTotal(action.payload);
      })
      .addCase(FETCH_CART_FAILURE, (state) => {
        // Handle failure if needed
      });
  },
});

export const { addProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
