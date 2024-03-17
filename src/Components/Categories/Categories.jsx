import React, { useEffect, useState } from 'react';
import styles from './Categories.module.css';
import img1 from '../../Assets/images/slider-image-1.jpeg';
import Loader from '../Loader/Loader';
import axios from 'axios';
import { Helmet } from 'react-helmet'

export default function Categories() {
  const [categories, setAllCategories] = useState([]);
  const [description, setDescription] = useState([]);
  const [details ,setDetails] = useState([]);
  const [isLoadingCategories, setLoadingCategories] = useState(true);
  const [isLoadingDescription, setLoadingDescription] = useState(false);

  async function getAllCategories() {
    try {
      const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`);
      setAllCategories(data.data);
      setLoadingCategories(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoadingCategories(false); // Ensure to set loading state to false on error
    }
  }

  async function getDescriptionCategories(id) {
    try {
      setLoadingCategories(true);
      const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories/${id}/subcategories`);
      setDescription(data.data);
      setLoadingCategories(false);
    } catch (error) {
      console.error('Error fetching description:', error);
      setLoadingCategories(false); // Ensure to set loading state to false on error
    }
  }
  async function getCategoriesDetails(id){
    try{
      const{data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories/${id}`);
      setDetails(data.data);

    }catch (error) {
      console.error('Error fetching description:', error);
      setLoadingCategories(false); // Ensure to set loading state to false on error
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  // Function to handle card click
  const handleCardClick = async (id) => {
    console.log('Clicked on card with ID:', id);
    setDescription([]); // Clear description before fetching new data
     getDescriptionCategories(id);
     getCategoriesDetails(id);

  };

  return (
    <>
    <Helmet><title>Categories</title></Helmet>
      {isLoadingCategories ? (
        <div className="loader d-flex justify-content-center align-items-center vh-100"><Loader /></div>
      ) : (
        <div className='container  my-5 '>
          <div className='row mb-5'>
            {categories.map((ele) => (
              <div className='col-md-4' key={ele._id}>
                <div className='card mb-4 cursor-pointer product' onClick={() => handleCardClick(ele._id)}>
                  <div><img src={ele.image} height={450} className='w-100' alt="" /></div>
                  <div className='text-center'><h2 className='text-success fw-bolder'>{ele.name}</h2></div>
                </div>
              </div>
            ))}
          </div>
          {isLoadingCategories ? (
          <div className="loader d-flex justify-content-center align-items-center "><Loader /></div>
          ) : (
            <>
            
            <div className='row gy-4'>
            <div className='d-flex justify-content-center text-center '><div className=' border-bottom-1 mb-3 p-3 w-25 '><h3 className='text-success fw-bolder'>{details.name}</h3></div></div>
              {description.map((ele) => (
                <div className='col-md-4 ' key={ele._id}>
                  <div className='p-3 text-center card product cursor-pointer'>
                    <h4 className='fw-bolder'>{ele.name}</h4>
                  </div>
                </div>
              ))}
            </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
