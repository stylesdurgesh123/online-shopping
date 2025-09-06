import React, { useContext, useState } from 'react';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { BiLogInCircle } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import IconImage from '../../assets/verifyimg1.png'
import OtpBox from '../../Components/OtpBox';
import { MyContext } from '../../App';
import { postData } from '../../utlis/api';

 function VerifyAccount() {

 const [otp,setOtp]=useState('');

 const handleOtpChange=(value)=>{
    setOtp(value)
      } 
 

  const navigate = useNavigate();
  const context = useContext(MyContext);

  const verifyOTP=(e)=>{
    e.preventDefault();

  const actionType = localStorage.getItem('actionType');

  if(actionType!=='forgot-password'){
    postData('/api/user/verifyEmail',{
     email: localStorage.getItem('userEmail'),
     otp:otp
    }).then((res)=>{
     if(res?.error===false){
      context.openAlertBox('success',res?.message);
      localStorage.removeItem('userEmail')
      navigate('/login')
     }else{
      context.openAlertBox('error',res?.message);
     }
    });
   } else{
   postData('/api/user/verify-forgot-password-otp',{
     email: localStorage.getItem('userEmail'),
     otp:otp
    }).then((res)=>{
     if(res?.error===false){
      context.openAlertBox('success',res?.message);
      navigate('/change-password')
     }else{
      context.openAlertBox('error',res?.message);
     }
    });
   }
    }  
  

  return (
    <section className='bg-white w-full h-[100vh]'>
      <header className='w-full static lg:fixed top-0 left-0 px-4 py-3 flex items-center justify-center sm:justify-between z-50'>
        <Link to='/'>
        <img src='https://isomorphic-furyroad.vercel.app/_next/static/media/logo.a795e14a.svg' alt="logo" className='w-[200px]'/>
        </Link>
        <div className='hidden sm:flex items-center  gap-2'>
        <NavLink to='/login' exact={true} activeClassName='isActive'>
         <Button className='!rounded-full !text-[#fff]  !px-5 flex gap-1'>
            <BiLogInCircle className='text-[18px]'/>Login
            </Button>
            </NavLink>
            <NavLink to='/signup'>
            <Button className='!rounded-full !bg-[#dcdcdc] !text-[rgba(0,0,0,0.8)]  !px-4 flex gap-1'>
            <FiUser className='text-[18px]'/>Sign Up
            </Button>
            </NavLink>
          </div>
         </header>
        <div className="loginbox w-full md:w-[600px] h-auto mx-auto pt-5 py-6 lg:pt-20 relative z-50">
        <img src={IconImage} alt="" className='w-[100px] m-auto'/>
         <h1 className='text-[18px] sm:text-[35px] text-center font-[800]'>Welcome Back! <br/>
          Please Verify Your Email
         </h1>
          <br/>
          <p className='text-center text-[12px] sm:text-[14px]'>OTP send to <span className='text-blue-500
          font-bold'>
            {localStorage.getItem('userEmail')}</span></p>
           <br/>
          <form onSubmit={verifyOTP}>
           <div className='text-center flex items-center justify-center flex-col'>
            <OtpBox length={6} onChange={handleOtpChange}/>
           </div>
           <br/>
           <div className='w-[300px] m-auto'>
           <Button type='submit' className='!bg-indigo-500 !text-white !font-[500] !w-full'>Verify Otp</Button>
           </div>
          </form>
        </div>
    </section>
  )
}

export default VerifyAccount;
