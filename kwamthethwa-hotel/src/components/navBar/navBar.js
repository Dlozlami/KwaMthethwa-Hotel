import { Outlet } from "react-router-dom";
import LogoBTN from "../logoBTN";
import Currency from "../currency";
import UserBTN from "../userBTN";
import "./navBar.css";
import NavBTN from "./navBTN";

export default function NavBar() {
  return (
    <>
      <nav>
        <div>
          {window.screen.width > 0
            ? console.log("Screen Width: ", window.screen.width)
            : null}
          <LogoBTN size={"60vw"} />
        </div>
        <div
          style={{
            display: "flex",
            border: "1px red solid",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div>
            <NavBTN name="ROOMS" borderWidth="1" address="/rooms" />
          </div>

          <div>
            <NavBTN name="DINING" borderWidth="1" address="/dining" />
          </div>

          <div>
            <NavBTN name="EXPERIENCES" borderWidth="1" address="/experiences" />
          </div>

          <div>
            <NavBTN name="CONTACT US" borderWidth="1" address="/contact" />
          </div>
          <div>
            <Currency />
          </div>
          <div>
            <UserBTN />
          </div>
          <div>
            <button
              style={{
                fontSize: "18px",
                padding: "10px 20px",
                backgroundColor: "gray",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginLeft: 10,
              }}
            >
              Book Now
            </button>
          </div>
        </div>
      </nav>
      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <button
          style={{
            fontSize: "18px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Book Now
        </button>
      </div>
      <Outlet />
    </>
  );
}