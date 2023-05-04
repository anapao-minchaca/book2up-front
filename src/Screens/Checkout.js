import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PaymentsIcon from "@mui/icons-material/Payments";

import CheckoutSummary from "../Components/CheckoutSummary";
import "./Checkout.css";

const Checkout = (props) => {
  const [method, setMethod] = useState(true);
  const location = useLocation();

  // console.log(getBooksInCart());
  // console.log(location.state);
  const tmpSummary = location.state;

  return (
    <div className="main">
      <div className="box-checkout">
        <div className="checkout-container">
          <h1 className="checkout-heading">
            <ShoppingBasketIcon fontSize="large" /> Shopping Cart
          </h1>

          <div className="checkout-item-flex">
            <section className="checkout-checkout">
              <h2 className="checkout-section-heading">Payment Details</h2>

              <div className="checkout-payment-form">
                <div className="checkout-payment-method">
                  <button
                    className={
                      method ? "checkout-method selected" : "checkout-method"
                    }
                    onClick={() => setMethod(!method)}
                  >
                    <CreditCardIcon fontSize="small" />
                    <span>Credit Card</span>
                    {method ? (
                      <CheckCircleIcon
                        className="checkmark fill"
                        fontSize="small"
                      />
                    ) : (
                      <CheckCircleOutlineOutlinedIcon
                        className="checkmark"
                        fontSize="small"
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setMethod(!method)}
                    className={
                      !method ? "checkout-method selected" : "checkout-method"
                    }
                  >
                    <PaymentsIcon fontSize="small" />
                    <span>Paypal</span>
                    {!method ? (
                      <CheckCircleIcon
                        className="checkmark fill"
                        fontSize="small"
                      />
                    ) : (
                      <CheckCircleOutlineOutlinedIcon
                        className="checkmark"
                        fontSize="small"
                      />
                    )}
                  </button>
                </div>
                <form action="#">
                  <div className="cardholder-name">
                    <label className="label-default" htmlFor="cardholder-name">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      className="input-default"
                      name="cardholder-name"
                      id="cardholder-name"
                    />
                  </div>
                  <div className="card-number">
                    <label className="label-default" htmlFor="card-number">
                      Card number
                    </label>
                    <input
                      type="number"
                      id="card-number"
                      className="input-default"
                      name="card-number"
                    />
                  </div>

                  <div className="input-flex">
                    <div className="expire-date">
                      <label htmlFor="expire-date" className="label-default">
                        Expiration date
                      </label>
                      <div className="input-flex">
                        <input
                          type="number"
                          name="day"
                          id="expire-date"
                          className="input-default"
                          placeholder="31"
                          min={1}
                          max={31}
                        />
                        /
                        <input
                          type="number"
                          name="month"
                          id="expire-date"
                          className="input-default"
                          placeholder="12"
                          min={1}
                          max={12}
                        />
                      </div>
                    </div>

                    <div className="cvv">
                      <label className="label-default" htmlFor="cvv">
                        CVV
                      </label>
                      <input
                        type="number"
                        id="cvv"
                        className="input-default"
                        name="cvv"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </section>

            <section className="checkout-cart">
              <CheckoutSummary checkoutSummary={tmpSummary} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
