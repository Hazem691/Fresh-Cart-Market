import React, { useContext } from 'react'
import styles from './Home.module.css'
import Cart from '../Cart/Cart'
import Categories from '../Categories/Categories'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import { CounterContext } from '../../Context/Counter';
import MainSlider from '../MainSlider/MainSlider';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import { Helmet } from 'react-helmet'
export default function Home() {
  let {counter , setCounter} = useContext(CounterContext) ;
  
  return(
    <>
    <Helmet><title>Home</title></Helmet>
    <MainSlider/>
    <CategoriesSlider/>
    <FeaturedProducts/>

    </>
  )
}
