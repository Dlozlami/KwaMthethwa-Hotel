import React, { useState, useEffect } from "react";
import { BsCircleFill } from "react-icons/bs";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import "./carousel.css"; // You can define your CSS styles in this file

export default function Carousel({ listOfImgURL, title, subtitle }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listOfImgURL.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + listOfImgURL.length) % listOfImgURL.length
    );
  };

  useEffect(() => {
    // Automatically advance the carousel every 5 seconds (adjust as needed)
    const interval = setInterval(handleNext, 5000);

    // Cleanup the interval on unmount to avoid memory leaks
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="carousel-container"
      style={{
        backgroundImage: `url(${listOfImgURL[currentIndex]})`,
      }}
    >
      <div className="mainSign">
        <h1 style={{ fontSize: "5em" }}>{title}</h1>
        <p>{subtitle}</p>
        <br />
      </div>
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
