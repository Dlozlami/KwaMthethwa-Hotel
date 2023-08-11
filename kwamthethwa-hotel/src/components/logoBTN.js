import React from "react";
import { useHistory } from "react-router-dom";

export default function LogoBTN() {
  const history = useHistory();
  return (
    <div onClick={() => history.push("/")}>
      <img src="../../assets/icons/logoBTN.png" />
    </div>
  );
}
