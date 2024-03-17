import React, { useState, useEffect } from 'react';
import styles from './MainSlider.module.css';
import Slider from 'react-slick';
import img1 from '../../Assets/images/slider-image-1.jpeg';
import img2 from '../../Assets/images/slider-image-2.jpeg';
import img3 from '../../Assets/images/slider-image-3.jpeg';
import Loader from '../Loader/Loader';

export default function MainSlider() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Set isLoading to false after 2 seconds
    }, 2000);
  }, []); // Empty dependency array to run only once

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true
  };

  return (
    <>
      {isLoading ? (
        <div className="loader d-flex justify-content-center align-items-center vh-100"><Loader/></div> // Show loader while isLoading is true
      ) : (
        <div className="container my-5">
          <div className="row g-0">
            <div className="col-md-8">
              <Slider {...settings}>
                <img src={img3} height={'500'} alt="" />
                <img src={img1} height={'500'} alt="" />
                <img src={img2} height={'500'} alt="" />
              </Slider>
            </div>

            <div className="col-md-4">
              <img src={img1} height={'250'} alt="" className='w-100' />
              <img src={img2} height={'250'} alt="" className='w-100' />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
