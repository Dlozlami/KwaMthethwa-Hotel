import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/footer";
import {
  fetchBookingsByID,
  calculateSubtotalAndTotal,
} from "../../features/bookingsSlice";
import BookingCard from "./bookingsCard";
import "./bookings.css";

export default function Bookings() {
  const [reloadBookings, setReloadBookings] = useState(false);
  const { userData } = useSelector((store) => store.login);
  const { bookingsCart, total } = useSelector((store) => store.bookings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookingsByID(userData.id));
    dispatch(calculateSubtotalAndTotal());
    console.log("Rendering total: ", total);
    // eslint-disable-next-line
  }, [reloadBookings]);

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
        {console.log("Rendering total: ", total)}
        {bookingsCart.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            reload={() => setReloadBookings(!reloadBookings)}
          />
        ))}
        <div
          className="w3-card"
          style={{
            marginBottom: "10px",
            flexDirection: "column",
            padding: "10px",
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
      <Footer />
    </>
  );
}
