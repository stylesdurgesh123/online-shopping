import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { AiOutlineHome } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { GoHeart } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";
import { NavLink } from "react-router";
import { MyContext } from '../../../App';

function MobileNav() {
 
const context = useContext(MyContext);

  return (
    <div className='mobileNav bg-white p-1 px-3 gap-5 w-full grid grid-cols-5 fixed bottom-0 left-0 
    place-items-center z-[51]'>

    <NavLink to='/' exact={true} activeClassName="isActive">
     <Button className='flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700'>
     <AiOutlineHome size={18}/>
     <span className='text-[12px]'>Home</span>
     </Button>
    </NavLink>

     <Button className='flex-col !w-[40px] !min-w-[40px] 
     !capitalize !text-gray-700' onClick={()=>context?.setOpenSearchPanel(true)}>
     <IoIosSearch size={18}/>
     <span className='text-[12px]'>Search</span>
     </Button>
   
    <NavLink to='/my-list' exact={true} activeClassName="isActive">
     <Button className='flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700'>
     <GoHeart size={18}/>
     <span className='text-[12px]'>Wishlist</span>
     </Button>
     </NavLink>
     
   <NavLink to='/my-orders' exact={true} activeClassName="isActive">  
    <Button className='flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700'>
     <IoBagCheckOutline size={18}/>
     <span className='text-[12px]'>Orders</span>
     </Button>
    </NavLink>

    <NavLink to='/my-account' exact={true} activeClassName="isActive">
     <Button className='flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700'>
     <FiUser size={18}/>
     <span className='text-[12px]'>Account</span>
     </Button>
    </NavLink>
    </div>
  )
}

export default MobileNav;