import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import image1 from "../../Assets/Bg_Image.png";
import image2 from "../../Assets/image-removebg-preview (23) 1.png";
import image3 from "../../Assets/image-removebg-preview (26) 1.png";
import  "./LandingComp.css"

const LandingComp = () => {
  const navigate = useNavigate();
  //code to ping backend
  useEffect(() => {
    try {
      axios.get('http://localhost:5000/').then(res => {
        console.log(res.data.message);
      })
    } catch (error) {
      console.log("error", error)
    }
  }, []);
  // Custom component for the left arrow
  const CustomPrevArrow = (props) => (
    <button {...props} className="custom-prev-arrow bg-[#1B2A41] text-white px-2.5 py-1 rounded-full absolute
     hover:text-lg hover:shadow-lg shadow-black 
     
    ">
      --
    </button>
  );

  // Custom component for the right arrow
  const CustomNextArrow = (props) => (
    <button {...props} className="custom-next-arrow bg-[#1B2A41] text-white px-1.5 py-1 rounded-full absolute hover:text-4xl hover:shadow-lg shadow-black 
    // responsive css
    top-[44%] left-[80%] 
    sm:left-[80%] sm:top-[50%] 
    md:text-xl md:left-[70%]
    lg:text-3xl lg:left-[60%] hover:lg:text-4xl
    2xl:left-[44%]">
      +
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
    <div className='bg-[#E4E0FB] h-screen '>

    {/* This is carousel */}
      <div className=''>
        <Slider {...settings}>
        
          <div className='slider-div'>
            <img src={image1} className='sm:h-[27rem] md:h-[20rem] md:pl-3 lg:h-[25rem] lg:pl-0 xl:h-[25rem] xl:pl-0 2xl:h-[20rem] ' alt=" 1" />
          </div>
          <div className='slider-div'>
            <img src={image2} className='sm:h-[22rem] md:h-[15rem] lg:h-[20rem] xl:h-[20rem] xl:pl-3 2xl:h-[10rem]' alt=" 2" />
          </div>
          <div className='slider-div'>
            <img src={image3} className='sm:h-[27rem] md:h-[20rem] md:pl-2 lg:h-[25rem] lg:pl-0 xl:h-[25rem] xl:pl-0 2xl:h-[15rem] 2xl:pl-16' alt=" 3" />
          </div>
        </Slider>
        <div className='w-[100vw] justify-center flex'>
        <button onClick={() => { navigate("/login") }} className='nextButton text-white rounded text-lg hover:font-semi-bold hover:shadow-lg shadow-black px-7 py-1 w-[17vw]
     
        
        '>Lets Go</button>
</div>
      </div>
    </div>
  )
}

export default LandingComp;

// md:hover:text-2xl
// lg:hover:text-3xl
// xl:hover:text-4xl
// 2xl:hover:text-5xl

// md:ml-[32%] md:py-2 md:px-10 md:text-xl 
//         lg:text-2xl lg:py-3 lg:px-14 lg:ml-[30%] 
//         xl:text-3xl xl:py-4 xl:px-16 xl:ml-[16%]
//         2xl:text-4xl 2xl:py-5 2xl:px-20 2xl:ml-[16%]    


        // responsive css 
        // ml-[35%] 
        // sm:ml-[35%] 
        // md:ml-[26%]
        // lg:ml-[25%] 
        // xl:ml-[23%]
        // 2xl:ml-[16%] 

        // this is responsive design for slider wala div 
      //   pt-[30%] sm:pt-[30%] sm:pl-[16%] 
      // md:pl-[25%] md:pt-[5%]
      // lg:pt-[1%] lg:pl-[26%]
      // xl:pt-[5%] xl:pl-[33%] 
      // 2xl:pt-[2%] 2xl:pl-[37%]

      // this is responsive design for previous arrow 
      