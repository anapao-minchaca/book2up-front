import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../Components/Pagination";
//import store from "../Store/store";
import "./Books.css";
// import { setCart } from "../Store/slices/cartSlice";
// import swal from "sweetalert";

const Books = () => {
  const books = useSelector((state) => state.books);
  //const localCart = useSelector((state) => state.cart);
  //const localCartItems = localCart.cart;
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  // const comprarLibro = (SKU) => {
  //   if (localCartItems === null) {
  //     store.dispatch(setCart({ [SKU]: 1 }));
  //   } else {
  //     store.dispatch(setCart({ ...localCartItems, [SKU]: 1 }));
  //   }
  //   //alert("Libro agregado al carrito");
  //   swal({
  //     text: "Libro agregado al carrito",
  //     icon: "success",
  //   });
  // };

  const indexOfLastPost = currentPage * booksPerPage;
  const indexofFirstPost = indexOfLastPost - booksPerPage;
  const currentPosts = books.slice(indexofFirstPost, indexOfLastPost);

  const paginate = (number) => {
    setCurrentPage(number);
  };

  const generateBooks = () => {
    return currentPosts.map((book) => {
      //const disable = localCartItems ? localCartItems[book.SKU] : false;
      return (
        <div className="book-display" key={book.SKU}>
          <div className="card-container">
            <div className="card"></div>
            <div className="image-container">
              <Link to={`/book/${book.SKU}`}>
                <img src={book.img} alt={book.titulo} className="image" />
              </Link>
            </div>
          </div>
          <div className="info">
            <p className="title-book">{book.titulo}</p>
            <p className="author">{book.autor}</p>
            <p className="price">{`$ ${book.precio}`}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="books-area">{generateBooks()}</div>
      <Pagination
        postPerPage={booksPerPage}
        totalPosts={books.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
};

export default Books;

//  <div className="button-holder">
//    <div className="buttons">
//      <Link to={`/book/${book.SKU}`}>
//        <button className="comprar-buton">Detalles</button>
//      </Link>
//    </div>
//    <div className="buttons">
//      <button
//        onClick={() => comprarLibro(book.SKU)}
//        disabled={disable}
//        className={disable ? "en-carrito" : "comprar-boton"}
//      >
//        {disable ? "En carrito" : "Comprar"}
//      </button>
//    </div>
//  </div>;
