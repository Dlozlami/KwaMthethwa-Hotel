import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/footer";
import RoomCard from "./roomCard";
import { roomsData } from "./roomsData";
import { IoIosAddCircle } from "react-icons/io";
import { fetchRooms } from "../../features/roomsSlice";
import { useDispatch, useSelector } from "react-redux";
import AddRoomModal from "./addRoomModal";

export default function Rooms() {
  const dispatch = useDispatch();
  const { isAdmin } = useSelector((store) => store.login);
  const { rooms } = useSelector((store) => store.rooms);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    rooms && console.log("Rendering number of rooms: ", rooms.length);
    dispatch(fetchRooms());
  }, []);

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
            display: "flex",
            marginBottom: "10px",
            flexDirection: "row",
            padding: "10px",
            width: "100%",
            backgroundColor: "#d4af37",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontWeight: "500",
            }}
          >
            Choose your accommodation
          </h1>
          {isAdmin ? (
            <span style={{ fontSize: 20 }}>
              <button
                className="w3-ripple"
                style={{
                  fontSize: "15px",
                  padding: "10px",
                  backgroundColor: "none",
                  color: "#006c67",
                  border: "1px #006c67 solid",
                  borderRadius: "5px",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
                onClick={openModal}
              >
                <IoIosAddCircle size={20} /> Add a room
              </button>
            </span>
          ) : null}
        </div>
        {/*roomsData.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))*/}
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
      <Footer />
      <AddRoomModal visible={modalVisible} close={closeModal} />
    </>
  );
}
