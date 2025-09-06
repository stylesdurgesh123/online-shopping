import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { postData } from '../../utlis/api';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

function Register() {
const [isLoading,setIsLoading]=useState(false)
const [isShowPassword,setIsShowPassword]=useState(false);
const [formFields,setFormFields] = useState({
  name: '',
  email: '',
  password: ''
});

const context = useContext(MyContext)
const navigate = useNavigate();

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
  navigate('/verify')
  }else{
  context.openAlertBox('error',res?.message)
   setIsLoading(false);
  }

 });
}

  return (
    <section className="py-2 lg:py-6 bg-gray-50 min-h-screen flex items-center justify-center">
    <div className="w-full max-w-md bg-white p-8 rounded-md shadow-lg">
      <h3 className="text-center text-xl font-semibold text-gray-800 mb-6">
        Register with a new account
      </h3>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type="text"
          id="name"
          name='name'
          value={formFields.name}
          disabled={isLoading===true ? true : false}
          label="Full Name"
          variant="outlined"
          onChange={onChangeInput}
          />

        <TextField
          fullWidth
          type="email"
          id="email"
          name='email'
          value={formFields.email}
          disabled={isLoading===true ? true : false}
          label="Email Id *"
          variant="outlined"
          onChange={onChangeInput}
          />

        <div className="relative">
          <TextField
            fullWidth
            type={isShowPassword ? 'text' : 'password'}
            id="password"
            name='password'
            value={formFields.password}
            disabled={isLoading===true ? true : false}
            label="Password *"
            variant="outlined"
            onChange={onChangeInput}
            />
          <Button
            type="button"
            onClick={() => setIsShowPassword(!isShowPassword)}
            className="!absolute top-[8px] right-[5px] !w-9 !h-9 !min-w-[35px]
             !rounded-full !text-black">
            {isShowPassword ? (
              <FaEye className="text-lg opacity-75"/>
            ) : (
              <FaEyeSlash className="text-lg opacity-75"/>
            )}
          </Button>
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
        <p className="text-center text-sm"> Already have an account?{' '} <Link to="/login" className="text-[#ff5252] font-semibold hover:text-black 
        transition duration-300"> Login </Link> </p>
        <div className="text-center text-sm font-medium text-gray-600">
          Or continue with social account
         </div>
        <Button 
          fullWidth
          variant="outlined"
          className="!bg-gray-100 hover:!bg-gray-200 !text-black flex items-center 
          justify-center gap-3">
          <FcGoogle className="text-xl"/> Sign in with Google
        </Button>
      </form>
    </div>
  </section>
  )
}

export default Register;
