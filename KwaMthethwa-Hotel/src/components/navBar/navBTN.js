import React from "react";
import { Link } from "react-router-dom";

export default function NavBTN({
  name = "myBtn",
  bgColor = "white",
  color = "black",
  address = "/",
  fontSize = "20",
  fontWeight = "100",
  margin = "2vw",

  onClickFunction,
}) {
  return (
    <div
      style={{
        cursor: "pointer",
        padding: "10px",
        alignItems: "center",
        backgroundColor: { bgColor },
        color: { color },
        fontSize: 20,
        fontWeight: 600,
        margin: { margin },
        textDecoration: "none",

        fontFamily: "bodyFont",
      }}
      onClick={onClickFunction}
      className="w3-ripple"
    >
      <Link to={address} style={{ textDecoration: "none" }}>
        {name}
      </Link>
    </div>
  );
}
