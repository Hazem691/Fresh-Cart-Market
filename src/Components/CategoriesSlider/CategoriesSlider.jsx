import React, { useEffect, useState } from 'react'
import styles from './CategoriesSlider.module.css'
import axios from 'axios'
import Slider from 'react-slick'
export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true
  };

  async function getCategories() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <div className='container my-5'  >
        <h2>Show popular Categories</h2>

        <Slider {...settings}>
          {categories.map(cat => {
            return <div className='item px-1' >
              <img src={cat.image} className='w-100' height={'200'} />
              <h5 className='text-center' >{cat.name}</h5>
            </div>
          })}

        </Slider>


      </div>
    </>

  )
}
