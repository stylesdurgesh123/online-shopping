import React, { useContext, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from '../../App';
import { fetchDataFromApi, postData, profileEditData, uploadImage } from '../../utlis/api';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import {Collapse} from 'react-collapse';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Profile() {

  const [previews,setPreviews]=useState([]);
  const [uploading,setUploading] = useState(false);
  const [phone, setPhone] = useState('');
  const [address,setAddress]=useState([]);
 
  const [isLoading,setIsLoading]=useState(false);
  const [isLoading2,setIsLoading2]=useState(false);
  const [userId,setUserId]=useState('');
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

  const [selectedValue, setSelectedValue] = useState('144-A-1, panki road, Kalyanpur');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(()=>{
  const token = localStorage.getItem('accessToken');
  if(token===null){
    navigate("/login");
  } 
  },[context?.isLogin]);

  useEffect(() => {
   if (context?.userData?._id !== '' && context?.userData?._id !== undefined) {
    const token = localStorage.getItem('accessToken');

    fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`, token,{withCredentials: true}).then((res) => {
      console.log(res.data);
      setAddress(res.data);
    });

    setUserId(context?.userData?._id);

    setFormFields({
      name: context?.userData?.name,
      email: context?.userData?.email,
      mobile: context?.userData?.mobile
    });

    setPhone(`${context?.userData?.mobile}`);

    setChangePassword({
      email: context?.userData?.email
    });
  }
}, [context?.userData]);

  const onChangeInput = (e)=>{
  const {name,value} = e.target;
  setFormFields(()=>{
    return {
      ...formFields,
      [name]:value
     }
    })

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
  // profileEditData(`/api/user/${userId}?token=${token}`,formFields,{withCredentials: true})
   profileEditData(`/api/user/${userId}`, formFields, token).then((res)=>{
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
    console.log(res);
   if(res?.error!==true){
   setIsLoading2(false);
   context.openAlertBox('success',res?.message);
   }else{
   context.openAlertBox('error',res?.message);
    setIsLoading2(false);
   }
 
  });
 }

 useEffect(()=>{
  const userAvatar = [];
  if(context?.userData?.avatar!=='' && context?.userData?.avatar!==undefined){
   userAvatar.push(context?.userData?.avatar);
   setPreviews(userAvatar);
  }
 },[context?.userData])

  let selectedImages=[];
 const formData = new FormData();

 const onChangeFile = async (e,apiEndPoint) => {
   try {
   setPreviews([]);
   const files = e.target.files;
   setUploading(true);
   console.log(files); 
   
   for(var i=0; i < files.length; i++){
    if(files[i] && (files[i].type==='image/jpeg' || files[i].type==='image/jpg' ||files[i].type==='image/png' || files[i].type==='image/webp'))
    {
   const file = files[i];
   selectedImages.push(file);
   formData.append(`avatar`,file)

    }else{
    context.openAlertBox('error','Please select a valid JPG, PNG or webp image file.');
    setUploading(false);
    return false;
    }
   }

   const token = localStorage.getItem('accessToken'); 
    uploadImage(`/api/user/user-avatar?token=${token}`,formData).then((res)=>{
    setUploading(false);
    let avatar=[];
    avatar.push(res?.data?.avatar);
    setPreviews(avatar);
    console.log(res)
   });

   } catch (error) {
     console.log(error); 
   }
 }

  return (
    <>
  <div className='card my-4 w-[100%] sm:w-[100%] lg:w-[65%] pt-2 shadow-md sm:rounded-lg bg-white px-5 pb-5'>
   <div className='flex items-center justify-between'>
    <h2 className='text-[18px] font-[600]'>
      Users Profile
     </h2>
     <Button className='!ml-auto' onClick={()=>setIsChangePasswordFormShow(!isChangePasswordFormShow)}>
      Change Password
     </Button>
     </div>
     <br/>
       <div className='w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group
          flex items-center justify-center bg-gray-200'>
     
           {
             uploading === true ? <CircularProgress color="inherit"/> :
            <>
            {
             previews?.length!==0 ? previews?.map((img,index)=>{
             return(
              <img 
                src={img}
                key={index}
               className='w-full h-full object-cover'
               />
               )
             })
             :
           <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s'
            className='w-full h-full object-cover'
             /> 
           }
            </>
           }
           <div className='overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 
           bg-[rgba(0,0,0,0.5)] flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100'>
           <FaCloudUploadAlt className='text-[#fff] text-[25px]'/>
           <input type="file" 
           className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
           accept='image/*'
           onChange={(e)=>{
           onChangeFile(e,'/api/user/user-avatar')
           }}
           name='avatar'
           />
           </div>
        </div>
        <form className='form mt-8' onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
         <div className='col'>
         <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.1)]
         focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounde-sm p-3 text-sm'
          name='name' value={formFields.name} disabled={isLoading===true ? true : false} onChange={onChangeInput}
          />
         </div>
         <div className='col'>
         <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.1)]
         focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounde-sm p-3 text-sm' 
         name='email' value={formFields.email}
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
        <br/>
        <div className='flex items-center justify-center p-5 border border-dashed
        border-[#0,0,0,0.1] bg-[#f1faff] transition-all duration-300 hover:bg-[#6ac7f9] rounded-md cursor-pointer' 
        onClick={()=>context.setIsOpenFullScreenPanel({
        open:true,
        modal:'Add New Addresh' 
        })}>
        <span className='text-[14px] font-[500]'>Add Address</span>
        </div>

       <div className='flex gap-2 flex-col mt-4'>
         {
          address?.length > 0 && address?.map((address,index)=>{
            return(
           <>
           <label className='addreshBox w-full flex items-center justify-center  
           border border-dashed border-[#0,0,0,0.1] bg-[#f1f1f1] p-3 rounded-md cursor-pointer'>
          <Radio {...label} name='address'
          checked={
           selectedValue === 
            (address?.address_line1+
             address?.city+
             address?.country+
             address?.pincode+
             address?.state
            )
              } 
           value={
            address?.address_line1+
            address?.city+
            address?.country+
            address?.pincode+
            address?.state
          } 
           onChange={handleChange}/>
           <span key={index} className='text-[16px]'>
             {
             address?.address_line1+ " "+
             address?.city+ " "+
             address?.country+ " "+
             address?.pincode+
             address?.state
             }
             </span>
           </label>
          </>
            )
          })
         }
        </div>
        
        <br/><br/>
        <div className='flex items-center gap-4'>
        <Button
         type='submit'
         disabled={!valideValue}
         className='!text-white !bg-blue-600 transition-all duration-300 hover:!bg-black w-full'>
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
       <div className="card w-[100%] sm:w-[100%] lg:w-[65%] bg-white p-5 shadow-md rounded-md">
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
            className='!text-white !bg-blue-600 transition-all duration-300 hover:!bg-black w-full'>
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
       </>
  )
}

export default Profile;
