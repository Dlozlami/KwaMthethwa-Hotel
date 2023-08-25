import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/footer";
import {
  fetchBookingsByID,
  calculateSubtotalAndTotal,
} from "../../features/bookingsSlice";
import BookingCard from "./bookingsCard";
import "./bookings.css";
import Totals from "../../components/totals/totals";

export default function Bookings() {
  const [reloadBookings, setReloadBookings] = useState(true);
  const { userData } = useSelector((store) => store.login);
  const { bookingsCart, total } = useSelector((store) => store.bookings);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Rendering total: ", total);
    dispatch(fetchBookingsByID(userData.id));
    dispatch(calculateSubtotalAndTotal());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div id="mainView">
        <section
          className="w3-card"
          style={{
            backgroundImage:
              "url('./assets/images/pexels-özge-taşkıran-12657320.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            textAlign: "center",
            color: "white",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          <div style={{ padding: "100px 0" }}>
            <h1>Confirm your reservations</h1>
            <p>
              Indulgence redefined: Immerse yourself in the beauty of our
              handpicked suite selection, each with its own story.
            </p>
          </div>
        </section>

        {bookingsCart.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            reload={() => setReloadBookings(reloadBookings)}
          />
        ))}
        {!total ? (
          <div
            className="w3-card"
            style={{
              marginBottom: "10px",
              flexDirection: "column",
              padding: "10px",
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <h4>No booked items</h4>
            <p>You have made no reservations.</p>
            <p>
              Please choose a suite, an experience or reserve a table at our
              restaurant.
            </p>
          </div>
        ) : null}
        <div
          className="w3-card"
          style={{
            marginBottom: "10px",
            flexDirection: "column",
            padding: "10px",
            width: "100%",
            backgroundColor: "white",
            height: "20vh",
            backgroundImage: "url('./assets/images/barcode.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <Totals />
      </div>

      <Footer />
    </>
  );
}
