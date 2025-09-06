import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { BiLogInCircle } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

 function ForgotPassword() {

  
  return (
    <section className='bg-white w-full h-[100vh]'>
      <header className='w-full static lg:fixed top-0 left-0 px-4 py-3 flex items-center justify-center sm:justify-between z-50'>
        <Link to='/'>
        <img src='https://isomorphic-furyroad.vercel.app/_next/static/media/logo.a795e14a.svg' alt="logo" className='w-[200px]'/>
        </Link>
        <div className='hidden sm:flex items-center gap-2'>
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
        <div className="loginbox card w-full md:w-[600px] h-auto mx-auto pt-5 py-6 lg:pt-20 relative z-50">
         <h1 className='text-[18px] sm:text-[35px] text-center font-[800]'>Having trouble to sign in?<br/>
          Reset your password.
         </h1>
           <br />
         <form className='w-full px-8 mt-3'>
          <div className='form-group mb-4 w-full'>
           <h4 className='text-[12px] sm:text-[14px] font-[500] mb-1'>Email</h4>
           <input type="email" className='w-full h-[35px] border border-[rgba(0,0,0,0.7)] 
           rounded-md focus:border-[(0,0,0,0.1)] px-3' placeholder='Enter your email'/>
          </div>
          <div className='form-group mb-4 w-full flex items-center justify-between'>
          <FormControlLabel 
          control={<Checkbox defaultChecked />} 
          label="Remember me"/>
          <Link to='/forgot-password' className='text-blue-500 font-[500]
           hover:underline hover:text-[rgba(0,0,0,0.9)]'>Forgot Password?</Link>
          </div>
          <Button className='w-full !bg-black !text-white'>Reset Password</Button>
            <br/><br/>
            <div className='text-center flex items-center justify-center gap-4'>
                <span>Don't want to reset?</span> 
             <Link to='/forgot-password'
             className='text-blue-500 font-[700] text-[15px] hover:underline hover:text-gray-700'>
                Sign In?
             </Link>
            </div>
         </form>
        </div>
    </section>
  )
}
export default ForgotPassword;
