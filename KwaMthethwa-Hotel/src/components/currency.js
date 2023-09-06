import React from "react";
import { GrMoney } from "react-icons/gr";

export default function Currency({ color }) {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "2vw",
        marginLeft: "2vw",
        alignItems: "center",
      }}
    >
      <GrMoney
        size={30}
        color="white"
        style={{ marginRight: "1vw", color: "white" }}
      />

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
