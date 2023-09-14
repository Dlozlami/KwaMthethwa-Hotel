import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/footer";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBookingsByID,
  calculateSubtotalAndTotal,
  updateBooking,
} from "../../features/bookingsSlice";
import { LuUser } from "react-icons/lu";
import { updateReceipt, getReceiptByRef } from "../../features/receiptSlice";
import Preloader from "../../components/preloader/preloader";
const { formatNumberWithSpaces } = require("../../components/utils");

export default function Successful() {
  const { userData } = useSelector((store) => store.login);
  const { bookingsCart } = useSelector((store) => store.bookings);
  const { receiptByRef } = useSelector((store) => store.receipt);
  const [loader, setLoader] = useState(true);

  const today = new Date();
  const searchParams = new URLSearchParams(window.location.search);
  const ref = searchParams.get("reference");
  console.log("paymentSuccessfull line 24 render:");
  const dispatch = useDispatch();

  const confirmPaid = async () => {
    const receipt = await dispatch(getReceiptByRef(ref));
    dispatch(fetchBookingsByID(userData.id));
    dispatch(calculateSubtotalAndTotal());
    for (const booking of bookingsCart) {
      dispatch(updateBooking([{ paid: true }, booking._id]));
      //console.log("paymentSuccessfull line 15 booking._id:", booking._id);
    }
    console.log(
      "paymentSuccessfull line 35 receipt id:",
      receipt.payload[0]._id
    );
    dispatch(
      updateReceipt([receipt.payload[0]._id, { payment_date: today.getTime() }])
    );
    setLoader(false);
  };

  useEffect(() => {
    confirmPaid();
    console.log("paymentSuccessfull line 40  UseEffect:");
    return () => {};
  });

  return (
    <>
      <div id="mainView">
        {receiptByRef.hasOwnProperty("receiptItems") ? (
          <div
            className=" w3-card-4 w3-round-large w3-white"
            style={{ width: "90%" }}
          >
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
                Receipt #<span style={{ fontFamily: "monospace" }}>{ref}</span>
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
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px #006c67 solid",
                  fontWeight: 700,
                  color: "#006c67",
                }}
              >
                <p style={{ width: "55%" }}>Item</p>
                <p style={{ width: "15%" }}>
                  <LuUser size={20} />
                </p>
                <p style={{ width: "30%" }}>Rate</p>
              </div>
              <br />

              {receiptByRef.receiptItems.map((item) => (
                <div style={{ display: "flex" }} key={item._id}>
                  <p style={{ width: "55%" }}>{item.title}</p>
                  <p style={{ width: "15%" }}>{item.num_guest}</p>
                  <p style={{ width: "30%" }}>
                    {formatNumberWithSpaces(item.rateInCents / 100)}
                  </p>
                </div>
              ))}
              <br />
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal</span>
                <span>{formatNumberWithSpaces(receiptByRef.subtotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>VAT @ 15.0%</span>
                <span>{formatNumberWithSpaces(receiptByRef.vat)}</span>
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
                <span>
                  {receiptByRef.currencySymbol}{" "}
                  {formatNumberWithSpaces(receiptByRef.total)}
                </span>
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
        ) : null}
      </div>
      <Preloader visible={loader} />
      <Footer />
    </>
  );
}
