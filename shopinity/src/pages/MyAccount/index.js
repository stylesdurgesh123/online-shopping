import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountSidebar from '../../components/AccountSidebar';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { postData, profileEditData } from '../../utlis/api';
import CircularProgress from '@mui/material/CircularProgress';
import {Collapse} from 'react-collapse';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

function MyAccount() {
  const [isLoading,setIsLoading]=useState(false);
  const [isLoading2,setIsLoading2]=useState(false);
  const [userId,setUserId]=useState('');
  const [phone, setPhone] = useState('');
  const [isChangePasswordFormShow,setIsChangePasswordFormShow]=useState(false);

  const [formFields,setFormFields]=useState({
    name:'',
    email:'',
    mobile:''
  });

    const [changePassword,setChangePassword]=useState({
    email: '',
    oldPassword:'',
    newPassword:'',
    confirmPassword:''
  });

  const context = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(()=>{
  const token = localStorage.getItem('accessToken');
  if(token===null){
    navigate('/login');
  }
  },[context?.isLogin]);

   useEffect(()=>{
    if(context?.userData?._id!=='' && context?.userData?._id!==undefined){
     setUserId(context?.userData?._id);
     setFormFields({
      name:context?.userData?.name,
      email:context?.userData?.email,
      mobile:context?.userData?.mobile
     })

     setChangePassword({
      email: context?.userData?.email
     })
    }
   },[context?.userData])
  
  const onChangeInput = (e)=>{
  const {name,value} = e.target;
  setFormFields(()=>{
    return {
      ...formFields,
      [name]:value
    }
  })


  setPhone(`${context?.userData?.mobile}`);

    setChangePassword(()=>{
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
     context.openAlertBox('error','Please enter name');
     return false
     }
 
     if(formFields.email===''){
     context.openAlertBox('error','Please enter email addresh');
     return false
   }

    if(formFields.mobile===''){
    context.openAlertBox('error','Please enter mobile number');
    return false
   }

   const token = localStorage.getItem('accessToken'); 
   profileEditData(`/api/user/${userId}?token=${token}`,formFields,{withCredentials: true})
  .then((res)=>{
   if(res?.error!==true){
   setIsLoading(false)
   context.openAlertBox('success',res?.message);
   localStorage.setItem('userEmail',formFields.email)
   navigate('/')
   }else{
   context.openAlertBox('error',res?.message)
    setIsLoading(false);
   }
 
  });
 }

  const valideValue2 = Object.values(formFields).every(el => el)

   const handleSubmitChangePassword = (e)=>{
      e.preventDefault();
      setIsLoading2(true);
     if(changePassword.oldPassword===''){
     context.openAlertBox('error','Please enter oldPassword');
     return false
     }
 
     if(changePassword.newPassword===''){
     context.openAlertBox('error','Please enter newPassword');
     return false
   }

    if(changePassword.confirmPassword===''){
    context.openAlertBox('error','Please enter confirmPassword');
    return false
   }

    if(changePassword.confirmPassword!==changePassword.newPassword){
    context.openAlertBox('error','changePassword and confirmPassword is not match');
    return false
   }

   const token = localStorage.getItem('accessToken'); 
   postData(`/api/user/reset-password?token=${token}`,changePassword,{withCredentials: true})
  .then((res)=>{
   if(res?.error!==true){
   setIsLoading2(false);
   context.openAlertBox('success',res?.message);
   }else{
   context.openAlertBox('error',res?.message);
    setIsLoading2(false);
   }
 
  });
 }

  return (
    <section className='py-3 lg:py-10 w-full'>
    <div className='w-[95%] m-auto flex flex-col lg:flex-row gap-5'>
     <div className="col1 w-full lg:w-[20%]">
       <AccountSidebar/>
     </div>
     <div className="col2 w-full lg:w-[50%]">
      <div className="card bg-white p-5 shadow-md rounded-md mb-5">
       <div className='flex items-center pb-3'>
        <h2 className='pb-0 font-[500]'>My Profile</h2>
        <Button className='!ml-auto' onClick={()=>setIsChangePasswordFormShow(!isChangePasswordFormShow)}>
          Change Password
          </Button>
       </div>
       <hr/>
        <form className='mt-8' onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
         <div className='col'> 
         <TextField  
         label="Full Name"
         type='text' 
         variant="outlined"
         size='small'
         className='w-full'
         name='name'
         value={formFields.name}
         disabled={isLoading===true ? true : false}
         onChange={onChangeInput}
         />
         </div>
         <div className='col'>
         <TextField  
         label="Email"
         type='email' 
         variant="outlined"
         size='small'
         className='w-full'
         name='email'
         value={formFields.email}
         disabled={isLoading===true ? true : false}
         onChange={onChangeInput}
         />
         </div>
         <div className='col'>
          <PhoneInput
          defaultCountry="in"
          value={phone}
          onChange={(phone) =>{
          setPhone(phone);
          setFormFields({
          mobile:phone
          })
         }}
         />     
        </div>
        </div>
        <br/> <br/>
        <div className='flex items-center gap-4'>
        <Button
         type='submit'
         disabled={!valideValue}
         className='!text-white !bg-[#ff5252] transition-all duration-300 hover:!bg-black w-[150px]'>
           {
             isLoading === true ? <CircularProgress color="inherit"/> 
              :
              'Update Profile' 
               }
          </Button>
        </div>
        </form>
      </div>
        <Collapse isOpened={isChangePasswordFormShow}>
       <div className="card bg-white p-5 shadow-md rounded-md">
       <div className='flex items-center pb-3'>
        <h2 className='pb-0 font-[500]'>Change Password</h2>
        </div>
        <hr/>
        <form className='mt-8' onSubmit={handleSubmitChangePassword}>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
         <div className='col'>
         <TextField  
         label="Old Password"
         type='text' 
         variant="outlined"
         size='small'
         className='w-full'
         name='oldPassword'
         value={changePassword.oldPassword}
         onChange={onChangeInput}
         />
         </div>
         <div className='col'>
          <TextField 
          type='text' 
          label="New Password" 
          variant="outlined"
          size='small'
          className='w-full'
          name='newPassword'
          value={changePassword.newPassword}
          onChange={onChangeInput}
          />
         </div>
         <div className='col'>
         <TextField  
         label="Confirm Password" 
         variant="outlined"
         size='small'
         className='w-full'
         name='confirmPassword'
         value={changePassword.confirmPassword}
         onChange={onChangeInput}
         />
         </div>
        </div>
        <br/> <br/>
        <div className='flex items-center gap-4'>
        <Button
         type='submit'
         disabled={!valideValue2}
         className='!text-white !bg-[#ff5252] transition-all duration-300 hover:!bg-black w-[160px]'>
          {
           isLoading2 === true ? <CircularProgress color="inherit"/> 
            :
           'Change Password' 
             }
          </Button>
         </div>
        </form>
       </div> 
       </Collapse>
     </div>
    </div>
  </section>
  )
}

export default MyAccount;
