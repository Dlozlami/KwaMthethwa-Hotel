import React, { useState } from "react";
import { format } from "date-fns";
import { LuCalendarDays, LuUser, LuEdit, LuTrash2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import BookingsModal from "../pages/checkout/bookingsModal";
import {
  deleteFromCart,
  fetchBookingsByID,
  calculateSubtotalAndTotal,
} from "../features/bookingsSlice";

export default function AllBookingsCard({ booking, reload }) {
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
    reload();
  };

  return (
    <>
      <div
        id="allbookingCard"
        className="w3-card w3-round-large"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
          borderRadius: "10%",
        }}
      >
        <div
          id="allbookingCard01"
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingBottom: "20px",
            backgroundColor: "white",
          }}
        >
          <h2
            style={{
              borderBottom: "1px gray solid",
              color: "gray",
              fontWeight: 700,
            }}
          >
            {booking.name} {booking.surname}
            <br />
          </h2>
          <p>{booking.email}</p>
          {booking.paid ? (
            <p style={{ color: "#006c67", fontWeight: 700 }}>Paid</p>
          ) : (
            <p style={{ color: "#ee6352", fontWeight: 700 }}>Not paid</p>
          )}
          <br />
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
        </div>

        <div
          id="allbookingCard02"
          style={{
            padding: "20px",
            backgroundColor: "#F2F2F2",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <div>
              <LuUser size={20} style={{ marginRight: "2vw" }} />
              <p>Guests: {booking.num_guest}</p>
            </div>
            <h4>
              {currencySymbol}{" "}
              {((booking.totalAmount * currency) / 100).toFixed(2)}
            </h4>
          </div>
          {booking.paid ? null : (
            <div id="editBookings">
              <LuEdit
                size={20}
                style={{ marginRight: "3vw" }}
                className="w3-ripple"
                onClick={openModal}
              />
              <LuTrash2
                size={20}
                className="w3-ripple"
                onClick={deleteBooking}
              />
            </div>
          )}
        </div>
      </div>
      <BookingsModal
        visible={modalVisible}
        close={closeModal}
        booking={booking}
        reload={reload}
      />
    </>
  );
}

function formatUnixTimestamp(timestamp) {
  const dateObject = new Date(timestamp);
  const formattedDateString = format(dateObject, "EEE, dd MMMM yyyy");
  return formattedDateString;
}
