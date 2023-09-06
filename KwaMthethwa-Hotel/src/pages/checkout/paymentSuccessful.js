import React, { useEffect } from "react";
import Footer from "../../components/footer/footer";
import { useSelector, useDispatch } from "react-redux";
import { updateBooking } from "../../features/bookingsSlice";

export default function Successful() {
  const searchParams = new URLSearchParams(window.location.search);
  const ref = searchParams.get("reference");
  const { bookingsCart } = useSelector((store) => store.bookings);
  const dispatch = useDispatch();
  const confirmPaid = async () => {
    for (const booking of bookingsCart) {
      dispatch(updateBooking([{ paid: true }, booking._id]));
    }
  };

  useEffect(() => {
    confirmPaid();
  });

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
              Payment sucessful | Date:
              <span style={{ color: "#006c67", fontWeight: 700 }}>
                12/06/2023
              </span>
            </p>
            <br />
          </div>
          <br />
          <div style={{ padding: "20px" }}>
            <label htmlFor="id">Username</label>
            <input type="text" id="id" className="w3-round" />
            <br />
            <label htmlFor="id">Password</label>
            <br />
            <input type="password" id="password" className="w3-round" />
            <br />
            <br />
            <br />
            <br /> <br />
            <div
              className="w3-card"
              style={{
                marginBottom: "10px",
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
      </div>
      <Footer />
    </>
  );
}
