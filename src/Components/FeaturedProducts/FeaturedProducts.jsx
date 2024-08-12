import React, { useContext, useState } from 'react';
import styles from './FeaturedProducts.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishContext } from '../../Context/WishContext';
import Loader from '../Loader/Loader';

export default function FeaturedProducts() {
  const { addToCart, setNumOfCartItem } = useContext(CartContext);
  const { addToWishList, redIcon, setRedIcon } = useContext(WishContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [productsLoading, setProductsLoading] = useState(false);

  async function addWish(id){
    try {
      setProductsLoading(true);
      const x = await addToWishList(id);
      if (x.data.status === "success") {
        toast.success("Product added successfully to your wishlist");
        setRedIcon([...redIcon, id]);
      } else {
        toast.error("Error in the adding process");
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    } finally {
      setProductsLoading(false);
    }
  }

  async function addCart(id){
    try {
      setProductsLoading(true);
      const x = await addToCart(id);
      if (x.data.status === "success") {
        toast.success("Product added successfully");
        setNumOfCartItem(x.data.numOfCartItems);
      } else {
        toast.error("Error in the adding process");
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setProductsLoading(false);
    }
  }

  function getAllProducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  const { isLoading, data } = useQuery("featuredProducts", getAllProducts);

  const filteredProducts = data?.data?.data.filter(product => {
    return product.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className='container pb-3 mb-5'>
      <div className='m-5'>
        <input type="text" id='searchInput' className='form-control' onChange={e => setSearchTerm(e.target.value)} placeholder="Search the product here ..." />
      </div>
      {productsLoading ? (
        <div className='vh-100 d-flex justify-content-center align-items-center'><Loader/></div>
      ) : (
        <div className='row gy-4 mx-2'>
          {filteredProducts?.map((product, index) => (
            <div className='col-md-2 product' key={index}>
              <i className={`fa-heart btn fa-2x ${redIcon.includes(product.id) ? 'fa-solid text-danger' : 'fa-regular'}`} onClick={() => addWish(product.id)}></i>
              <Link to={'/details/' + product.id} className='text-decoration-none'>
                <img src={product.imageCover} className='w-100' alt="" />
                <h5 className='text-main my-3'>{product.category.name}</h5>
                <h6 className='my-3 text-dark'>{product.title.split(" ").slice(0, 2).join(" ")}</h6>
                <div className='d-flex justify-content-between my-3'>
                  <span><span className='text-danger'>{product.price}</span> <span className='text-dark'>EGP</span></span>
                  <span><i className='fa-solid fa-star rating-color'></i> {product.ratingsAverage}</span>
                </div>
              </Link>
              <button className='btn bg-main w-100 text-white mb-3' onClick={() => addCart(product.id)}>ADD TO CARD</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
