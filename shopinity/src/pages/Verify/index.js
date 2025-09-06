import React, { useContext, useState } from 'react'
import {verify1} from '../../assets/images/index.js';
import OtpBox from '../../components/OtpBox/index.js';
import Button from '@mui/material/Button';
import { postData } from '../../utlis/api.js';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App.js';

function Verify() {

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
        localStorage.removeItem('userEmail');
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
        navigate('/forgotPassword')
       }else{
        context.openAlertBox('error',res?.message);
       }
      });
     }
   }  
   return (
       <section className='section py-5 lg:py-10'>
          <div className='w-[95%] m-auto'>
           <div className='card m-auto shadow-md w-full sm:w-[400px] rounded-md bg-white p-8 px-10'>
            <div className='text-center flex items-center justify-center'>
             <img src={verify1} alt="" className='w-[80px]'/>
            </div>
            <h3 className='text-center text-[18px] text-black mt-4 mb-1'>Verify OTP</h3>
              
             <p className='text-center mt-0 mb-4'>OTP send to <span className='text-[#ff5252]
              font-bold'>{localStorage.getItem('userEmail')}</span></p>

            <form onSubmit={verifyOTP}>
            <OtpBox length={6} onChange={handleOtpChange}/>
             <div className='flex items-center justify-center mt-5 px-3'>
              <Button type='submit' className='w-full !text-white !bg-[#ff5252] transition-all duration-300 hover:!bg-black !rounded-md'>Verify OTP</Button>
             </div>
            </form>
           </div>
          </div>
        </section>
      )
     }

  export default Verify;
