import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'


export let CartContext= createContext();

let headers = {
    token : localStorage.getItem('usertoken'),
}

function addToCart(id){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
        productId : id},
        {
        headers,
        }
    
    ).then((res)=>res).catch((err)=>err);
}


function getCart(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers , 
    }).then((res)=>res).catch((err)=>err) ;
}

function removeCartItem(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers , 
    }).then((res)=>res).catch((err)=>err) ;
}



function updateCartItem(id, count) {
    
    return axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        {
            headers,
        }
    ).then((res) => res).catch((err) => err);
}

export default function CartContextProvider(props) {

    const [numofCartItem, setNumOfCartItem] = useState(null) ;
    const [cartId , setCartId] = useState(null) ;

    async function initializeCart(){
        let {data} = await getCart();
        setNumOfCartItem(data?.numOfCartItems) ;
        setCartId(data?.data?._id)
    }
    function onlinePayment(shippingAddress){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3001`,
        {
            shippingAddress,
        },
            {
                headers ,
        }).then((res)=>res).catch((err)=>err)
    }
    

    useEffect(()=>{
        initializeCart();
    },[]) ;
    return (
        <CartContext.Provider value={{ addToCart, getCart, removeCartItem, updateCartItem,onlinePayment , setNumOfCartItem,setCartId, numofCartItem }}>
            {props.children}
        </CartContext.Provider>
    );
}
