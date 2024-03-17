import React, { useState, useEffect } from 'react';
import styles from './Products.module.css';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet';

export default function Products() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Set isLoading to false after 2 seconds
    }, 2000);
  }, []); // Empty dependency array to run only once

  return (
    <>
    <Helmet><title>Products</title></Helmet>
      {isLoading ? (
        <div className="loader d-flex justify-content-center align-items-center vh-100">
          <Loader/>
        </div> // Show loader while isLoading is true
      ) : (
        <FeaturedProducts/>
      )}
    </>
  );
}
