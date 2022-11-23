import { createSlice } from "@reduxjs/toolkit";
const retrieveCartFromLocalStorage = () => {
    if(window.localStorage.getItem("cart") === "null" && window.localStorage.getItem("localCart") === "null" ){
        return null
    }
    else if(window.localStorage.getItem("localCart") !== "null"){
      return JSON.parse(window.localStorage.getItem("localCart"));
   }
    else if(window.localStorage.getItem("cart") !== "null" ){
        window.localStorage.setItem("localCart", window.localStorage.getItem("cart"));
        return JSON.parse(window.localStorage.getItem("cart"))
    }
   
 
};

const saveCartToLocalStorage = (cart) => {
  window.localStorage.setItem("localCart", JSON.stringify(cart));
};

const removeCartFromLocalStorage = () => {
  window.localStorage.removeItem("localCart");
};

export const localCartSlice = createSlice({
  name: "localCart",
  initialState: {
    cart: retrieveCartFromLocalStorage(),
  },
  reducers: {
    setLocalCart: (_state, { payload }) => {
      saveCartToLocalStorage(payload);
      return { cart: payload };
    },
    removeLocalCart: (_state) => {
      removeCartFromLocalStorage();
      return { cart: null };
    },
  },
});

export default localCartSlice.reducer;
export const { setLocalCart, removeLocalCart } = localCartSlice.actions;
