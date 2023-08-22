import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/footer";
import { fetchBookingsByID } from "../../features/bookingsSlice";

import "./bookings.css";

export default function Bookings() {
  const { id } = useSelector((store) => store.login);
  const { bookingsCart } = useSelector((store) => store.bookings);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBookingsByID(id));
  });

  return (
    <>
      <div id="mainView">
        Bookings Cart length: {bookingsCart ? bookingsCart.length : 0}
      </div>

      <Footer />
    </>
  );
}
