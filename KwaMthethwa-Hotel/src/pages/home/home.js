import React from "react";
import Footer from "../../components/footer/footer";
import Carousel from "../../components/carousel/carousel";
import { carouselImages } from "./homePictures";

export default function home() {
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        <Carousel listOfImgURL={carouselImages} />
      </div>
      <Footer />
    </>
  );
}
