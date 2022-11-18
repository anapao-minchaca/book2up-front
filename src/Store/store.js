import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import booksReducer from './slices/booksSlice'
import cartReducer from './slices/cartSlice';
export default configureStore({
    reducer: {
        auth: authReducer,
        books: booksReducer,
        cart: cartReducer
    }
});