import React from "react";
import { BsCashCoin } from "react-icons/bs";

export default function Currency() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <label htmlFor="currency">
        <BsCashCoin size={20} />
      </label>
      {"  "}
      <select name="currency" id="currency">
        <option value="ZAR">ZAR</option>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
        <option value="EUR">EUR</option>
      </select>{" "}
    </div>
  );
}
