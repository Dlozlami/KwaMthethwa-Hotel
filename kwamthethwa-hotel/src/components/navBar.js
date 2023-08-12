import { Outlet } from "react-router-dom";
import LogoBTN from "./logoBTN";
import MyBTN from "./myBTN";

export default function NavBar() {
  return (
    <>
      <nav
        style={{
          padding: "10px",
          display: "flex",
          borderWidth: "1",
          borderColor: "red",
        }}
      >
        <LogoBTN />
        <MyBTN name="ROOMS" borderWidth="1" address="/rooms" />
      </nav>

      <Outlet />
    </>
  );
}
