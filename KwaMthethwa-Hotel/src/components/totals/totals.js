import React from "react";
import "./totals.css";
import { useSelector } from "react-redux";

export default function Totals() {
  const { total, subtotal, VAT } = useSelector((store) => store.bookings);
  return (
    <div>
      {total}, {subtotal}, {VAT}
    </div>
  );
}
