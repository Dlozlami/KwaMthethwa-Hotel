import { Outlet } from "react-router-dom";
import LogoBTN from "./logoBTN";
import MyBTN from "./myBTN";
import Currency from "./currency";

export default function NavBar() {
  return (
    <>
      <nav
        style={{
          padding: "10px",
          display: "flex",
          border: "1px red solid",
          height: "10vh",
        }}
      >
        <div>
          <LogoBTN />
        </div>
        <div>
          <MyBTN name="ROOMS" borderWidth="1" address="/rooms" />
        </div>

        <div>
          <MyBTN name="DINING" borderWidth="1" address="/dining" />
        </div>

        <div>
          <MyBTN name="EXPERIENCES" borderWidth="1" address="/rooms" />
        </div>

        <div>
          <MyBTN name="CONTACT US" borderWidth="1" address="/rooms" />
        </div>
        <div>
          <Currency />
        </div>
      </nav>

      <Outlet />
    </>
  );
}
