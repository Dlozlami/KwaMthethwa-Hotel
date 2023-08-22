import React, { useState } from "react";
import Carousel from "../../components/carousel/carousel";
import { RxDimensions } from "react-icons/rx";
import { FaKitchenSet, FaBed, FaCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";
import RoomsModal from "./roomsModal";

export default function RoomCard({ room }) {
  const { currency, currencySymbol, discount_rate } = useSelector(
    (store) => store.bookings
  );
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  //console.log("This is a room: ", room);
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
        <div id="roomCard00" style={{ borderRadius: "20%" }}>
          <Carousel listOfImgURL={room.imageURLs} />
        </div>

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
        </div>
      </div>
      <RoomsModal visible={modalVisible} close={closeModal} room={room} />
    </>
  );
}
