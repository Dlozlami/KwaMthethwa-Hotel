import { Outlet, Link } from "react-router-dom";
import LogoBTN from "../logoBTN";
import Currency from "../currency";
import UserBTN from "../userBTN";
import "./navBar.css";
import NavBTN from "./navBTN";
import Menu from "../menu/menu";
export default function NavBar() {
  return (
    <>
      <nav>
        <div id="mobileView">
          <Menu />
        </div>
        <div>
          <LogoBTN size={"60vw"} />
        </div>
        <div
          style={{
            display: "flex",

            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div id="tabToDesktopView">
            <NavBTN name="HOMES" borderWidth="1" address="/" />
          </div>

          <div id="tabToDesktopView">
            <NavBTN name="SUITES" borderWidth="1" address="/rooms" />
          </div>

          {/* <div id="tabToDesktopView">
            <NavBTN name="DINING" borderWidth="1" address="/dining" />
          </div>

          <div id="tabToDesktopView">
            <NavBTN name="EXPERIENCES" borderWidth="1" address="/experiences" />
          </div> */}

          <div id="tabToDesktopView">
            <NavBTN name="CONTACT US" borderWidth="1" address="/contact" />
          </div>
          <div id="tabToDesktopView">
            <Currency />
          </div>
          <div>
            <UserBTN />
          </div>
          <div id="tabToDesktopView" className="w3-ripple">
            <Link
              to="/bookings"
              style={{
                fontSize: "18px",
                padding: "10px 20px",
                backgroundColor: "#006c67",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginLeft: 10,
                textDecoration: "none",
              }}
            >
              Book Now
            </Link>
          </div>
        </div>
      </nav>
      <div
        id="mobileView"
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          backgroundColor: "#006c67",
          width: "100%",
          transform: "translateX(-50%)",
          padding: 10,
          fontWeight: 600,
          color: "white",
          zIndex: 3,
        }}
        className="w3-ripple"
      >
        <Link
          to="/bookings"
          style={{
            textDecoration: "none",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Book Now
        </Link>
      </div>
      <Outlet />
    </>
  );
}
