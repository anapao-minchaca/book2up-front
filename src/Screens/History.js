import React from "react";
import { useSelector } from "react-redux";
import "./History.css";
const History = () => {
  const purchasedHistory = useSelector((state) => state.history);
  const books = useSelector((state) => state.books);
  const mapObject = (cart) => {
    let elements = [];

    const { productos } = cart;
    for (let producto in productos) {
      let libro = books.find((book) => book.SKU === producto);
      elements.push({ ...libro, cantidad: productos[producto] });
    }
    const purchaseTotal = elements.reduce((valorAnterior, valorActual) => {
      return valorAnterior + valorActual.precio * valorActual.cantidad;
    }, 0);
    elements.push(purchaseTotal);
    return elements;
  };

  const renderHistory = () => {
    return purchasedHistory.map((purchase) => {
      const elementsInCart = mapObject(purchase);
      return (
        <div className="single-cart">
          {elementsInCart.map((element, index) => {
            return index + 1 !== elementsInCart.length ? (
              <div className="book">
                <div className="item">{element.titulo}</div>
                <div className="item">{element.cantidad}</div>
              </div>
            ) : (
              <div>{`Total: ${element}`}</div>
            );
          })}
        </div>
      );
    });
  };
  return purchasedHistory.length > 0 ? (
    <div className="history-container">{renderHistory()}</div>
  ) : (
    <div className="no-history">No has realizado ninguna compra</div>
  );
};

export default History;
