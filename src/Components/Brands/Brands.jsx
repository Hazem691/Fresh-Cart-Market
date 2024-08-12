import React, { useEffect, useState } from 'react';
import styles from './Brands.module.css';
import Loader from '../Loader/Loader';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Helmet} from 'react-helmet' ;

export default function Brands() {
  const [isLoading, setLoading] = useState(false);
  const [AllBrands, setAllBrands] = useState([]);

  async function getBrands() {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/brands`);
      setAllBrands(data.data);
      setLoading(false);
    } catch (err) {
      console.log('the error is : ', err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  const handleCardClick = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
      setLoading(false);
      showBrandDetails(data.data);
    } catch (err) {
      console.error('Error fetching specific brand:', err);
      setLoading(false);
    }
  };

  const showBrandDetails = (brand) => {
    Swal.fire({
      html: `
        <div>
          <img src="${brand.image}" alt="${brand.name}" style="max-width: 100%; height: auto;">
          <h2 >${brand.name}</h2>
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: true,
    });
  };

  return (
    <>
    <Helmet><title>Brands</title></Helmet>
      {isLoading ? (
        <div className="loader d-flex justify-content-center align-items-center vh-100"><Loader /></div>
      ) : (
        <div className='container my-5'>
          <div className='row mb-5'>
            {AllBrands.map((ele) => (
              <div className='col-md-4' key={ele._id}>
                <div className='card mb-4 cursor-pointer product' onClick={() => handleCardClick(ele._id)}>
                  <div><img src={ele.image} height={300} className='w-100' alt="" /></div>
                  <div className='text-center'><h2 className='text-success fw-bolder'>{ele.name}</h2></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
