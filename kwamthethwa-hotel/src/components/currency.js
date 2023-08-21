import React from "react";
import { GrMoney } from "react-icons/gr";

export default function Currency({ color = "black" }) {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "2vw",
        marginLeft: "2vw",
      }}
    >
      <div style={{ marginRight: 5, color: { color } }}>
        <GrMoney size={20} color="white" />
      </div>
      <div>
        <select name="currency" id="currency" color={color}>
          <option value="ZAR">ZAR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
    </div>
  );
}
