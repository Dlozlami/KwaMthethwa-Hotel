import React from "react";
import Footer from "../components/footer/footer";
import Carousel from "../components/carousel/carousel";
import { landing } from "../data/landingPictures";

export default function home() {
  return (
    <div style={{ height: "90vh", overflow: "auto" }}>
      <Carousel listOfImgURL={landing} height={"90vh"} />
      <Footer />
    </div>
  );
}
