import React from "react";
import Footer from "../components/footer/footer";
import { IoIosMail, IoIosHome, IoIosPhonePortrait } from "react-icons/io";

export default function Contact() {
  return (
    <>
      <div id="mainView">
        <section
          className="w3-card"
          style={{
            backgroundImage: "url('./assets/images/contactBG.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            textAlign: "center",
            color: "white",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          <div style={{ padding: "100px 0" }}>
            <h1>Contact Us</h1>
          </div>
        </section>

        <section className="w3-card">
          <div
            style={{
              flex: 1,
            }}
          >
            <div
              style={{
                flex: 1,
                border: "none",
                borderBottom: "1px black solid",
              }}
            >
              <h4>Get in Touch</h4>
              <p>
                Feel free to reach out to us using the contact details provided
                below or by filling out the form. We're here to assist you!
              </p>
              <br />
            </div>
            <br />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <IoIosHome
                style={{ marginRight: "10px", alignSelf: "flex-start" }}
              />
              <p>
                123 Zulu Heritage Lane
                <br />
                Newtown
                <br />
                Johannesburg
                <br />
                South Africa
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <IoIosMail style={{ marginRight: "10px" }} />
              <p>info@kwamthethwahotel.co.za</p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IoIosPhonePortrait style={{ marginRight: "10px" }} />
              <p>+27 11 555 6789</p>
            </div>
          </div>
        </section>

        <section className="w3-card">
          <h4>Send Us a Message</h4>
          <form>
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />

            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" required />

            <label htmlFor="room">Room</label>
            <select id="room" required>
              <option value="">Select a Room</option>
              <option value="single">Single Room</option>
              <option value="double">Double Room</option>
              <option value="suite">Suite</option>
            </select>

            <label htmlFor="guests">Number of Guests</label>
            <input type="number" id="guests" required />

            <label htmlFor="arrivalDate">Arrival Date</label>
            <input type="date" id="arrivalDate" required />

            <label htmlFor="departureDate">Departure Date</label>
            <input type="date" id="departureDate" required />

            <label htmlFor="message">Message</label>
            <textarea id="message" rows="4" required />

            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
      <Footer />
    </>
  );
}
