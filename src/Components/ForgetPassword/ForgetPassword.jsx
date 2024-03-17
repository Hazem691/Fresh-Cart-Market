import React from 'react'
import styles from './ForgetPassword.module.css'
import CodeVerify from '../CodeVerify/CodeVerify'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import axios from 'axios';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
export default function ForgetPassword() {
  let headers = {
    token: localStorage.getItem('usertoken'),
  }  
  let navigte = useNavigate() ;
  async function ForgotThePassword(values) {
    try {
      let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values);
      console.log(response.data);
      if(response.data.statusMsg == "success"){

        navigte('/CodeVerify') ;

        

      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  let theValidatedEmail = Yup.object({
    email: Yup.string().required("email is required").email("email is invalid"),
})
let formik = useFormik({
    initialValues: {
        email: '',
    },
    onSubmit: ForgotThePassword,
    validationSchema: theValidatedEmail,
});







  return (
    <>
       <Helmet><title>Forget Password</title></Helmet>
       <div className='d-flex justify-content-center align-items-center'>
       <div className='container mt-5'>
        <h2 className='fw-bolder mb-5'>please enter your verification code</h2>
            <form onSubmit={formik.handleSubmit }>
             <label htmlFor="email">Emil</label>
             <input type="text" name='email' className=' form-control mb-5' placeholder="Email"  onChange={formik.handleChange} value={formik.values.email} />
             {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ""}

             <button className='btn btn-outline-success' type='submit'>Verify</button>
          
            </form>
          </div>
       </div>
    </>
  )
}
