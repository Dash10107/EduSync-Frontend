import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../Assets/Bg_Image.png";
import image2 from "../../Assets/image-removebg-preview (23) 1.png";
import image3 from "../../Assets/image-removebg-preview (26) 1.png";
import "./LandingComp.css";

const LandingComp = () => {
  const navigate = useNavigate();

  // Code to ping the backend
  useEffect(() => {
    try {
      axios.get("http://localhost:5000/").then((res) => {
        console.log(res.data.message);
      });
    } catch (error) {
      console.log("error", error);
    }
  }, {});

  // Custom component for the left arrow
  const CustomPrevArrow = (props) => (
    <button
      {...props}
      className="custom-prev-arrow text-6xl px-2.5 py-1 rounded-full absolute font-bold shadow-black"
      style={{
        left: '10%', // Adjust the left position as needed
        top: '50%',    // Vertically center the arrow
        transform: 'translateY(-50%)', // Vertically center the arrow
      }}
    >
      {"<"}
    </button>
  );

  // Custom component for the right arrow
  const CustomNextArrow = (props) => (
    <button
      {...props}
      className="custom-next-arrow text-6xl px-1.5 py-1 rounded-full absolute font-bold shadow-black"
      style={{
        right: '10%', // Adjust the right position as needed
        top: '50%',     // Vertically center the arrow
        transform: 'translateY(-50%)', // Vertically center the arrow
      }}
    >
      {">"}
    </button>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    swipe: true,
    swipeToSlide: true,
    pauseOnHover: true,
    prevArrow: <CustomPrevArrow />, // Custom component for the left arrow
    nextArrow: <CustomNextArrow />, // Custom component for the right arrow
  };

  return (
    <div className="landing-container pt-[5%]">
      <div className="carousel-container">
        <div className="slider-centered"> {/* Center the slider */}
          {/* This is the carousel */}
          <Slider {...settings}>
            <div className="slider-div">
              <img
                src={image1}
                className="carousel-image "
                alt="1"
              />
            </div>
            <div className="slider-div">
              <img
                src={image2}
                className="carousel-image"
                alt="2"
              />
            </div>
            <div className="slider-div">
              <img
                src={image3}
                className="carousel-image"
                alt="3"
              />
            </div>
          </Slider>
        </div>
      </div>
      <div className="nextButton-container">
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="nextButton text-white h-14 w-[30vh] rounded-lg text-2xl hover:font-bold hover:shadow-lg shadow-black font-bold"
          style={{ display: "block", margin: "0 auto" }}
        >
          Let's Go
        </button>
      </div>
    </div>
  );
};

export default LandingComp;