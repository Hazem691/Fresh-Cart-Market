import React, { useContext, useEffect, useState } from 'react';
import styles from './WishList.module.css';
import { CartContext } from '../../Context/CartContext';
import { WishContext } from '../../Context/WishContext';
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet';

export default function WishList() {
  const [wishDetails, setWishDetail] = useState({});
  const { getWishList } = useContext(WishContext);
  const { deleteWish } = useContext(WishContext);
  const { addToCart, setNumOfCartItem } = useContext(CartContext);
  const { addToWishList, redIcon, setRedClicked } = useContext(WishContext);
  const [isLoading, setLoading] = useState(false);

  async function addCart(id) {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }

  async function getWishDetails() {
    setLoading(true);
    try {
      const { data } = await getWishList();
      setWishDetail(data);
    } catch (error) {
      console.error('Error fetching wish list:', error);
    } finally {
      setLoading(false);
    }
  }

  async function DeleteWish(id) {
    setLoading(true);
    try {
      await deleteWish(id);
      const updatedWishList = await getWishList();
      setWishDetail(updatedWishList.data);
    } catch (error) {
      console.error('Error deleting wish:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getWishDetails();
  }, []);

  return (
    <>
     <Helmet><title>WishList</title></Helmet>
      {isLoading && <div className='w-100  w-100 vh-100 d-flex justify-content-center align-items-center '><Loader /></div>}
      {!isLoading && (
        <>
          {wishDetails.data && wishDetails.data.length > 0 ? (
            <div className='container my-5'>
              <div className='mx-auto bg-main-light p-5'>
                <h1>My Wish List</h1>
                {wishDetails.data?.map((wishItem) => (
                  <div className='row py-4 border-bottom' key={wishItem.id}>
                    <div className='col-md-1'>
                      <img src={wishItem?.imageCover} className='w-100' alt="" />
                    </div>
                    <div className='col-md-11'>
                      <div className='d-flex justify-content-between'>
                        <div className='left-side'>
                          <h4>{wishItem.title?.split(" ").slice(0, 3).join(" ")}</h4>
                          <p><span className='text-success'>{wishItem.price}</span><span> EGP</span></p>
                          <button className="btn text-danger p-0" onClick={() => DeleteWish(wishItem.id)}>
                            <i className="fa fa-trash-can me-2"></i>
                            remove
                          </button>
                        </div>
                        <div className='right-side'>
                          <button className='btn btn-outline-success' onClick={() => { addCart(wishItem.id); DeleteWish(wishItem.id) }}>Add to Cart</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className='bg-main-light p-5 text-center d-flex justify-content-center fw-bolder'><h4>NO Items in Your WishList yet ......</h4></div>
          )}
        </>
      )}
    </>
  );
}
