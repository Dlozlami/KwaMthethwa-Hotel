import React from "react";
import Footer from "../components/footer";
import Carousel from "../components/carousel";
import { landing } from "../data/landingPictures";

export default function home() {
  return (
    <div style={{ height: "90vh", overflow: "auto" }}>
      <Carousel listOfImgURL={landing} />
      <Footer />
    </div>
  );
}
