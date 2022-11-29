import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import booksReducer from './slices/booksSlice'
import cartReducer from './slices/cartSlice';
import localCartReducer from './slices/localCartSlice'
import historyReducer from './slices/historySlice'
export default configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        books: booksReducer,
        localCart: localCartReducer,
        history: historyReducer
    }
});