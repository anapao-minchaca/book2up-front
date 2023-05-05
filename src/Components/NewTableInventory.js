import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import store from "../Store/store";
import { setCart } from "../Store/slices/cartSlice";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import "./NewTableInventory.css";
import swal from "sweetalert";

const NewTableInventory = ({ elementos }) => {
  const [quantity, setQuantity] = useState(null);

  const [loading, setLoading] = useState(false);
  const [elementsInCart, setElementsInCart] = useState(elementos);

  useEffect(() => {
    setLoading(true);
    let object = {};
    elementos.forEach((element) => {
      object = { ...object, [element.SKU]: element.cantidad };
    });
    setQuantity(object);
    setLoading(false);
  }, [elementos]);

  const deleteFromCart = (SKU) => {
    let newElements = [];
    let updatedCart = {};
    for (let key in quantity) {
      if (key !== SKU) {
        updatedCart = { ...updatedCart, [key]: quantity[key] };
      }
    }
    elementsInCart.forEach((element) => {
      if (element.SKU !== SKU) {
        newElements.push(element);
      }
    });
    setQuantity(updatedCart);
    if (Object.keys(updatedCart).length !== 0) {
      store.dispatch(setCart(updatedCart));
      setElementsInCart(newElements);
    } else {
      store.dispatch(setCart(null));
      setElementsInCart(null);
    }
    swal({
      text: "El libro se ha eliminado del carrito",
      icon: "info",
    });
  };

  const renderElements = () => {
    return elementsInCart.map((item) => {
      return (
        <div key={item.SKU} className="item-container">
          <hr className="modal-hr" />
          <div className="item-subcontainer">
            <div className="item-img">
              <img alt="cover" src={item.img} />
            </div>
            <div className="item-description">
              <div className="item-autor">{item.author}</div>
              <div className="item-titulo">{item.titulo}</div>
              <div className="price-edit">
                <div className="item-price">{`$ ${item.precio}`}</div>
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    deleteFromCart(item.SKU);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return loading ? (
    <LoadingSpinner />
  ) : elementsInCart ? (
    <div className="cart-zone-items">{renderElements()}</div>
  ) : (
    <div className="no-items">No Items In Cart</div>
  );
};
export default NewTableInventory;
