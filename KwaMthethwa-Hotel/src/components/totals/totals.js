import React, { useEffect } from "react";
import "./totals.css";
import { useSelector, useDispatch } from "react-redux";
import "./totals.css";
import {
  payNow,
  calculateSubtotalAndTotal,
} from "../../features/bookingsSlice";

export default function Totals() {
  const { userData } = useSelector((store) => store.login);
  const { bookingsCart, total, subtotal, VAT, currencySymbol } = useSelector(
    (store) => store.bookings
  );
  const dispatch = useDispatch();

  const handlePayNow = async () => {
    try {
      const url = await dispatch(
        payNow({ email: userData.email, amount: total })
      );
      //console.log("This is checkoutData", url);
      if (url) {
        window.location.href = url.payload.authorization_url;
      } else {
        console.log("Checkout URL not provided.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(calculateSubtotalAndTotal());
  }, [bookingsCart, dispatch]);

  return (
    <div className="totalContainer">
      <div style={{ borderBottom: "1px white solid", paddingBottom: "10px" }}>
        <div className="flexRowApart">
          <span className="subtotal">Subtotal</span>
          <span className="subtotal">{(subtotal / 100).toFixed(2)}</span>
        </div>
        <div className="flexRowApart">
          <span className="subtotal">VAT @ 15%</span>
          <span className="subtotal">
            {(Math.floor(subtotal * VAT) / 100).toFixed(2)}
          </span>
        </div>
      </div>
      <br />
      <div>
        <div className="flexRowApart">
          <span className="total">TOTAL</span>
          <span className="total">
            {currencySymbol} {(total / 100).toFixed(2)}
          </span>
        </div>
        <div className="payBTN w3-ripple" onClick={handlePayNow}>
          Pay Now
        </div>
      </div>
    </div>
  );
}