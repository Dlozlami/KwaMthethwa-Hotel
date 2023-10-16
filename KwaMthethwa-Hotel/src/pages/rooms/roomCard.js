import React, { useState } from "react";
import { RiEdit2Fill, RiDeleteBin2Fill } from "react-icons/ri";
import { RxDimensions } from "react-icons/rx";
import { FaKitchenSet, FaBed, FaCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";
import RoomsModal from "./roomsModal";

export default function RoomCard({ room }) {
  const { currency, currencySymbol, discount_rate } = useSelector(
    (store) => store.bookings
  );
  const { isAdmin } = useSelector((store) => store.login);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div
        id="roomCard"
        className="w3-card w3-round-large"
        style={{
          display: "flex",
          marginBottom: "10px",
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <div
          id="roomCard00"
          style={{
            backgroundImage: `url(${room.imageURLs[0]})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>

        <div
          id="roomCard01"
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingBottom: "20px",
          }}
        >
          <h3>{room.title}</h3>
          <p>
            <RxDimensions /> {room.floorSpace} m<sup>2</sup>
          </p>
          <p>
            <FaKitchenSet /> kitchenette
          </p>
          <p>
            <FaBed /> {room.bed}
          </p>
          <p>
            <FaCheck /> WiFi, air conditioning, TV
          </p>

          <button
            className="w3-ripple"
            style={{
              fontSize: "12px",
              padding: "10px",
              backgroundColor: "white",
              color: "#006c67",
              border: "1px #006c67 solid",
              borderRadius: "5px",
              cursor: "pointer",
              textDecoration: "none",
            }}
            onClick={openModal}
          >
            Read more
          </button>
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
              {(((1 - discount_rate) * room.rate * currency) / 100).toFixed(2)}
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
            onClick={openModal}
          >
            Book Now
          </button>
          {isAdmin ? (
            <div>
              <br />
              <RiEdit2Fill size={30} color="#006c67" />{" "}
              <RiDeleteBin2Fill size={30} color="#006c67" />
            </div>
          ) : null}
        </div>
      </div>
      <RoomsModal visible={modalVisible} close={closeModal} room={room} />
    </>
  );
}
