import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../../features/login/loginSlice";
import React, { useState } from "react";
import Footer from "../../components/footer/footer";
import { clearBookings } from "../../features/bookingsSlice";
import EditDetails from "./editDetails";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { userData } = useSelector((store) => store.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div id="mainView">
        <div
          className=" w3-card-4 w3-round-large w3-white"
          style={{ padding: "20px" }}
        >
          <div style={{ borderBottom: "1px black solid" }}>
            <h1 style={{ fontWeight: "500", color: "darkGray" }}>
              Welcome, {userData && userData.name}!
            </h1>
            <p>This is the Admin Dashboard.</p>
            <br />
          </div>
          <br />
          <div
            style={{
              borderBottom: "1px black solid",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            <p onClick={openModal}>Update your details &gt;</p>
            <br />
            <p
              onClick={() => navigate(`/allbookings`)}
              style={{ fontWeight: 700 }}
            >
              All Booking History &gt;
            </p>
            <br />
            <p
              onClick={() => navigate(`/allbookings`)}
              style={{ fontWeight: 700 }}
            >
              All user details &gt;
            </p>
            <br />
          </div>
          <br />
          <button
            className="limeButton w3-btn w3-border w3-border-black w3-round-large"
            onClick={() => {
              dispatch(clearState());
              dispatch(clearBookings());
            }}
          >
            log out
          </button>
        </div>
      </div>
      <EditDetails visible={modalVisible} close={closeModal} />
      <Footer />
    </>
  );
}
