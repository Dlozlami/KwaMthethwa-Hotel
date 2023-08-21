import React, { useState } from "react";
import "./menu.css";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import Currency from "../currency";

export default function Menu() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  //const menuSize = window.screen.width > 699 ? "50%" : "100%";
  //console.log("Menu width: ", menuSize);
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
          id="modalContainer"
          className="overlay"
          style={{
            position: "fixed",
            width: "100%",
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
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/");
              closeModal();
            }}
          >
            <a href="/" style={{ textDecoration: "none" }}>
              HOME
            </a>
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/rooms");
              closeModal();
            }}
          >
            <a href="/rooms" style={{ textDecoration: "none" }}>
              SUITES
            </a>
          </div>

          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/dining");
              closeModal();
            }}
          >
            <a href="/dining" style={{ textDecoration: "none" }}>
              DINING
            </a>
          </div>

          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/experiences");
              closeModal();
            }}
          >
            <a href="/experiences" style={{ textDecoration: "none" }}>
              EXPERIENCES
            </a>
          </div>

          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/contact");
              closeModal();
            }}
          >
            <a href="/contact" style={{ textDecoration: "none" }}>
              CONTACT US
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
