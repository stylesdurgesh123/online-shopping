import React, { useContext, useEffect, useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from '@mui/material/Button';
import { FaRegUser } from "react-icons/fa";
import { BsBagCheck } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router";
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchDataFromApi, uploadImage } from '../../utlis/api';
import { LuMapPinCheck } from "react-icons/lu";

function AccountSidebar() {

 const [previews,setPreviews]=useState([]);
 const [uploading,setUploading] = useState(false);

 const context = useContext(MyContext);
 const navigate = useNavigate();

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

 const logout=()=>{
  fetchDataFromApi(`/api/user/logout?token=${localStorage.getItem('accessToken')}`,{ withCredentials: true })
  .then((res)=>{
  if(res?.error===false){
  context.setIsLogin(false);
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  context?.setUserData(null);
  context?.setCartData([]);
  context?.setMyList([]);
  navigate('/');
  }
  });
 
 }

  return (
    <div className="card bg-white shadow-md rounded-md sticky top-[135px]">
    <div className='w-full p-5 flex items-center justify-center flex-col'>
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
     <h3 className='font-[600]'>{context?.userData?.name}</h3>
     <h6 className='text-[13px] font-[500]'>{context?.userData?.email}</h6>
    </div>
     <ul className='list-none pb-5 myAccountTabs'>
       <li className='w-full'>
        <NavLink to='/my-account' exact={true} activeClassName="isActive">
        <Button className='w-full !justify-start !text-left !px-5 !capitalize !text-[rgba(0,0,0,0.7)] rounded-none flex items-center gap-2'>
           <FaRegUser className='text-[17px]'/> My Profile
           </Button>
           </NavLink>
       </li>

        <li className='w-full'>
        <NavLink to='/address' exact={true} activeClassName="isActive">
        <Button className='w-full !justify-start !text-left !px-5 !capitalize !text-[rgba(0,0,0,0.7)] rounded-none flex items-center gap-2'>
           <LuMapPinCheck className='text-[18px]'/> Address
           </Button>
           </NavLink>
       </li>

       <li className='w-full'>
        <NavLink to='/my-list' exact={true} activeClassName="isActive">
        <Button className='w-full !justify-start !text-left !py-2 !px-5 !capitalize !text-[rgba(0,0,0,0.7)] rounded-none flex items-center gap-2'>
           <FaRegHeart className='text-[17px]'/> My List
           </Button>
           </NavLink>
       </li>
       <li className='w-full'>
       <NavLink to='/my-orders' exact={true} activeClassName="isActive">
        <Button className='w-full !justify-start !text-left !py-2 !px-5 !capitalize !text-[rgba(0,0,0,0.7)] rounded-none flex items-center gap-2'>
           < BsBagCheck className='text-[17px]'/> My Orders
           </Button>
           </NavLink>
       </li>

       <li className='w-full'>
       <NavLink to='/logout' exact={true} activeClassName="isActive">
        <Button className='w-full !justify-start !text-left !py-2 
        !px-5 !capitalize !text-[rgba(0,0,0,0.7)]
         rounded-none flex items-center gap-2' onClick={logout}>
           <IoLogOutOutline className='text-[17px]'/> Logout
           </Button>
           </NavLink>
       </li>
      </ul>
     </div>
  )
}

export default AccountSidebar;
