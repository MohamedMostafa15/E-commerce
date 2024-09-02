import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import style from "./Register.module.css"
import { useFormik, yupToFormErrors } from 'formik'
import  axios  from 'axios'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext'

export default function Register() {
  let {setuserLogin} = useContext(UserContext);
  let navigate = useNavigate();
// async function handleRegister(formValues){
// let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , formValues)
// if(data.message === 'success'){
// navigate('/')
// }
// else{
// }
//  }

let [apiError,setapiError] =  useState('');
let [isLoading,setIsLoading] =  useState(false);
function handleRegister(formValues){
  setIsLoading(true);
  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , formValues)
.then((response)=>{
  setIsLoading(false);
  if(response.data.message === 'success'){
    localStorage.setItem('userToken',response.data.token);
    setuserLogin(response.data.token);
    navigate('/')
  }
  
})
.catch((response)=>{
  setIsLoading(false);
  setapiError(response?.data?.message);
})
}


 let validationSchema = Yup.object().shape({
  name:Yup.string().min(3,'min length is 3').max(10,'max length is 10').required('name is required'),
  email:Yup.string().email('email is invalid').required('email is required'),
  phone:Yup.string().matches(/^1[0125][0-9]{8}$/,'phone must be eg number').required('phone is required'),
  password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password must be start uppercase').required('password is required'),
  rePassword:Yup.string().oneOf([Yup.ref('password')] , 'password and repassword must be same').required('repassword is required')
})
  let formik = useFormik({
    initialValues:{
name:'',
phone:'',
email:'',
password:'',
rePassword:''
    },
    validationSchema:validationSchema,
    onSubmit:handleRegister

  })

  return <>
  <div className='py-6 max-w-xl mx-auto'>  
   {apiError?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{apiError} </div>:null}
  <form onSubmit={formik.handleSubmit}>
    <h2 className='text-3xl font-bold mb-6 text-green-600'>Register Now</h2>
  
    <div className="relative z-0 w-full mb-5 group">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Name:</label>
  </div>

{formik.errors.name && formik.touched.name ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.name}
</div> : null }
 

  <div className="relative z-0 w-full mb-5 group">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Email:</label>
  </div>

  {formik.errors.email && formik.touched.email ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.email}
</div> : null }
 

  <div className="relative z-0 w-full mb-5 group">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="number" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your phone:</label>
  </div>

  {formik.errors.phone && formik.touched.phone ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.phone}
</div> : null }
 

  <div className="relative z-0 w-full mb-5 group">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your password:</label>
  </div>

  {formik.errors.password && formik.touched.password ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.password}
</div> : null }
 

  <div className="relative z-0 w-full mb-5 group">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your repassword:</label>
  </div>

  {formik.errors.rePassword && formik.touched.rePassword ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.rePassword}
</div> : null }
 
  
  <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
{isLoading == true ? <i className='fas fa-spinner fa-spin'></i> :'Submit'}
</button>
  </form>  
  </div>
  </>
}
