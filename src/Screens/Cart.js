import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TableInventory from "../Components/TableInventory";
import "./Cart.css";
const Cart = () => {
  const [cart, setCart] = useState(null);
  useEffect(() => {
    if (window.localStorage.getItem("cart") !== "null") {
      setCart(JSON.parse(window.localStorage.getItem("cart")));
    } else {
      setCart(null);
    }
  }, []);
  const books = useSelector((state) => state.books);
  const getBooksInCart = () => {
    const booksInCart = [];
    for (let sku in cart) {
      const { titulo, precio, SKU } = books.find((book) => book.SKU === sku);
      booksInCart.push({
        titulo: titulo,
        cantidad: cart[sku],
        precio: precio,
        SKU: SKU,
      });
    }
    return booksInCart;
  };

  return (
    <div className="cart-area">
      {cart ? (
        <div>
          <TableInventory elementos={getBooksInCart()} />
        </div>
      ) : (
        <div className="order-area"> No tienes articulos en tu carrito</div>
      )}
    </div>
  );
};

export default Cart;
