import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NewTableInventory from "./NewTableInventory";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import "./ModalCart.css";

const ModalCart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (window.localStorage.getItem("cart") !== "null") {
      setCart(JSON.parse(window.localStorage.getItem("cart")));
    } else {
      setCart(null);
    }
  }, []);

  const books = useSelector((state) => state.books);
  const getBooksInCart = () => {
    var booksInCart = [];
    for (let sku in cart) {
      const { titulo, precio, SKU, autor, img } = books.find(
        (book) => book.SKU === sku
      );
      booksInCart.push({
        titulo: titulo,
        author: autor,
        cantidad: cart[sku],
        precio: precio,
        SKU: SKU,
        img: img,
      });
    }

    return booksInCart;
  };

  return (
    <div className="main-container">
      <div className="modal-header">
        <div className="modal-title">My Cart</div>
        <Button
          size=""
          variant="text"
          className="button-go-checkout"
          disabled={getBooksInCart().length === 0 || getBooksInCart() === null}
        >
          <Link
            to="/checkout"
            style={{ textDecoration: "none", listStyleType: "none" }}
          >
            Checkout{" "}
          </Link>
        </Button>
      </div>
      <div className="product-display-cart">
        <div className="product-display-box">
          <div className="product-display-item">
            {getBooksInCart().length === 0 || getBooksInCart() === null ? (
              <div className="no-items">No Items In Cart</div>
            ) : (
              <div>
                <NewTableInventory elementos={getBooksInCart()} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
//

export default ModalCart;
