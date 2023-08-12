import React from "react";

export default function myBTN({ name = "myBtn", bgColor }) {
  return (
    <div
      style={{
        cursor: pointer,
        borderRadius: "20%",
        padding: "10%",
        backgroundColor: "white",
        color: "black",
      }}
    >
      {name}
    </div>
  );
}
