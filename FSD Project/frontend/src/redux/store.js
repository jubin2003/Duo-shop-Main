// store.js

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer, { loginSuccess } from "./userRedux"; // Import loginSuccess from userRedux
import { FETCH_CART_SUCCESS, FETCH_CART_FAILURE, fetchCart } from './action'; // Import fetchCart from actions
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Middleware to dispatch fetchCart on successful login
store.subscribe(() => {
  const { user } = store.getState();
  if (user.currentUser && user.currentUser.token) {
    // Assuming you have a loginSuccess action in userRedux.js
    store.dispatch(loginSuccess(user.currentUser)); // Dispatch loginSuccess with user data
    store.dispatch(fetchCart(user.currentUser.id));
  }
});

export default { store, persistor };
