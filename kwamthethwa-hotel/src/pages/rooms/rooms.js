import React from "react";
import Footer from "../../components/footer/footer";

export default function Rooms() {
  return (
    <>
      <div id="mainView">
        <section
          className="w3-card"
          style={{
            backgroundImage:
              "url('./assets/images/pexels-cottonbro-studio-6466230.jpg')",
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
            <p>
              Indulgence redefined: Immerse yourself in the beauty of our
              handpicked suite selection, each with its own story.
            </p>
          </div>
        </section>
        <section
          className="w3-card formStyles"
          style={{ marginBottom: "10px" }}
        >
          <h4>Choose your accommodation</h4>
        </section>
      </div>
      <Footer />
    </>
  );
}
