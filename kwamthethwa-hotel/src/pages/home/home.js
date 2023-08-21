import React from "react";
import Footer from "../../components/footer/footer";
import Carousel from "../../components/carousel/carousel";
import { carouselImages } from "./homePictures";

export default function home() {
  return (
    <>
      <div style={{ height: "90vh", overflow: "auto" }}>
        <Carousel listOfImgURL={carouselImages} />
      </div>
      <Footer />
    </>
  );
}
