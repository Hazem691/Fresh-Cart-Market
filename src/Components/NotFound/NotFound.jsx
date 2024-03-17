import React from 'react'
import styles from './NotFound.module.css'
import Notfoundimg from '../../Assets/images/error.svg'
export default function NotFound() {
  return (
    <h2>
      <img src={Notfoundimg} className='w-100' alt="" />
    </h2>
  )
}
