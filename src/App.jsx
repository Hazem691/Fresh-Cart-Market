import logo from './logo.svg';
import './App.css';

import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import LayOut from './Components/LayOut/LayOut';
import Home from './Components/Home/Home'
import Categories from './Components/Categories/Categories'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Products from './Components/Products/Products'
import NotFound from './Components/NotFound/NotFound'
import details from './Components/Details/Details'
import checkout from './Components/CheckOut/CheckOut'
import { useContext, useEffect } from 'react';
import { TokenCounter } from './Context/Token';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import Details from './Components/Details/Details';
import CheckOut from './Components/CheckOut/CheckOut';
import AllOrders from './Components/AllOrders/AllOrders'
import WishList from './Components/WishList/WishList'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import CodeVerify from './Components/CodeVerify/CodeVerify'
import SetNewPassword  from './Components/SetNewPassword/SetNewPassword';
function App() {

    let {setToken} = useContext(TokenCounter);

    useEffect(()=>{
        if(localStorage.getItem("usertoken")!= null){

            setToken(localStorage.getItem("usertoken")) ;
        
        }
    },[]) ;
   // 
  const routes =  createBrowserRouter([
            {path : "/Fresh-Cart-Market",element : <LayOut/> , children :[
            {path : "home",element:<ProtectedRoutes><Home/></ProtectedRoutes>},
            {path : "products",element:<ProtectedRoutes><Products/></ProtectedRoutes>},
            {path : "categories",element:<ProtectedRoutes><Categories/></ProtectedRoutes>},
            {path: "details/:id",element:<ProtectedRoutes><Details/></ProtectedRoutes>},
            {path : "wishlist",element:<ProtectedRoutes><WishList/></ProtectedRoutes>},
            {path : "checkout" ,element : <ProtectedRoutes><CheckOut/></ProtectedRoutes>},
            {path : "allorders" ,element: <ProtectedRoutes><AllOrders/></ProtectedRoutes>},
            {path : "register",element: <Register/>},
            {path : "login" ,element : <Login/>},
            {path : "codeverify",element:<CodeVerify/>} ,
            {path : "forgetpassword",element :<ForgetPassword/>},
            {path : "setnewpassword",element : <SetNewPassword/>},
            {path : "brands" ,element : <ProtectedRoutes><Brands/></ProtectedRoutes>},
            {path : "cart" , element : <ProtectedRoutes><Cart/></ProtectedRoutes>},
            {path : "*" ,element : <NotFound/>},
        ]}]) ;

        return(
            <>
            <RouterProvider router={routes}></RouterProvider>
            </>
        )
    
}

export default App;
