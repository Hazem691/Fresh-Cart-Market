import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let WishContext = createContext() ;

let headers = {
    token : localStorage.getItem('usertoken'),
}

function addToWishList(id){
    return axios.post(`https://route-ecommerce.onrender.com/api/v1/wishlist`,{
        productId : id
    },{
        headers,
    }
    ).then((res)=>res).catch((err)=>err)
}


function getWishList(id){
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/wishlist`,{
        headers,
    }
    ).then((res)=>res).catch((err)=>err)
}

export default function WishContextProvider(props){

    const [redIcon , setRedIcon] = useState([]);
    function setRedClicked(theId) {
        if (!redIcon.includes(theId)) {
          setRedIcon([...redIcon,theId]);
        }
      }
      async function deleteWish(id) {
        try {
          await axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${id}`, {
            headers,
          });
          // Remove the deleted product ID from the redIcon state
          setRedIcon(redIcon.filter(itemId => itemId !== id));
        } catch (error) {
          console.error('Error deleting wish:', error);
        }
      }



    return <WishContext.Provider value={{addToWishList,getWishList,deleteWish,setRedClicked,redIcon,setRedIcon}}>
        {props.children}
    </WishContext.Provider>
}