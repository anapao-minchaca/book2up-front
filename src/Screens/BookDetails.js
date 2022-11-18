import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./BookDetails.css";
const BookDetails = () => {
  const { id } = useParams();
  const book = useSelector((state) =>state.books.find((book) => book.SKU === id))?? window.localStorage.getItem('book');
  useEffect(() => {
    window.localStorage.setItem('book', JSON.stringify(book));
  }, [id]);

  const comprarLibro = async (SKU) => {
    console.log(SKU);
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
          <button onClick={() => comprarLibro(book.SKU)}>Comprar</button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
