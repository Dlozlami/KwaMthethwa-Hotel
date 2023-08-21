import React from "react";
import { PiUserCircleFill } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function UserBTN() {
  return (
    <Link
      className="w3-ripple"
      to={"/login"}
      style={{
        cursor: "pointer",
        textDecoration: "none",
      }}
    >
      <PiUserCircleFill size={40} />
    </Link>
  );
}
