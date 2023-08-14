import React from "react";
import { Link } from "react-router-dom";

export default function LogoBTN({ size }) {
  return (
    <Link
      to={"/"}
      style={{
        cursor: "pointer",
        width: "10vw",
        border: "1px red solid",
        textDecoration: "none",
      }}
    >
      <img
        src="./assets/icons/logoBTN.png"
        alt="official logo"
        width={size}
        className="w3-ripple"
      />
    </Link>
  );
}
