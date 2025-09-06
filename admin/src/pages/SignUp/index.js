import React, { useState,} from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { BiLogInCircle } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../utlis/api';
import { useContext } from 'react';
import { MyContext } from '../../App';

 function SignUp() {

    const [loadingGoogle, setLoadingGoogle] =useState(false);
    function handleClickGoogle() {
      setLoadingGoogle(true);
    }
    const [loadingFacebook, setLoadingFacebook] =useState(false);
    function handleClickFacebook() {
      setLoadingFacebook(true);
    }

  const [isLoading,setIsLoading]=useState(false)

  const [formFields,setFormFields] = useState({
    name: '',
    email: '',
    password: ''
   });

  const context = useContext(MyContext);
  const navigate = useNavigate();

  
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
   
     if(formFields.name===''){
       context.openAlertBox('error','Please enter full name');
       return false
     }
   
       if(formFields.email===''){
       context.openAlertBox('error','Please enter email addresh');
       return false
       }
   
       if(formFields.password===''){
       context.openAlertBox('error','Please enter password');
       return false
     }
   
    postData('/api/user/register',formFields)
    .then((res)=>{
     console.log(res)
   
     if(res?.error!==true){
     setIsLoading(false)
     context.openAlertBox('success',res?.message);
     localStorage.setItem('userEmail',formFields.email)
     setFormFields({
       name: '',
       email: '',
       password: ''
     });
     navigate('/verify-account')
     }else{
     context.openAlertBox('error',res?.message)
      setIsLoading(false);
     }
    });
   }
   

  return (
    <section className='bg-white w-full'>
      {/*<header className='w-full fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50'>*/}
        <header className='w-full static lg:fixed top-0 left-0 px-4 py-3 flex items-center justify-center sm:justify-between z-50'>
        <Link to='/'>
        <img src='https://isomorphic-furyroad.vercel.app/_next/static/media/logo.a795e14a.svg' alt="logo" className='w-[200px]'/>
        </Link>
        <div className='hidden sm:flex items-center gap-2'>
        <NavLink to='/login' exact={true} activeClassName='isActive'>
         <Button className='!rounded-full !bg-[#dcdcdc] !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1'>
            <BiLogInCircle className='text-[18px]'/>Login
            </Button>
            </NavLink>
            <NavLink to='/signup' exact={true} activeClassName='isActive'>
            <Button className='!rounded-full !bg-[#dcdcdc] !text-[rgba(0,0,0,0.8)]  !px-4 flex gap-1'>
            <FiUser className='text-[18px]'/>Sign Up
            </Button>
            </NavLink>
          </div>
         </header>
      {/*<div className="loginbox card w-[550px] h-auto mx-auto pt-20 relative z-50">*/}
       <div className="loginbox card w-full md:w-[600px] h-auto mx-auto pt-5 py-6 lg:pt-20 relative z-50">
        <h1 className='text-[18px] sm:text-[35px] text-center font-[800]'>
          Join us today! Get special <br/> benifits and stay up-to-today.
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
           <h4 className='text-[14px] font-[500] mb-1'>Full Name</h4>
           <input type="text"
            className='w-full h-[35px] border border-[rgba(0,0,0,0.7)] 
            rounded-md focus:border-[(0,0,0,0.1)] px-3'
            id="name"
            name='name'
            value={formFields.name}
            disabled={isLoading===true ? true : false}
            onChange={onChangeInput}
           />
          </div>
          <div className='form-group mb-4 w-full'>
           <h4 className='text-[14px] font-[500] mb-1'>Email</h4>
           <input type="email" 
           className='w-full h-[35px] border border-[rgba(0,0,0,0.7)] 
           rounded-md focus:border-[(0,0,0,0.1)] px-3'
            id="email"
            name='email'
            value={formFields.email}
            disabled={isLoading===true ? true : false}
            onChange={onChangeInput}
           />
          </div>
          <div className='form-group mb-4 w-full'>
           <h4 className='text-[14px] font-[500] mb-1'>Password</h4>
           <input type="password" 
           className='w-full h-[35px] border border-[rgba(0,0,0,0.7)] 
           rounded-md focus:border-[(0,0,0,0.1)] px-3'
            id="password"
            name='password'
            value={formFields.password}
            disabled={isLoading===true ? true : false}
            onChange={onChangeInput}
           />
          </div>

        <div className='flex items-center justify-between mb-4'>
         <span className='text-[14px]'> Alerady have an account? </span>
         <Link to='/login' className='text-blue-500 font-[500] hover:underline 
         hover:text-[rgba(0,0,0,0.9)] cursor-pointer' 
          >
          Login
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
          'Register' 
           }

        </Button>
         </form>
        </div>
    </section>
  )
}

export default SignUp;
