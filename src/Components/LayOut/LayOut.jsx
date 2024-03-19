import React from 'react'
import styles from './LayOut.module.css'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import {Toaster} from 'react-hot-toast';
import Register from '../Register/Register'
export default function LayOut() {
  return (
    <>
    <NavBar/>
      
     <Outlet></Outlet>
    <Toaster/>
     
     <Footer/>
     
    </>
  )
}
