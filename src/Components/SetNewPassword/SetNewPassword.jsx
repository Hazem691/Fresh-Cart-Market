import React from 'react'
import styles from './SetNewPassword.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Home from '../Home/Home'

export default function SetNewPassword() {
  let navigate = useNavigate() ;

  async function setNewPass(values){
     try{
      let data = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
      console.log(data) ;
      if(data.data.token!=null){
        navigate('/Home')

      }
     }catch(err){
      console.log("error : ",err);
     }
  }

   let formik = useFormik({
    initialValues : {
      email:"",
      newPassword: ""
    },
    onSubmit :setNewPass
   })


  return (
   <>
       <div className='container'>
       <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="text" name='email' id='email' />
                  
                    
                    <label htmlFor="newPassword">new password</label>
                    <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} type="password" name='newPassword' id='newPassword' />
                    

                    <button className='btn btn-outline-success' type="submit">Reset</button>
                </form>
       </div>
   </>
  )
}
