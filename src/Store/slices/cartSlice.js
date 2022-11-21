import { createSlice } from '@reduxjs/toolkit';
const retrieveCartFromLocalStorage = () => {
    return  window.localStorage.getItem('cart') ?? null;
};

const saveCartToLocalStorage = (cart) => {
    if(cart === null){
        window.localStorage.setItem('cart', null);
    }
    else{
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }
   
};

const removeCartFromLocalStorage = () => {
    window.localStorage.removeItem('cart');
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: retrieveCartFromLocalStorage(),
    },
    reducers: {
        setCart: (_state, { payload }) => {
            saveCartToLocalStorage(payload);
             return { cart:payload };
        },
        removeCart: (_state) => {
            removeCartFromLocalStorage();
            return { cart: null };
        }
    }
});

export default cartSlice.reducer;
export const { setCart, removeCart} = cartSlice.actions;