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
      if (libro) {
        elements.push({ ...libro });
      }
    }
    //elements.push(total);
    return elements;
  };

  // const renderHistory = () => {
  //   return purchasedHistory.map((purchase) => {
  //     const elementsInCart = mapObject(purchase);
  //     return (
  //       <div className="single-cart">
  //         {elementsInCart.map((element, index) => {
  //           return index + 1 !== elementsInCart.length ? (
  //             <div className="book">
  //               <div className="item">{element.titulo}</div>
  //               <div className="item">{element.cantidad}</div>
  //             </div>
  //           ) : (
  //             <div>{`Total: ${element}`}</div>
  //           );
  //         })}
  //       </div>
  //     );
  //   });
  // };

  const renderHistoryV2 = () => {
    return purchasedHistory.map((purchase, indice) => {
      const elementsInCart = mapObject(purchase);

      return (
        <React.Fragment key={indice}>
          {elementsInCart.map((element, index) => {
            console.log(element.titulo);
            return (
              <li key={index}>
                <img alt="book" src={element.img} className="book-img-hist" />
              </li>
            );
          })}
        </React.Fragment>
      );
    });
  };

  return purchasedHistory.length > 0 ? (
    <div className="history-wrapper">
      <div className="history-container">
        <ul>{renderHistoryV2()}</ul>
      </div>
    </div>
  ) : (
    <div className="no-history">No has realizado ninguna compra</div>
  );
};

export default History;
