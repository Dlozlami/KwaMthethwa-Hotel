import React from "react";
import { FaArrowUp, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
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
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          backgroundColor: "#dddddd",
        }}
      >
        <div>
          <div>
            {/* Logo and Bio */}
            <img src="../assets/icons/logoBTN.png" alt="Logo" />
            <p>Brief bio here</p>
          </div>
        </div>
        <div>
          <h3>Pages</h3>
          <ul>
            <li>Rooms</li>
            <li>Dining</li>
            <li>Experiences</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <h3>Contact Info</h3>
          <ul>
            <li>Contact Address</li>
            <li>Telephone</li>
            <li>Email</li>
          </ul>
        </div>
        <div>
          <h3>Stay in Touch</h3>
          <input type="email" placeholder="Enter email address" />
          <button>
            <FaArrowUp />
          </button>
        </div>
      </div>

      {/* Child 3 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          borderTop: "1px solid gray",
          backgroundColor: "#dddddd",
        }}
      >
        <div>
          <p>Copyright © 2023 KwaMthethwa Hotel. All rights reserved</p>
        </div>
        <div>
          <img
            src="../assets/icons/logoBTN.png"
            alt="Small Logo"
            style={{ width: "3vw" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
