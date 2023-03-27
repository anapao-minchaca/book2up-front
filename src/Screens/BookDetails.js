import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import store from "../Store/store";
import { setCart } from "../Store/slices/cartSlice";
import "./BookDetails.css";
const BookDetails = () => {
  const { id } = useParams();
  const book =
    useSelector((state) => state.books.find((book) => book.SKU === id)) ??
    JSON.parse(window.localStorage.getItem("book"));
  const cart = useSelector((state) => state.cart);
  const localCartItems = cart.cart;
  const disable = localCartItems ? localCartItems[book.SKU] : false;
  useEffect(() => {
    window.localStorage.setItem("book", JSON.stringify(book));
  }, [id, book]);

  const comprarLibro = async (SKU) => {
    if (localCartItems === null) {
      store.dispatch(setCart({ [SKU]: 1 }));
    } else {
      store.dispatch(setCart({ ...localCartItems, [SKU]: 1 }));
    }
    alert("Libro agregado al carrito");
  };
  return (
    <div className="details-area">
      <div className="left-container">
        <img src={book.img} alt={book.titulo} />
      </div>
      <div className="right-container">
        <div>
          <p>Titulo: {book.titulo}</p>
          <p>Autor: {book.autor}</p>
          <p>Sinopsis:{book.sin}</p>
          <p>Precio: {`$${book.precio}`}</p>
        </div>
        <div>
          <button onClick={() => comprarLibro(book.SKU)} disabled={disable}>
            {disable ? "En carrito" : "Comprar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
