import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IoMdClose } from "react-icons/io";
import CategorieCollapse from '../../CatagoryCollpase';
import Button from '@mui/material/Button';
import { MyContext } from '../../../App';
import { Link, useNavigate } from 'react-router-dom';
import { fetchDataFromApi } from '../../../utlis/api';

function CatagoryPanel(props) {
  
const context = useContext(MyContext)
const navigate = useNavigate();  

  const toggleDrawer = (newOpen) => () => {
    props.setOpenCatPanel(newOpen)
    props.propsSetOpenCatPanel(newOpen)
  };

  const DrawerList = (
      <Box sx={{ width: 250 }} role="presentation">
       <h3 className='p-3 text-[16px] font-[500] flex items-center justify-between'>
        Shop by Categories<IoMdClose onClick={toggleDrawer(false)} className='cursor-pointer text-[21px] font-[500]'/>
       </h3>    
       {
        props?.data?.length!==0 && 
         <CategorieCollapse data={props?.data}/> 
       }    
 
     {
     context?.windowWidth < 992 && context?.isLogin === false && 
     <Link to ='/login' className='p-3'>
      <Button
      className='w-full !bg-[#ff5252] hover:!bg-black !text-white
      font-medium' onClick={()=>{
       props.setOpenCatPanel(false)
       props.propsSetOpenCatPanel(false)
      }}>
      Login
      </Button>   
     </Link>
     }

    {
     context?.windowWidth < 992 && context?.isLogin === true && 
     <div className='p-3' onClick={()=>{
      props.setOpenCatPanel(false)
      props.propsSetOpenCatPanel(false)
      fetchDataFromApi(`/api/user/logout?token=${localStorage.getItem('accessToken')}`,{ withCredentials: true })
      .then((res)=>{
      if(res?.error===false){
      context.setIsLogin(false);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      context?.setUserData(null);
      context?.setCartData([]);
      context?.setMyList([]);
      navigate('/login');
   }
 });
     }}>
      <Button
      className='w-full !bg-[#ff5252] hover:!bg-black !text-white
       font-medium'>
      Logout
      </Button>   
     </div>
     }

    </Box>
      );

    return (
    <>
    <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
     {DrawerList}
     </Drawer>
    </>
  )
}

export default CatagoryPanel
