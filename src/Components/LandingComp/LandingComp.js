import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import image1 from "../../Assets/Bg_Image.png"
import image2 from "../../Assets/image-removebg-preview (23) 1.png"
import image3 from "../../Assets/image-removebg-preview (26) 1.png";

const LandingComp = () => {
  const navigate = useNavigate();
  //code to ping backend
    useEffect(()=>{
try {
       axios.get('http://localhost:5000/').then(res => {
      console.log(res.data.message);
      })
    } catch (error) {
      console.log("error", error)
    }
  },[]);
  // Custom component for the left arrow
  const CustomPrevArrow = (props) => (
    <button {...props} className="custom-prev-arrow">
      Previous
    </button>
  );

  // Custom component for the right arrow
  const CustomNextArrow = (props) => (
    <button {...props} className="custom-next-arrow">
      Next
    </button>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    swipe: true, 
    swipeToSlide:true,
    pauseOnHover:true,
    prevArrow: <CustomPrevArrow />, // Custom component for the left arrow
    nextArrow: <CustomNextArrow />, // Custom component for the right arrow
  };


  return (
    <div >
         <Slider {...settings}>
         <div>
          <img src={image1} alt=" 1" />
        </div>
        <div>
          <img src={image2} alt=" 2" />
        </div>
        <div>
          <img src={image3} alt=" 3" />
        </div>
    </Slider>
    <button onClick={()=>{navigate("/home")}}>Lets Go</button>
    </div>
  )
}

export default LandingComp