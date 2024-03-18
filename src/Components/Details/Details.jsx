import React, { useContext, useState } from 'react';
import styles from './Details.module.css';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { CartContext } from '../../Context/CartContext';
import Slider from 'react-slick';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader';

export default function Details() {
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();
  const { addToCart, setNumOfCartItem } = useContext(CartContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  async function getDetailedPage(id) {
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`);
  }

  const { data } = useQuery("DetailsPage", () => getDetailedPage(id));

  async function addCart(id) {
    setLoading(true); // Set loading to true when adding to cart
    try {
      const response = await addToCart(id);
      if (response.data.status === "success") {
        toast.success("Product added successfully");
        setNumOfCartItem(response.data.numOfCartItems);
      } else {
        toast.error("Error in the adding process");
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error("Error in the adding process");
    } finally {
      setLoading(false); // Set loading to false after adding to cart
    }
  }

  return (
    <>
      {isLoading && <div className="loader d-flex justify-content-center align-items-center vh-100"><Loader/> </div>} {/* Show loader if isLoading is true */}
      <div className='container mb-5'>
        <div className='row align-items-center gy-3'>
          <div className='col-md-4'>
            <Slider {...settings}>
              {data?.data?.data?.images.map((ele, index) => <img key={index} src={ele} className='w-100' alt="" />)}
            </Slider>
          </div>
          <div className="col-md-8">
            <h2>{data?.data?.data.title}</h2>
            <p>{data?.data?.data.description}</p>
            <div className="d-flex justify-content-between">
              <h5>{data?.data?.data.price} EGP</h5>
              <h5><i className='fa fa-star rating-color'></i> {data?.data?.data.ratingsAverage}</h5>
            </div>
            <button className='btn bg-main w-100 text-white' onClick={() => addCart(data?.data?.data.id)}>ADD TO CART</button>
          </div>
        </div>
      </div>
    </>
  )
}
