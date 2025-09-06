import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from '../../utlis/api';

 function ForgotPassword() {
  
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

      if(formFields.confirmPassword===''){
     context.openAlertBox('error','Please enter Confirm password');
     setIsLoading(false);
     return false
     }

     if(formFields.confirmPassword!==formFields.newPassword){
     context.openAlertBox('error','Password confirm password not match');
     setIsLoading(false);
     return false
     }

   postData('/api/user/reset-password', formFields)
   .then((res)=>{
    console.log(res);
   if(res?.error===false){
   localStorage.removeItem('userEmail');
   localStorage.removeItem('actionType');
   context.openAlertBox('success',res?.message);
   setIsLoading(false);
   navigate('/login')
   }
   else{
    context.openAlertBox('error',res?.message);
   }
   })
   }

  return (
    <section className='section py-5 lg:py-10'>
      <div className='w-[95%] m-auto'>
        <div className='card m-auto shadow-md w-full sm:w-[400px] rounded-md bg-white p-8 px-10'>
          <h3 className='text-center text-[18px] text-black'>Forgot Password</h3>

          <form className="w-full mt-5 relative" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-5 relative">
              <TextField 
                type={isShowPassword1 ? 'text' : 'password'}
                id="password" 
                label="New Password"
                variant="outlined"
                className='w-full'
                name='newPassword'
                value={formFields.newPassword}
                disabled={isLoading===true ? true : false}
                onChange={onChangeInput}
                />
               <Button
                type="button"
                 className='!absolute top-[8px] right-[5px] z-50 !w-[35px] !h-[35px] 
                 !min-w-[35px] !rounded-full !text-black'
                 onClick={() => setIsShowPassword1(!isShowPassword1)}>
                {isShowPassword1 ? <FaEye className='text-[20px] opacity-75' /> : <IoEyeOff className='text-[20px] opacity-75'/>}
              </Button>
            </div>
            <div className="form-group w-full mb-5 relative">
              <TextField 
                type={isShowPassword2 ? 'text' : 'password'}
                id="Confirm_password" 
                label="Confirm Password"
                variant="outlined"
                className='w-full'
                name='confirmPassword'
                value={formFields.confirmPassword}
                disabled={isLoading===true ? true : false}
                onChange={onChangeInput}
                />
                <Button
                type="button"
                className='!absolute top-[8px] right-[5px] z-50 !w-[35px] !h-[35px] 
                !min-w-[35px] !rounded-full !text-black'
                onClick={() => setIsShowPassword2(!isShowPassword2)}>
                {isShowPassword2 ? <FaEye className='text-[20px] opacity-75' /> : <IoEyeOff className='text-[20px] opacity-75' />}
                 </Button>
                </div>
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
                 'Change Password' 
               }
            
             </Button>
           </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;







