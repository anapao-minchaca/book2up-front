import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import store from "../Store/store";
import { setCart } from "../Store/slices/cartSlice";
import Rating from "@mui/material/Rating";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import "./BookDetails.css";
import swal from "sweetalert";

const ColorButton = styled(Button)(({ theme }) => ({
  color: "#eaeaea",
  backgroundColor: "#151111",
  "&:hover": {
    backgroundColor: "#476259",
  },
}));

const ColorDivider = styled(Divider)(({ theme }) => ({
  borderColor: "#d8d8d8",
}));

const BookDetails = () => {
  const matches = useMediaQuery("(max-width:1250px)");
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

  const truncate = (str, n) => {
    return str.length > n ? str.slice(0, n - 1) + " [...]" : str;
  };

  const comprarLibro = async (SKU) => {
    if (localCartItems === null) {
      store.dispatch(setCart({ [SKU]: 1 }));
    } else {
      store.dispatch(setCart({ ...localCartItems, [SKU]: 1 }));
    }
    //alert("Libro agregado al carrito");
    swal({
      text: "Libro agregado al carrito",
      icon: "success",
    });
  };
  return (
    <div className="books-details-wrap">
      <div className="card-background">
        <div className="box-books">
          <div className="inner-box-books">
            <div className="left-container">
              <img src={book.img} alt={book.titulo} />
            </div>
            <hr></hr>
            <div className="middle-container">
              <div>
                <p className="author"> {book.autor}</p>
                <p className="title"> {book.titulo}</p>
                <div className="rating">
                  <Rating
                    name="half-rating"
                    defaultValue={1}
                    value={Number(book.rating)}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <p className="no_rating">{book.count_rating} Ratings</p>
                </div>

                <p className="sinopsis">{truncate(book.sin, 600)}</p>
              </div>
              <div className="buttons-area">
                <ColorButton
                  onClick={() => comprarLibro(book.SKU)}
                  disabled={disable ? true : false}
                  variant="contained"
                  size={matches ? "small" : "medium"}
                  startIcon={<AddShoppingCartIcon />}
                >
                  {disable ? "En carrito" : `Comprar $${book.precio}`}
                </ColorButton>
                <Link to="/">
                  <ColorButton
                    onClick={() => console.log("a")}
                    variant="contained"
                    size={matches ? "small" : "medium"}
                    startIcon={<HomeIcon />}
                  >
                    Return Home
                  </ColorButton>
                </Link>
              </div>
            </div>
            <hr></hr>
            <div className="vertical-divider">
              <ColorDivider
                orientation="vertical"
                variant="middle"
                light
                absolute
              />
            </div>

            <div className="right-container">
              <div className="title">BOOK DETAILS</div>
              <div className="texto-libro-container">
                <div className="book-text-pair">
                  <div className="negritas">ISBN-10: </div>
                  <div className="texto">{book.SKU}</div>
                </div>
                <div className="book-text-pair">
                  <div className="negritas">Genre: </div>
                  <div className="texto">{book.genre}</div>
                </div>
                <div className="book-text-pair">
                  <div className="negritas">Year: </div>
                  <div className="texto">{book.year}</div>
                </div>
                <div className="book-text-pair">
                  <div className="negritas">Num pages: </div>
                  <div className="texto">{book.num_pages}</div>
                </div>
                <div className="book-text-pair">
                  <div className="negritas">Rating: </div>
                  <div className="texto">{book.rating}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
