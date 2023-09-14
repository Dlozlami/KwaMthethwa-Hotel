import React, { useEffect, useState } from "react";
import "./totals.css";
import { useSelector, useDispatch } from "react-redux";
import "./totals.css";
import {
  payNow,
  calculateSubtotalAndTotal,
  updateBooking,
} from "../../features/bookingsSlice";
import Preloader from "../preloader/preloader";
import { addReceipt } from "../../features/receiptSlice";
const { formatNumberWithSpaces } = require("../../components/utils");

export default function Totals() {
  const [loader, setLoader] = useState(false);
  const { userData } = useSelector((store) => store.login);
  const { bookingsCart, total, subtotal, VAT, currencySymbol } = useSelector(
    (store) => store.bookings
  );

  const dispatch = useDispatch();

  const handlePayNow = async () => {
    setLoader(true);
    try {
      const url = await dispatch(
        payNow({ email: userData.email, amount: total })
      );
      //console.log("This is checkoutData", url);
      addPaymentRef(url.payload.reference);

      if (url) {
        window.location.href = url.payload.authorization_url;
      } else {
        console.log("Checkout URL not provided.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addPaymentRef = async (ref) => {
    for (const booking of bookingsCart) {
      dispatch(updateBooking([{ payment_ref: ref }, booking._id]));
    }
    const newReceipt = {
      user_id: userData.id,
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      subtotal: (subtotal / 100).toFixed(2),
      vat: (Math.floor(subtotal * VAT) / 100).toFixed(2),
      total: (total / 100).toFixed(2),
      payment_ref: ref,
      payment_date: null,
      receiptItems: [],
      currencySymbol: currencySymbol,
    };
    dispatch(addReceipt(newReceipt));
  };

  useEffect(() => {
    dispatch(calculateSubtotalAndTotal());
  }, [bookingsCart, dispatch]);

  return (
    <>
      <div className="totalContainer">
        <div style={{ borderBottom: "1px white solid", paddingBottom: "10px" }}>
          <div className="flexRowApart">
            <span className="subtotal">Subtotal</span>
            <span className="subtotal">
              {formatNumberWithSpaces(subtotal / 100)}
            </span>
          </div>
          <div className="flexRowApart">
            <span className="subtotal">VAT @ 15%</span>
            <span className="subtotal">
              {formatNumberWithSpaces(Math.floor(subtotal * VAT) / 100)}
            </span>
          </div>
        </div>
        <br />
        <div>
          <div className="flexRowApart">
            <span className="total">TOTAL</span>
            <span className="total">
              {currencySymbol} {formatNumberWithSpaces(total / 100)}
            </span>
          </div>
          <div className="payBTN w3-ripple" onClick={handlePayNow}>
            Pay Now
          </div>
        </div>
      </div>
      <Preloader visible={loader} />
    </>
  );
}
