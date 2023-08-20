import React from "react";
import Carousel from "../../components/carousel/carousel";
import { RxDimensions } from "react-icons/rx";
import { FaKitchenSet, FaBed, FaCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function RoomCard({ room }) {
  const { currency, currencySymbol } = useSelector((store) => store.bookings);
  //console.log("This is a room: ", room);
  return (
    <div
      className="w3-card"
      style={{ cursor: "pointer", display: "flex" }}
      onClick={() => {
        console.log("Clicked room");
      }}
    >
      <div style={{ width: "30%" }}>
        <Carousel listOfImgURL={room.imageURLs} />
      </div>
      <div style={{ width: "50%", paddingLeft: "2vw" }}>
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
      </div>
      <div style={{ width: "20%" }}>
        <p>from</p>
        <p>
          {currencySymbol} {((room.rate * currency) / 100).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
