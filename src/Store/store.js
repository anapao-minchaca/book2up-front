import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import booksReducer from "./slices/booksSlice";
import cartReducer from "./slices/cartSlice";
import historyReducer from "./slices/historySlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    books: booksReducer,
    history: historyReducer,
  },
});
