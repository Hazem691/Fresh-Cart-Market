import React, { useContext } from 'react'
import styles from './Login.module.css'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { TokenCounter } from '../../Context/Token'
import ForgetPassword from '../ForgetPassword/ForgetPassword' 
import { Helmet } from 'react-helmet'
export default function Login() {
  let navigation = useNavigate();

  let {setToken} = useContext(TokenCounter) ;



  async function callRegister(reqBody) {
    try {
      let { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signin", reqBody);
      console.log("this is our data ", data);
      if (data.message === "success") {
        navigation('/home');
        localStorage.setItem("usertoken", data.token);
        setToken(data.token);
      }
    } catch (error) {
      console.error('Error occurred during registration:', error);
      // Handle the error here, such as displaying an error message to the user
    }
  }
  
    //   Hazem012

  const validationSchema = Yup.object({
    
    email: Yup.string().email("This email is invalid").required("Required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"invalid password").required("Required"),

  });


  const registerForm = useFormik({
    initialValues: {
     
      email: "",
      password: "",
     
    },

    validationSchema,
    onSubmit: callRegister,


  }) ;
  return (
    <>
      <Helmet><title>Login</title></Helmet>
      <div className='w-50 mx-auto my-5 p-4'>
        <h2 className='mb-3'>Login Now :</h2>
        <form onSubmit={registerForm.handleSubmit} >
       
          <div className='form-group '>
            <label htmlFor="Email">Email</label>
            <input type="text" id='Email' name='email' className=' form-control' value={registerForm.values.email} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
            {registerForm.errors.email && registerForm.touched.email ? <div className='alert alert-danger  text-danger'>{registerForm.errors.email}</div> : null}
          </div>
          <div className='form-group '>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' name='password' className=' form-control' onBlur={registerForm.handleBlur} value={registerForm.values.password} onChange={registerForm.handleChange} />
            {registerForm.errors.password && registerForm.touched.password ? <div className='alert alert-danger  text-danger'>{registerForm.errors.password}</div> : null}
          </div>
          <button className='btn bg-main text-white d-block ms-auto mt-2'>Register</button>
          <Link to={'/ForgetPassword' } className='text-success fw-bolder text-decoration-none' >Forget Password ..</Link>
        </form>

      </div>
    </>
  )
}



