import React, { useState } from 'react'
import styles from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function Register() {

  let navigation = useNavigate();

  const [errorMssg , setError] = useState("") ;
  const [isloading , setloading] = useState(false) ;

  async function callRegister(reqBody) {
     setError("") ;
     setloading(true) ;
    
      let {data} = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signup", reqBody).catch((err)=>setError(err.response.data.message))
      console.log("this is our data ", data);
      if(data.message === "success"){
        localStorage.setItem("usertoken",data.token) ;
        navigation('/login')  

      }
    
    
  } ;
  
    //   Hazem012

  const validationSchema = Yup.object({
    name: Yup.string().min(3, "this name is too short").required("Required"),
    email: Yup.string().email("This email is invalid").required("Required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"invalid password").required("Required"),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "should match password").required("Required"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "invalid phone number").required("Required"),
  });


  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

    validationSchema,
    onSubmit: callRegister,


  }) ;


  return (
    <>
    <Helmet><title>Register</title></Helmet>
      <div className='container mx-auto my-5 p-4'>
        <h2 className='mb-3'>Register Now :</h2>
        {errorMssg? <div className='alert alert-danger '>{errorMssg}</div>:null}
        <form onSubmit={registerForm.handleSubmit} >
          <div className='form-group '>
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id='fullName' name='name' className=' form-control' value={registerForm.values.name} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
            {registerForm.errors.name && registerForm.touched.name ? <div className='alert alert-danger text-danger'>{registerForm.errors.name}</div> : null}
          </div>
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
          <div className='form-group '>
            <label htmlFor="Repassword">Repassword</label>
            <input type="password" onBlur={registerForm.handleBlur} id='Repassword' name='rePassword' className=' form-control' value={registerForm.values.rePassword} onChange={registerForm.handleChange} />
            {registerForm.errors.rePassword && registerForm.touched.rePassword ? <div className='alert alert-danger  text-danger'>{registerForm.errors.rePassword}</div> : null}
          </div>

          <div className='form-group '>
            <label htmlFor="Phone">Phone</label>
            <input type="tel" id='Phone' name='phone' onBlur={registerForm.handleBlur} className=' form-control' value={registerForm.values.phone} onChange={registerForm.handleChange} />
            {registerForm.errors.phone && registerForm.touched.phone ? <div className='alert alert-danger  text-danger'>{registerForm.errors.phone}</div> : null}
          </div>
          <button className='btn bg-main text-white d-block ms-auto mt-2'>{isloading?<i className='fa fa-spinner fa-spin'></i> : "Register"}</button>
        </form>

      </div>
    </>

  )
}
