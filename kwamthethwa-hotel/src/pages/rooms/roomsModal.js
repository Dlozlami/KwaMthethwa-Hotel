import React from "react";
import Carousel from "../../components/carousel/carousel";
import { FaCheck } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoomsModal({ visible, close, room }) {
  const { currency, currencySymbol, discount_rate } = useSelector(
    (store) => store.bookings
  );
  const navigate = useNavigate();
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
          width: "80vw",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div style={{}}>
          <div>
            <h3>{room.title}</h3>
          </div>
          <div>
            <button
              className="close-button"
              onClick={close}
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              <IoCloseCircle />
            </button>
          </div>
        </div>
        <div style={{ height: "30vh" }}>
          <Carousel listOfImgURL={room.imageURLs} />
        </div>

        <div
          style={{
            padding: "20px",
            display: "flex",
          }}
        >
          <div>
            <h2>Room Description</h2>
            <p>{room.description}</p>
          </div>

          <div
            id="roomCard02"
            style={{
              padding: "20px",
            }}
          >
            <p>from</p>
            <p>
              {currencySymbol} {((room.rate * currency) / 100).toFixed(2)}
            </p>
            {discount_rate > 0 ? (
              <p style={{ color: "#6874e8", fontSize: "10PX" }}>
                with a discount {currencySymbol}
                {(((1 - discount_rate) * room.rate * currency) / 100).toFixed(
                  2
                )}
              </p>
            ) : null}
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
              }}
              onClick={() => navigate("/bookings")}
            >
              Book Now
            </button>
          </div>
        </div>

        <div
          className="amenities"
          style={{
            padding: "20px",
          }}
        >
          <h2>Amenities</h2>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="column">
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
  );
}
