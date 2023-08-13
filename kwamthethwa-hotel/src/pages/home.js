import React from "react";
import Footer from "../components/footer";
import Carousel from "../components/carousel";
import { landing } from "../data/landingPictures";

export default function home() {
  return (
    <div>
      <Carousel listOfImgURL={landing} />
      <Footer />
    </div>
  );
}
