import React from "react";
import "./Cart.css";
const Cart = () => {
  const cart  =  window.localStorage.getItem('cart')!=="null"?JSON.parse(window.localStorage.getItem('cart')):null
  const renderCart = () => {
    return cart.map((item) => {
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
    const total = cart.reduce((valorAnterior, valorActual) => {
      return valorAnterior + valorActual.total;
    }, 0);
    return <div>El precio final es: {total}</div>;
  };
  return (
    
    <div className="cart-area">
        {
            cart?<><div className="order-area">{renderCart()}</div>
            <div className="payment">
              <div>{calculateTotal()}</div>
              <div>
                <button>Pagar</button>
              </div>
            </div></>:<div  className="order-area"> No tienes articulos en tu carrito</div>
        }
      
    </div>
  );
};

export default Cart;
