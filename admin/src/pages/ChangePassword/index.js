import React,{ useContext, useState } from 'react';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { BiLogInCircle } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from '../../utlis/api';

 function ChangePassword() {

   const [isLoading,setIsLoading]=useState(false)
   const [isShowPassword1, setIsShowPassword1] = useState(false);
   const [isShowPassword2, setIsShowPassword2] = useState(false);
   const [formFields, setFormFields] = useState({
      email: localStorage.getItem('userEmail'),
      newPassword: '',
      confirmPassword: '',
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
     if(formFields.newPassword===''){
     context.openAlertBox('error','Please enter new password');
     setIsLoading(false);
     return false
     }

     if(formFields.confirmPassword!==formFields.newPassword){
     context.openAlertBox('error','Password confirm password not match');
     setIsLoading(false);
     return false
     }

   const token = localStorage.getItem('accessToken');
   
   postData(`/api/user/reset-password`,formFields,token)
   .then((res)=>{
   localStorage.removeItem('userEmail');
   localStorage.removeItem('actionType')
   setIsLoading(false);
   navigate('/login')
   })

   }

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
         <h1 className='text-[18px] sm:text-[35px] text-center font-[800]'>Welcome Back! <br/>
          You can change password from here.
         </h1>
           <br/>
         <form className='w-full px-3 sm:px-3 mt-3' onSubmit={handleSubmit}>
          <div className='form-group mb-4 w-full'>
           <h4 className='text-[14px] font-[500] mb-1'>New Password</h4>
           <input 
           type={isShowPassword1 ? 'text' : 'password'}
           id="password" 
           name='newPassword'
           value={formFields.newPassword}
           disabled={isLoading===true ? true : false}
           onChange={onChangeInput}
           className='w-full h-[35px] border border-[rgba(0,0,0,0.7)] 
           rounded-md focus:border-[(0,0,0,0.1)] px-3'/>
          </div>
           <div className='form-group mb-4 w-full'>
           <h4 className='text-[14px] font-[500] mb-1'>Confirm Password</h4>
           <input 
           type={isShowPassword2 ? 'text' : 'password'}
           id="Confirm_password"   
           name='confirmPassword'
           value={formFields.confirmPassword}
           disabled={isLoading===true ? true : false}
           onChange={onChangeInput}
           className='w-full h-[35px] border border-[rgba(0,0,0,0.7)] 
           rounded-md focus:border-[(0,0,0,0.1)] px-3'/>
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
                 'Change Password' 
               }
            
           </Button>
         </form>
        </div>
    </section>
  )
}

export default ChangePassword;
