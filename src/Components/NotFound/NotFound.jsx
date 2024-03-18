import React from 'react'
import styles from './NotFound.module.css'
import Notfoundimg from '../../Assets/images/error.svg'
import { Helmet } from 'react-helmet'
export default function NotFound() {
  return (
    <>
      <Helmet><title>Not Found</title></Helmet>
      <h2>
      <img src={Notfoundimg} className='w-100' alt="" />
    </h2>
    </>


    
  )
}
