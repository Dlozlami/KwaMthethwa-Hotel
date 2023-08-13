import React, { useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import { BsCircleFill } from "react-icons/bs";
import "./carousel.css"; // You can define your CSS styles in this file

export default function Carousel({ listOfImgURL }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listOfImgURL.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + listOfImgURL.length) % listOfImgURL.length
    );
  };

  return (
    <div
      className="carousel-container"
      style={{
        backgroundImage: `url(${listOfImgURL[currentIndex]})`,
      }}
    >
      <div className="carousel">
        <div className="carousel-overlay">
          <button className="carousel-button" onClick={handlePrevious}>
            <GrPrevious style={{ color: "white" }} />
          </button>
          <button className="carousel-button" onClick={handleNext}>
            <GrNext />
          </button>
        </div>
      </div>
      <div className="pagination">
        {listOfImgURL.map((_, index) => (
          <BsCircleFill
            key={index}
            className={`pagination-dot ${
              index === currentIndex ? "active" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
