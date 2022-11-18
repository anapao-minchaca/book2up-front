import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import "./Books.css";
const Books = () => {
  const books = useSelector((state) => state.books);
  const comprarLibro = (SKU) => {
    console.log(SKU);
  };
  const generateBooks = () => {
    
    return books.map((book) => {
      return (
        <div className="card" key={book.SKU}>
          <img src={book.img} alt={book.titulo}  className="image"/>
          <div className="info">
            <h1>{book.titulo}</h1>
            <p>{book.autor}</p>
            <p className="price">{`$ ${book.precio}`}</p>
          </div>
          <div className="button-holder">
            <div className="buttons">
                <Link to={`/book/${book.SKU}`}>  <button className="comprar-buton">Detalles</button> </Link>
            </div>
            <div className="buttons">
              <button
                onClick={() => comprarLibro(book.SKU)}
                className="comprar-buton"
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
      );
    });
  };
  return <div className="books-area">{generateBooks()}</div>;
};

export default Books;
