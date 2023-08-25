import React from "react";
import gifImage from "./ZZ5H.gif";

export default function Preloader({ visible }) {
  return (
    <div
      className="modal"
      style={{
        display: visible ? "flex" : "none",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        padding: "20px",
        zIndex: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={gifImage} alt="Animated GIF" />
    </div>
  );
}
