import React, { useState } from "react";
import { FaBackwardStep, FaForwardStep } from "react-icons/fa";
import { BsCircleFill } from "react-icons/bs";
import "../../public/assets/css/carousel.css"; // You can define your CSS styles in this file

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
    <div className="carousel-container">
      <div
        className="carousel"
        style={{
          backgroundImage: `url(${listOfImgURL[currentIndex]})`,
        }}
      >
        <div className="carousel-overlay">
          <button className="carousel-button" onClick={handlePrevious}>
            <FaBackwardStep />
          </button>
          <button className="carousel-button" onClick={handleNext}>
            <FaForwardStep />
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
