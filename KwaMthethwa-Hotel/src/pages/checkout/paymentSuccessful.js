import React, { useEffect } from "react";
import Footer from "../../components/footer/footer";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBookingsByID,
  calculateSubtotalAndTotal,
  updateBooking,
} from "../../features/bookingsSlice";
// eslint-disable-next-line
import { updateReceipt, getReceiptByRef } from "../../features/receiptSlice";

export default function Successful() {
  const { userData } = useSelector((store) => store.login);
  const { bookingsCart } = useSelector((store) => store.bookings);
  const { receiptByRef } = useSelector((store) => store.receipt);
  const today = new Date();
  const searchParams = new URLSearchParams(window.location.search);
  const ref = searchParams.get("reference");

  const dispatch = useDispatch();
  const confirmPaid = async () => {
    for (const booking of bookingsCart) {
      dispatch(updateBooking([{ paid: true }, booking._id]));
      console.log("paymentSuccessfull line 15 booking._id:", booking._id);
    }
    console.log("paymentSuccessfull line 19 render:");
    //dispatch(updateReceipt([]));
    //dispatch(updateReceipt([]));
  };

  useEffect(() => {
    dispatch(getReceiptByRef(ref));
    dispatch(fetchBookingsByID(userData.id));
    dispatch(calculateSubtotalAndTotal());
    confirmPaid();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div id="mainView">
        <div className=" w3-card-4 w3-round-large w3-white">
          <div
            style={{
              border: "none",
              borderBottom: "1px black solid",
              backgroundColor: "#d4af37",
              padding: 20,
            }}
          >
            <h1
              style={{
                fontWeight: "500",
              }}
            >
              Receipt #{ref}
            </h1>
            <p>
              Payment sucessful
              <br />
              <span style={{ color: "#e3d7ff", fontWeight: 700 }}>
                {today.toUTCString()}
              </span>
            </p>
            <br />
          </div>
          <br />
          <div style={{ borderBottom: "1px black solid", padding: "20px" }}>
            <p style={{ fontSize: 18, fontWeight: 700 }}>
              {receiptByRef.name} {receiptByRef.surname}
            </p>
            <p>{receiptByRef.email}</p>
            <br />
          </div>
          <div style={{ borderBottom: "1px black solid", padding: "20px" }}>
            <p>receipt items</p>
            <br />
          </div>
          <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Subtotal</span>
              <span>{receiptByRef.subtotal}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>VAT @ 15.0%</span>
              <span>{receiptByRef.vat}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              <span>Total</span>
              <span>{receiptByRef.total}</span>
            </div>

            <br />
          </div>
          <br /> <br />
          <div
            className="w3-card"
            style={{
              marginBottom: "20px",
              width: "100%",
              backgroundColor: "white",
              height: "10vh",
              backgroundImage: "url('./assets/images/barcode.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </div>
      <Footer />
    </>
  );
}
