import React from "react";
import Footer from "../../components/footer/footer";

export default function Rooms() {
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
            <h1>4 Suites</h1>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
