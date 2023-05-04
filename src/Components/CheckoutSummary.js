import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import LoadingSpinner from "./LoadingSpinner";

import store from "../Store/store";
import instance from "../api/book2up";
import { useNavigate } from "react-router-dom";
import { setCart } from "../Store/slices/cartSlice";
import { setHistory } from "../Store/slices/historySlice";
import swal from "sweetalert";

const CheckoutSummary = ({ checkoutSummary }) => {
  const [quantity, setQuantity] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [elementsInCart, setElementsInCart] = useState(checkoutSummary);
  useEffect(() => {
    setLoading(true);
    let object = {};
    checkoutSummary.forEach((element) => {
      object = { ...object, [element.SKU]: element.cantidad };
    });
    setQuantity(object);
    setLoading(false);
  }, [checkoutSummary]);

  console.log(quantity);

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
      navigate("/");
    }
    swal({
      text: "El libro se ha eliminado del carrito",
      icon: "info",
    });
  };

  const calculateTotal = () => {
    const total = elementsInCart.reduce((valorAnterior, valorActual) => {
      return valorAnterior + valorActual.precio;
    }, 0);
    return total;
  };

  const renderElements = () => {
    return elementsInCart.map((item) => {
      return (
        <div className="product-card">
          <div className="checkout-card">
            <div className="img-box">
              <img
                alt="a"
                src={item.img}
                className="product-img"
                width="80px"
              />
            </div>
            <div className="detail">
              <h4 className="product-name">{item.titulo}</h4>
              <div className="wrapper">
                <div className="price">
                  $ <span id="price">{item.precio}</span>
                </div>
              </div>
            </div>
            <button
              className="product-close-btn"
              onClick={() => deleteFromCart(item.SKU)}
            >
              <CloseIcon fontSize="small" />
            </button>
          </div>
        </div>
      );
    });
  };
  const purchaseELements = async () => {
    const cartItem = { productos: quantity, total: calculateTotal() };
    try {
      const response = await instance.post("/purchase", cartItem);
      store.dispatch(setCart(null));
      const updatedHistory = await instance.get("/purchase-history");
      store.dispatch(setHistory(updatedHistory.data));
      swal({
        text: response.data,
        icon: "success",
      });
      //alert(response.data);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };
  return loading ? (
    <LoadingSpinner />
  ) : elementsInCart ? (
    <div className="checkout-cart-item-box">
      <h2 className="checkout-section-heading">Order Summary</h2>
      {renderElements()}
      <button className="btn btn-primary" onClick={() => purchaseELements()}>
        <b>Pay</b> $ <span id="payAmount">{calculateTotal()}</span>
      </button>
    </div>
  ) : (
    <></>
  );
};

export default CheckoutSummary;
