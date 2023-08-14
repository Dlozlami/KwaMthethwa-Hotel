import React from "react";
import { FaArrowUp, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import LogoBTN from "../logoBTN";
import "./footer.css";
import MakeBTN from "../makeBTN";

const Footer = () => {
  return (
    <footer>
      {/* Child 1 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          backgroundColor: "#F2F2F2",
        }}
      >
        <div>
          <FaArrowUp />
        </div>
        <div>
          <FaFacebook style={{ marginRight: "1vw" }} />
          <FaTwitter style={{ marginRight: "1vw" }} />
          <FaInstagram />
        </div>
      </div>

      {/* Child 2 */}
      <div
        id="footerLinks"
        style={{
          display: "flex",
          padding: "20px",
          backgroundColor: "#dddddd",
        }}
      >
        <div id="footerLogoBio" style={{ marginRight: 5, width: "30%" }}>
          {/* Logo and Bio */}
          <LogoBTN size="80vw" />
          <p>
            Nurtured by family bonds and ignited by creativity, KwaMthethwa
            Hotel offers a cultural haven, embracing Zulu heritage through
            hospitality and artistry, inviting you to celebrate tradition and
            family essence.
          </p>
        </div>
        <div style={{ marginRight: 5 }}>
          <h3>Pages</h3>
          <MakeBTN name="Rooms" borderWidth="1" address="/rooms" />
          <MakeBTN name="Dining" borderWidth="1" address="/dining" />
          <MakeBTN name="Experiences" borderWidth="1" address="/experiences" />
          <MakeBTN name="Contact Us" borderWidth="1" address="/contact" />
        </div>
        <div style={{ marginRight: 5 }}>
          <h3>Contact Info</h3>
          <p>
            123 Zulu Heritage Lane
            <br /> Newtown
            <br /> Johannesburg
            <br /> South Africa
          </p>
          <p>info@kwamthethwahotel.co.za</p>
          <p>+27 11 555 6789</p>
        </div>
        <div id="footerStayInTouch">
          <h3>Stay in Touch</h3>
          <input type="email" placeholder="Enter email address" />
          <button>
            <FaArrowUp />
          </button>
        </div>
      </div>

      {/* Child 3 */}
      <div id="copyright">
        <div style={{ marginRight: 10 }}>
          <p>Copyright © 2023 KwaMthethwa Hotel. All rights reserved</p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <LogoBTN size="40vw" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
