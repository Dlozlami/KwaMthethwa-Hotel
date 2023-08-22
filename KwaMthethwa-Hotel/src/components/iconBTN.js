import React from "react";
import { Link } from "react-router-dom";

export default function MyBTN({
  name = "myBtn",
  bgColor = "white",
  color = "black",
  address = "/",
  borderWidth = "0",
  borderColor = "black",
  fontSize = "16",
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
        borderWidth: { borderWidth },
        borderColor: { borderColor },
        fontSize: { fontSize },
        fontWeight: { fontWeight },
        margin: { margin },
        textDecoration: "none",
        border: "1px red solid",
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
