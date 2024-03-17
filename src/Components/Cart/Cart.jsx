import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'
export default function Cart(props) {
   let {getCart} = useContext(CartContext) ;
   let {removeCartItem} = useContext(CartContext) ;
   let {updateCartItem} = useContext(CartContext) ;
   let {setNumOfCartItem} = useContext(CartContext);
   const [cartDetail , setCartDetails] = useState({ }) ;
   
   async function getCartDetails(){
    let {data} = await getCart() ;
    console.log(data); 
    setCartDetails(data);
    setNumOfCartItem(data.numOfCartItems)

   }

   async function deleteCart(id){
      let {data} = await removeCartItem(id);
      setCartDetails(data) ;
      setNumOfCartItem(data.numOfCartItems)
      
   }

   async function updateCart(id,count){
     let {data} = await updateCartItem(id,count) ;
     setCartDetails(data) ;
     setNumOfCartItem(data.numOfCartItems)
   }

   useEffect(()=>{
     getCartDetails();
   },[]) ;
  return (
    
    <>
    <Helmet><title>Cart</title></Helmet>
     {cartDetail.data ?
      
      
      <div className='container my-5'>
         <div className="mx-auto bg-main-light p-5">
          <h1>Cart Shop</h1>
          <div className="d-flex align-items-center justify-content-between">
            <h6>Total Price : <span className='text-main'>{cartDetail.data.totalCartPrice} EGP</span></h6>
            <h6>Total Cart Item : <span className='text-main'>{cartDetail.numOfCartItems}</span></h6>
          </div>

           {cartDetail.data.products.map((ele)=><div className='row py-2 border-bottom gy-2 mb-4' key={ele._id}>
            <div className='col-md-1'>
              <img src = {ele.product.imageCover} className="w-100" alt="" />  
            </div>
             <div className='col-md-11'>

              <div className='d-flex justify-content-between '>
                <div className='left-sided'>
                  <h4>{ele.product.title.split(" ").slice(0,3).join(" ")}</h4>
                  <p>{ele.price} EGP</p>

                </div>
                <div className='right-sided'>
                  <button className=" btn btn-outline-success  " onClick = {()=>updateCart(ele.product._id,ele.count - 1)}  disabled = {ele.count === 0 ? 'disabled': false} > - </button>
                  <span className='mx-3'>{ele.count}</span>
                  <button className='btn btn-outline-success' onClick = {()=>updateCart(ele.product._id,ele.count + 1)} >+</button>
                </div>
              </div>
              <button className = "btn text-danger p-0" onClick = { ()=>deleteCart(ele.product._id)} >
                <i className = "fa fa-trash-can me-2"></i>
                remove
                </button>

             </div>

          </div>)}


          <Link to={'/checkout'} className='btn btn-outline-success w-100 my-5' >Check Out</Link>
           
         </div>
      </div>
       : null } 
       </>
     
      
   
  )
}
