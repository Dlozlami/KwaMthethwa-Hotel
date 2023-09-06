import React from "react";
import { PiUserCircleFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UserBTN() {
  const { isLoggedIn } = useSelector((store) => store.login);
  return (
    <Link
      className="w3-ripple"
      to={isLoggedIn ? "/profile" : "/login"}
      style={{
        cursor: "pointer",
        textDecoration: "none",
      }}
    >
      <PiUserCircleFill size={40} />
    </Link>
  );
}
