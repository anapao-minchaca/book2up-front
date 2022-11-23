import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import "./Cart.css";
const Cart = () => {
  const [cart, setCart] = useState(null);
  useEffect(() =>{
    if( window.localStorage.getItem("localCart") === "null" && window.localStorage.getItem("cart") !== "null"){
      setCart(JSON.parse(window.localStorage.getItem("cart")))
    }
    else if(window.localStorage.getItem("localCart") !== "null"){
      setCart(JSON.parse(window.localStorage.getItem("localCart")))
    }
    else{
      setCart(null)
    }
  },[])
 
  const books = useSelector((state) => state.books);
  const getBooksInCart = () => {
    const booksInCart = [];
    cart.forEach((item) => {
      const {titulo,precio} = books.find((book) => book.SKU === item.libro)
      booksInCart.push({titulo:titulo, cantidad:item.cantidad, total: precio*item.cantidad});
    });
    return booksInCart;
  };
  const renderCart = () => {
    const booksToMap = getBooksInCart();
    return booksToMap.map((item) => {
      return (
        <div className="order-item" key={item.SKU}>
          <p>Titulo {item.titulo}</p>
          <p>Cantidad {item.cantidad}</p>
          <p>subtotal {item.total}</p>
        </div>
      );
    });
  };
  const calculateTotal = () => {
    const booksToMap = getBooksInCart()
    const total = booksToMap.reduce((valorAnterior, valorActual) => {
      return valorAnterior + valorActual.total;
    }, 0);
    return <div>El precio final es: {total}</div>;
  };
  return (
    <div className="cart-area">
      {cart ? 
        <div>
          <div className="order-area">{renderCart()}</div>
          <div className="payment">
            <div>{calculateTotal()}</div>
            <div>
              <button>Pagar</button>
            </div>
          </div>
        </div>: (
        <div className="order-area"> No tienes articulos en tu carrito</div>
      )}
    </div>
  );
};

export default Cart;
