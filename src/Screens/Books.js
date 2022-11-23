import React, {useState} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../Components/Pagination";
import "./Books.css";
const Books = () => {
  const books = useSelector((state) => state.books);
  const [currentPage, setCurrentPage] = useState(1)
  const booksPerPage = 12
  const comprarLibro = (SKU) => {
    console.log(SKU);
  };
  const indexOfLastPost = currentPage * booksPerPage
  const indexofFirstPost = indexOfLastPost - booksPerPage
  const currentPosts = books.slice(indexofFirstPost,indexOfLastPost)
  const paginate =(number)=>{
    setCurrentPage(number)
  }
  const generateBooks = () => {
    return currentPosts.map((book) => {
      return (
        <div className="card" key={book.SKU}>
          <img src={book.img} alt={book.titulo} className="image" />
          <div className="info">
            <h1>{book.titulo}</h1>
            <p>{book.autor}</p>
            <p className="price">{`$ ${book.precio}`}</p>
          </div>
          <div className="button-holder">
            <div className="buttons">
              <Link to={`/book/${book.SKU}`}>
                {" "}
                <button className="comprar-buton">Detalles</button>{" "}
              </Link>
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
  return (
    <>
      <div className="books-area">{generateBooks()}</div>
      <Pagination postPerPage={booksPerPage} totalPosts={books.length} paginate={paginate}/>
    </>
  );
};

export default Books;
