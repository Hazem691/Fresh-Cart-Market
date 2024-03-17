import React from 'react'
import styles from './CodeVerify.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SetNewPassword from '../SetNewPassword/SetNewPassword'
export default function CodeVerify() {
  let navigate = useNavigate() ;
  async function theCode(values){
    try{
      let data = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values);
      console.log(data) ;
      if(data.data.status=="Success"){
        navigate('/SetNewPassword') ;
      }
    } catch(err){
      console.log("error : " , err) ;
    }
  }
  let formik = useFormik({
    initialValues:{
      resetCode : ""
    },
    onSubmit : theCode ,
    
  })
  return (
    <>
    <div className='d-flex justify-content-center align-items-center'>
    <div className='container mt-5'>
     <h2 className='fw-bolder mb-5'>please enter your verification code</h2>
         <form onSubmit={formik.handleSubmit}>
          <label htmlFor="code">verfied code</label>
          <input type="text" name='resetCode' className=' form-control mb-5' placeholder="Code" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} />
         

          <button className='btn btn-outline-success' type='submit'>Verify</button>
       
         </form>
       </div>
    </div>
 </>
  )
}
