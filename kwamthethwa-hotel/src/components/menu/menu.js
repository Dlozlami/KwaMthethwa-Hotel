import React, { useState } from "react";
import "./menu.css";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import Currency from "../currency";

export default function Menu() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    console.log("Status: ", isModalOpen);
    setModalOpen(true);
  };

  const closeModal = () => {
    console.log("Status: ", isModalOpen);
    setModalOpen(false);
  };

  return (
    <div className="dor">
      <div onClick={openModal}>
        <FiMenu size={48} />
      </div>
      {isModalOpen && (
        <div
          className="overlay"
          style={{
            position: "fixed",
            width: "50%",
            height: "100%",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 2,
            cursor: "pointer",
            transition: "2.3s",
            padding: 20,
          }}
        >
          <div className="closebtn" onClick={closeModal}>
            &times;
          </div>
          <div>
            <Currency color="white" />
          </div>
          <div>
            <Link to="/rooms" style={{ textDecoration: "none" }}>
              ROOMS
            </Link>
          </div>

          <div>
            <Link to="/dining" style={{ textDecoration: "none" }}>
              DINING
            </Link>
          </div>

          <div>
            <Link to="/experiences" style={{ textDecoration: "none" }}>
              EXPERIENCES
            </Link>
          </div>

          <div>
            <Link to="/contact" style={{ textDecoration: "none" }}>
              CONTACT US
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
