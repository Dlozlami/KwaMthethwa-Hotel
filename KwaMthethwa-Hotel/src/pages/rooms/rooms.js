import React from "react";
import Footer from "../../components/footer/footer";
import RoomCard from "./roomCard";
import { roomsData } from "./roomsData";

export default function Rooms() {
  return (
    <>
      <div id="mainView">
        <section
          className="w3-card"
          style={{
            backgroundImage: "url('./assets/images/pexels-pixabay-164595.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            textAlign: "center",
            color: "white",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          <div style={{ padding: "100px 0" }}>
            <h1>4 Suites</h1>
            <p>
              Indulgence redefined: Immerse yourself in the beauty of our
              handpicked suite selection, each with its own story.
            </p>
          </div>
        </section>
        <div
          className="w3-card"
          style={{
            marginBottom: "10px",
            flexDirection: "column",
            padding: "10px",
            width: "100%",
            backgroundColor: "#e3d7ff",
          }}
        >
          <h2>Choose your accommodation</h2>
        </div>
        {roomsData.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
      <Footer />
    </>
  );
}
