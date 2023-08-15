import React from "react";
import { GrMoney } from "react-icons/gr";

export default function Currency() {
  return (
    <div
      style={{
        display: "flex",

        marginRight: "2vw",
        marginLeft: "2vw",
      }}
    >
      <div style={{ marginRight: 5 }}>
        <GrMoney size={20} />
      </div>
      <div>
        <select name="currency" id="currency">
          <option value="ZAR">ZAR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
    </div>
  );
}
