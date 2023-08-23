import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

import { differenceInDays } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { addBookingToCart } from "../../features/bookingsSlice";

export default function BookingsModal({ visible, close, booking }) {
  const { discount_programme, discount_rate } = useSelector(
    (store) => store.bookings
  );
  const { userData } = useSelector((store) => store.login);
  const dispatch = useDispatch();
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [numGuests, setNumGuests] = useState(1);

  const handleRoomBooking = () => {
    let nights = differenceInDays(
      new Date(departureDate),
      new Date(arrivalDate)
    );
    console.log("nights: ", nights);
    const roomBooking = {
      user_id: userData.id,
      title: booking.title,
      startDate: new Date(arrivalDate).getTime(),
      endDate: new Date(departureDate).getTime(),
      num_guest: numGuests,
      num_courses: null,
      event_time: null,
      rateInCent: booking.rateInCent,
      type: "suites",
      description: booking.description,
      discount_programme: null,
      discount_rate: discount_programme,
      imageurl: booking.imageURLs[0],
      totalAmount:
        (booking.rateInCent - discount_rate * booking.rateInCent) *
        numGuests *
        nights,
      paid: false,
      payment_ref: null,
    };
    console.log("New booking: ", roomBooking);
    dispatch(addBookingToCart(roomBooking));
  };

  return (
    <div
      className="modal"
      style={{
        display: visible ? "block" : "none",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        padding: "20px",
        zIndex: 10,
      }}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          width: "90vw",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <div>
            <h2>{booking.title}</h2>
          </div>
          <div>
            <button
              className="close-button"
              onClick={close}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              <IoCloseCircle size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
