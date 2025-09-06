import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { MyContext } from '../../App';
import { postData } from '../../utlis/api';
import CircularProgress from '@mui/material/CircularProgress';

function Login() {

const [isLoading,setIsLoading]=useState(false);
const [isShowPassword,setIsShowPassword]=useState(false);
const [formFields,setFormFields]=useState({
  email:'',
  password:''
});

const context=useContext(MyContext);
const navigate =useNavigate();

useEffect(()=>{
  window.scrollTo(0,0)
})

const onChangeInput = (e)=>{
  const {name,value} = e.target;
  setFormFields(()=>{
    return {
      ...formFields,
      [name]:value
    }
  })
}

 const valideValue = Object.values(formFields).every(el => el)
 const handleSubmit = (e)=>{
  e.preventDefault();
  setIsLoading(true);
  if(formFields.email===''){
  context.openAlertBox('error','Please enter email addresh');
  return false
  }
 
 if(formFields.password===''){
 context.openAlertBox('error','Please enter password');
 return false
}
 
  postData('/api/user/login',formFields,{withCredentials: true})
  .then((res)=>{
  
   if(res?.error!==true){
   setIsLoading(false)
   context.openAlertBox('success',res?.message);
   localStorage.setItem('userEmail',formFields.email)
   setFormFields({
     email: '',
     password: ''
   });

  localStorage.setItem('accessToken',res?.data?.accessToken);
  localStorage.setItem('refreshToken',res?.data?.refreshToken);

   context.setIsLogin(true); 

   navigate('/')
   }else{
   context.openAlertBox('error',res?.message)
    setIsLoading(false);
   }
 
  });
 }

const forgotPassword = () => {
  if (formFields.email==="") {
   context.openAlertBox('error', 'Please enter your email!');
   return false;
    } else{
      context.openAlertBox('success', `OTP Send to ${formFields.email}`);
      localStorage.setItem('userEmail',formFields.email);
      localStorage.setItem('actionType','forgot-password');

           postData('/api/user/forgot-password',{
           email: formFields.email,
          }).then((res)=>{
           if(res?.error===false){
            context.openAlertBox('success',res?.message);
            navigate('/verify')
           }else{
            context.openAlertBox('error',res?.message);
           }
          });
        }
     }

   return (
    <section className='section py-5 sm:py-10'>
      <div className='w-[95%] m-auto'>
       <div className='card m-auto shadow-md w-full sm:w-[400px] rounded-md bg-white p-8 px-10'>
        <h3 className='text-center text-[18px] text-black'>Login to your account</h3>
        <form className="w-full mt-5" onSubmit={handleSubmit}>
         <div className="form-group w-full mb-5">
         <TextField 
          type='email'
          id="email" 
          name='email'
          value={formFields.email}
          disabled={isLoading===true ? true : false}
          label="Email Id *"
          variant="outlined"
          className='w-full'
          onChange={onChangeInput}
          />
          </div> 
          <div className="form-group w-full mb-5 relative">
         <TextField 
          type={isShowPassword=== false ? 'password' : 'text'}
          id="password"
          name='password'
          value={formFields.password}
          disabled={isLoading===true ? true : false} 
          label="password *"
          variant="outlined"
          className='w-full'
          onChange={onChangeInput}
           />
           <Button type='submit' className='!absolute top-[8px] right-[5px] z-50 !w-[35px] !h-[35px] 
           !min-w-[35px] !rounded-full !text-black' onClick={()=>setIsShowPassword(!isShowPassword)}>

           {
            isShowPassword===true ?  <FaEye className='text-[20px] opacity-75'/> :  <IoEyeOff className='text-[20px] opacity-75'/> 
           }

           </Button>
          </div> 

          <a className="transition-all duration-300 hover:text-[#ff5252] 
          cursor-pointer text-[14px] font-[600]" onClick={forgotPassword}>
            Forgot Password?
            </a>

          <div className='flex items-center w-full mt-3 mb-3'>
            <Button
              type='submit'
                disabled={!valideValue}
                fullWidth
                variant="contained"
                className='!bg-[#ff5252] hover:!bg-black !text-white font-medium flex gap-3'>
                      
                   {
                   isLoading === true ? <CircularProgress color="inherit"/> 
                    :
                   'Login' 
                    }
            
                </Button>
           </div>
          <p className='text-center text-sm'>Not Registered?{' '} <Link to='/register' className=' !transition-all !duration-300 hover:!text-[#ff5252] text-[14px] font-[600] !text-[#ff5252]'>Sign Up</Link></p>
          <p className='text-center text-sm font-medium text-gray-600'>Or continue with social acount</p>
          <Button 
          fullWidth
          variant="outlined"
          className="!bg-gray-100 hover:!bg-gray-200 !text-black flex items-center justify-center gap-3">
          <FcGoogle className="text-xl"/> Login with Google
          </Button>
         </form>
       </div>
      </div>
    </section>
  )
}

export default Login;
