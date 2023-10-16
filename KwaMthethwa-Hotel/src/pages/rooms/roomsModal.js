import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { RxDimensions } from "react-icons/rx";
import { differenceInDays } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { addBookingToCart } from "../../features/bookingsSlice";
import { useNavigate } from "react-router-dom";

export default function RoomsModal({ visible, close, room }) {
  const { discount_programme, discount_rate } = useSelector(
    (store) => store.bookings
  );
  const { userData } = useSelector((store) => store.login);
  const navigate = useNavigate();
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
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      title: room.title,
      startDate: new Date(arrivalDate).getTime(),
      endDate: new Date(departureDate).getTime(),
      num_guest: numGuests,
      num_courses: null,
      event_time: null,
      rateInCent: room.rate,
      type: "suites",
      description: room.description,
      discount_programme: null,
      discount_rate: discount_programme,
      imageurl: room.imageURLs[0],
      totalAmount: (room.rate - discount_rate * room.rate) * numGuests * nights,
      paid: false,
      payment_ref: null,
    };
    console.log("New booking: ", roomBooking);
    dispatch(addBookingToCart(roomBooking));
    navigate("/bookings");
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
            backgroundColor: "#d4af37",
          }}
        >
          <div>
            <h2>{room.title}</h2>
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
          style={{
            overflow: "scroll",
            height: "70vh",
          }}
        >
          <div
            style={{
              height: "40vh",
              backgroundImage: `url(${room.imageURLs[0]})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>

          <div
            style={{
              padding: "20px",
            }}
          >
            <div
              style={{
                borderBottom: "1px gray solid",
              }}
            >
              <p>
                <RxDimensions /> {room.floorSpace} m<sup>2</sup>
              </p>
              <p>{room.description}</p>
              <br />
            </div>

            <div
              style={{
                borderBottom: "1px gray solid",
              }}
            >
              <h3>Add suite to bookings</h3>
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
                }}
                onClick={handleRoomBooking}
              >
                Book Now
              </button>
              <br />
              <br />
            </div>
          </div>

          <div
            className="amenities"
            style={{
              padding: "20px",
            }}
          >
            <h3>Amenities</h3>
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: "50px" }}>
                <div>
                  <FaCheck /> Desk
                </div>
                <div>
                  <FaCheck /> Wardrobe
                </div>
                <div>
                  <FaCheck /> Bathroom with shower
                </div>
                <div>
                  <FaCheck /> Bathroom with bathtub
                </div>
                <div>
                  <FaCheck /> Hairdryer
                </div>
                <div>
                  <FaCheck /> Bathrobes
                </div>
                <div>
                  <FaCheck /> Slippers
                </div>
                <div>
                  <FaCheck /> Kitchenette
                </div>
                <div>
                  <FaCheck /> Individual controlled AC units
                </div>
                <div>
                  <FaCheck /> Washer/dryer
                </div>
              </div>

              <div className="column">
                <div>
                  <FaCheck /> Nespresso coffee machine
                </div>
                <div>
                  <FaCheck /> Eco stove/oven
                </div>
                <div>
                  <FaCheck /> Fridge/freezer
                </div>
                <div>
                  <FaCheck /> 49'' LED/LCD flat screen TV
                </div>
                <div>
                  <FaCheck /> High speed Wi-Fi
                </div>
                <div>
                  <FaCheck /> DSTV Hotel Bouquet
                </div>
                <div>
                  <FaCheck /> Microwave/dishwasher
                </div>

                <div>
                  <FaCheck /> Ensuite-bathroom
                </div>
                <div>
                  <FaCheck /> Private balcony/dining area
                </div>
                <div>
                  <FaCheck /> Keyless electronic unit entry
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
