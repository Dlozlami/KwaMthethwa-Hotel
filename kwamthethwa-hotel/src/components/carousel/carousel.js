import React, { useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
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
      <div> </div>
      <div className="carousel">
        <div className="carousel-overlay">
          <button className="carousel-button" onClick={handlePrevious}>
            <AiOutlineLeft />
          </button>
          <button className="carousel-button" onClick={handleNext}>
            <AiOutlineRight />
          </button>
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
    </div>
  );
}
