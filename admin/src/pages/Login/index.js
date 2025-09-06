import React,{ useContext, useState } from 'react';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { BiLogInCircle } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { MyContext } from '../../App';
import { postData } from '../../utlis/api';
import CircularProgress from '@mui/material/CircularProgress';

 function Login() {

    const [loadingGoogle, setLoadingGoogle] =useState(false);
    function handleClickGoogle() {
      setLoadingGoogle(true);
    }
    const [loadingFacebook, setLoadingFacebook] =useState(false);
    function handleClickFacebook() {
      setLoadingFacebook(true);
    }

  const [isLoading,setIsLoading]=useState(false);
  const [formFields,setFormFields]=useState({
   email:'',
   password:''
   });
 const context=useContext(MyContext);
 const navigate =useNavigate();

    
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
            navigate('/verify-account')
           }else{
            context.openAlertBox('error',res?.message);
           }
          });
        }
     }


  return (
    <section className='bg-white w-full'>
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
         <h1 className='text-[18px] sm:text-[35px] text-center font-[800]'>Welcome Back! <br/>
          Sign in with your credentials.
         </h1>
         <div className='flex items-center justify-center gap-4 w-full mt-5'>
         <Button
          size="small"
          onClick={handleClickGoogle}
          endIcon={<FcGoogle className='!text-[25px]'/>}
          loading={loadingGoogle}
          loadingPosition="end"
          className='!bg-none !text-[15px] !capitalize !px-5 !text-[rgba(0,0,0,0.7)]'
         variant="outlined">
          Signin with Google
        </Button>
        <Button
          size="small"
          onClick={handleClickFacebook}
          endIcon={<FaFacebook className='!text-[25px]'/>}
          loading={loadingFacebook}
          loadingPosition="end"
          className='!bg-none !text-[15px] !capitalize !px-5 !text-[rgba(0,0,0,0.7)]'
         variant="outlined">
          Signin with Facebook
        </Button>
         </div>
           <br />
         <div className='w-full flex items-center justify-center gap-3'>
          <span className='flex items-center w-[100px] h-[1px] bg-gray-400'></span>
          <span className='text-[10px] lg:text-[14px] font-[500]'>Or, Sign in with your email</span>
          <span className='flex items-center w-[100px] h-[1px] bg-gray-400'></span>
         </div>
          <br/>
         <form className='w-full px-8 mt-3' onSubmit={handleSubmit}>
          <div className='form-group mb-4 w-full'>
           <h4 className='text-[14px] font-[500] mb-1'>Email</h4>
         <input  
          type='email'
          id="email" 
          name='email'
          value={formFields.email}
          disabled={isLoading===true ? true : false}
          onChange={onChangeInput}
          className='w-full h-[35px] border border-[rgba(0,0,0,0.7)] 
          rounded-md focus:border-[(0,0,0,0.1)] px-3'
           />
          </div>
          <div className='form-group mb-4 w-full'>
           <h4 className='text-[14px] font-[500] mb-1'>Password</h4>
          <input
           type="password"
           name='password'
           value={formFields.password}
           disabled={isLoading===true ? true : false} 
           onChange={onChangeInput}
           className='w-full h-[35px] border border-[rgba(0,0,0,0.7)] 
           rounded-md focus:border-[(0,0,0,0.1)] px-3'
         />
          </div>
          <div className='form-group mb-4 w-full flex items-center justify-between'>
          <FormControlLabel 
          control={<Checkbox defaultChecked />} 
          label="Remember me"/>
          <a className='text-blue-500 font-[500] hover:underline hover:text-[rgba(0,0,0,0.9)] cursor-pointer' 
           onClick={forgotPassword}>
            Forgot Password?
           </a>
          </div>
          <div className='flex items-center justify-between mb-4'>
           <span className='text-[14px]'> Don't have an account? </span>
           <Link to='/signup' className='text-blue-500 font-[500] hover:underline 
           hover:text-[rgba(0,0,0,0.9)] cursor-pointer' 
            >
            Sign Up
           </Link>
          </div>
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
         </form>
        </div>
    </section>
  )
}

export default Login;
