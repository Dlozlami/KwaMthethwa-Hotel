import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

import { differenceInDays } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { updateBooking } from "../../features/bookingsSlice";

export default function BookingsModal({ visible, close, booking, reload }) {
  const { discount_programme, discount_rate } = useSelector(
    (store) => store.bookings
  );
  const { userData } = useSelector((store) => store.login);
  const dispatch = useDispatch();
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [numGuests, setNumGuests] = useState(1);
  //console.log("bookingsModal line 17 booking: ", booking);
  const handleRoomBooking = () => {
    let nights = differenceInDays(
      new Date(departureDate),
      new Date(arrivalDate)
    );
    console.log("nights: ", nights);
    const bookingData = {
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
      imageurl: booking.imageURLs,
      totalAmount:
        (booking.rateInCent - discount_rate * booking.rateInCent) *
        numGuests *
        nights,
      paid: false,
      payment_ref: null,
      payment_date: null,
    };
    console.log("New booking update: ", bookingData);
    dispatch(updateBooking([bookingData, booking._id]));
    reload();
    close();
  };

  return (
    <div
      className="modal"
      style={{
        display: visible ? "block" : "none",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
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
          style={{
            padding: "10px",
          }}
        >
          <h3>Edit suite booking</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <label style={{ marginBottom: "10px" }}>
              Arrival Date:
              <br />
              <input
                type="date"
                value={arrivalDate}
                onChange={(event) => setArrivalDate(event.target.value)}
              />
            </label>
            <br />
            <label style={{ marginBottom: "10px" }}>
              Departure Date:
              <br />
              <input
                type="date"
                value={departureDate}
                onChange={(event) => setDepartureDate(event.target.value)}
              />
            </label>

            <label style={{ marginBottom: "10px" }}>
              Guests:
              <br />
              <select
                value={numGuests}
                onChange={(event) =>
                  setNumGuests(parseInt(event.target.value, 10))
                }
              >
                <option value={1}>1 guest</option>
                <option value={2}>2 guests</option>
              </select>
            </label>
          </div>
          <button
            className="w3-ripple"
            style={{
              fontSize: "15px",
              padding: "10px",
              backgroundColor: "#006c67",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              textDecoration: "none",
              height: "5vh",
              marginRight: "3vw",
            }}
            onClick={handleRoomBooking}
          >
            Save changes
          </button>
          <button
            className="w3-ripple"
            style={{
              fontSize: "15px",
              padding: "10px",
              backgroundColor: "#006c67",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              textDecoration: "none",
              height: "5vh",
            }}
            onClick={close}
          >
            Cancel
          </button>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
