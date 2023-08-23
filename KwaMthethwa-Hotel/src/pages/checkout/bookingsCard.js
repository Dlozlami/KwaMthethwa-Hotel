import React, { useState } from "react";
import { format } from "date-fns";
import { LuCalendarDays, LuUser, LuEdit, LuTrash2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import BookingsModal from "./bookingsModal";
import {
  deleteFromCart,
  fetchBookingsByID,
  calculateSubtotalAndTotal,
} from "../../features/bookingsSlice";

export default function BookingCard({ booking }) {
  const { userData } = useSelector((store) => store.login);
  const { currencySymbol, currency } = useSelector((store) => store.bookings);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const deleteBooking = () => {
    dispatch(deleteFromCart(booking._id));
    dispatch(fetchBookingsByID(userData.id));
    dispatch(calculateSubtotalAndTotal());
  };

  return (
    <>
      <div
        id="bookingCard"
        className="w3-card w3-round-large"
        style={{
          display: "flex",
          marginBottom: "10px",
          borderRadius: "10%",
          width: "100%",
        }}
      >
        <div
          id="bookingCard00"
          style={{
            backgroundImage: `url(${booking.imageurl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div
          id="bookingCard01"
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingBottom: "20px",
            backgroundColor: "white",
          }}
        >
          <h3>{booking.title}</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <LuCalendarDays size={40} />
            <p>
              <span>from: </span>
              {formatUnixTimestamp(booking.startDate)} | 14:00
              <br />
              <span>until: </span>
              {formatUnixTimestamp(booking.endDate)} | 11:00
            </p>
          </div>

          <p style={{ borderTop: "1px gray solid", color: "gray" }}>
            {booking.description}
          </p>
        </div>

        <div
          id="bookingCard02"
          style={{
            padding: "20px",
            backgroundColor: "#F2F2F2",
            display: "flex",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <LuUser size={20} style={{ marginRight: "2vw" }} />
              <p>Guests: {booking.num_guest}</p>
            </div>
            <p>
              {currencySymbol}{" "}
              {((booking.rateInCent * currency) / 100).toFixed(2)}
            </p>
          </div>
          <div
            id="editBookings"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <LuEdit
              size={20}
              style={{ marginRight: "3vw" }}
              className="w3-ripple"
              onClick={openModal}
            />
            <LuTrash2 size={20} className="w3-ripple" onClick={deleteBooking} />
          </div>
        </div>
      </div>
      <BookingsModal
        visible={modalVisible}
        close={closeModal}
        booking={booking}
      />
    </>
  );
}

function formatUnixTimestamp(timestamp) {
  const dateObject = new Date(timestamp);
  const formattedDateString = format(dateObject, "EEE, dd MMMM yyyy");
  return formattedDateString;
}
