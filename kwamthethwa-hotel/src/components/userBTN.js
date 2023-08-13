import React from "react";
import { PiUserCircleFill } from "react-icons/pi";

export default function UserBTN() {
  return (
    <div className="w3-ripple" style={{ cursor: "pointer" }}>
      <PiUserCircleFill size={30} />
    </div>
  );
}
