import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logoimg.png';
import Search from '../Search/search';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//import { IoIosGitCompare } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import Navbar from './Navigation/Navbar';
import { MyContext } from '../../App';
import Button from '@mui/material/Button';
import { FaUser } from "react-icons/fa";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { CiUser } from "react-icons/ci";
import { BsBagCheck } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { fetchDataFromApi } from '../../utlis/api';
import { MdOutlineMenu } from "react-icons/md";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    backgroundColor: '#ff5252', 
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

function Header() {

 const [isOpenCatPanel,setOpenCatPanel]=useState(false);  

const context=useContext(MyContext);
const navigate = useNavigate();

const logout=()=>{
 setAnchorEl(null);
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

const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};

  return (
    <header className='bg-white sticky -top-[47px] z-[100] shadow-custom'>
      <div className='top-script py-2 border-t-[1px] border-b-[1px] border-solid border-black/10'>
       <div className='w-[95%] m-auto'>
        <div className='flex items-center justify-between'>
         <div className='col1 w-[50%] hidden lg:block'>
         <p className='text-[14px] font-[600]'>
         Get up to 50% off on new season styles - limited time only!
         </p>
         </div>
         <div className='col2 flex items-center justify-between w-full lg:w-[50%] lg:justify-end'>
          <ul className='flex items-center gap-3 justify-between w-full lg:w-[250px]'>
            <li>
             <Link to='/help-center' 
             className='text-[11px] lg:text-[14px] font-[600] transition-colors duration-300 hover:text-[#ff5252]'>
              Help Center
              </Link>
              </li>
              <li>
             <Link to='/order-tracking' className='text-[11px] lg:text-[14px] font-[600] transition-colors duration-300 hover:text-[#ff5252]'>
               Order Tracking
             </Link>
            </li>
          </ul>
         </div>
        </div>
       </div>
       </div>

    <div className='py-0 border-b-[1px] border-solid border-black/10'>
      <div className='w-[95%] m-auto flex items-center justify-between'>
      {
      context?.windowWidth < 992 &&
       <Button className='!w-[35px] !min-w-[35px] !h-[35px] !rounded-full
        !text-gray-800' onClick={()=>setOpenCatPanel(true)}>
        <MdOutlineMenu size={22}/>
       </Button>
      }
     <div className='col1 w-[40%] lg:w-[25%]'>
      <Link to="/" className="flex items-center space-y-1 lg:space-y-3">
        <img src={logo} alt="shoping logo" className='h-10 lg:h-20 w-auto object-contain' />
        <span className='text-[10px] lg:text-[14px] font-[550] text-[#000]'>ShopEase</span>
      </Link>
    </div>
    <div className={`col2 fixed top-0 left-0 w-full h-full lg:w-[40%] lg:static p-2 lg:p-0
    bg-white z-50 ${context?.windowWidth > 992 && '!block'} ${context?.openSearchPanel === true ? 'block' : 'hidden'}`}>
      <Search />
    </div>
    <div className='col3 w-[10%] lg:w-[35%] flex items-center pl-7'>
       <ul className='flex items-center justify-end gap-0 lg:gap-4 w-full'>
        {
        context.isLogin=== false ? ( 
       <li>
       <Link to="/login" className='transition-colors duration-300 hover:text-[#ff5252] text-[15px] font-[500]'>Login</Link> |  &nbsp;
       <Link to="/register" className='transition-colors duration-300 hover:text-[#ff5252] text-[15px] font-[500]'>Register</Link>
     </li>
         ) : (
        <>
       {
        context?.windowWidth > 992 && 
              <li>
        <Button className='!text-[#000] myAccountWrap flex items-center gap-3 cursor-pointer'
        onClick={handleClick}>
        <Button className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-[#f1f1f1]'>
          <FaUser className='text-[16px] text-[rgba(0,0,0,0.7)]'/>
          </Button>
           {
            context?.windowWidth > 992 &&
            <div className="info flex flex-col">
            <h4 className='text-[14px] font-[500] text-[rgba(0,0,0,0.6)] mb-0 capitalize text-left justify-start'>
              {context?.userData?.name}
              </h4>
            <span className='text-[13px] font-[400] text-[rgba(0,0,0,0.6)] capitalize'>
             {context?.userData?.email}
            </span>
          </div>
           } 
          </Button>
        <Menu
         anchorEl={anchorEl}
         id="account-menu"
         open={open}
         onClose={handleClose}
         onClick={handleClose}
         slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
          <Link to='/my-account' className='w-full block'>
        <MenuItem onClick={handleClose} className='flex gap-2'>
          <CiUser className='text-[18px]'/> <span className='text-[14px]'>My Account</span>
        </MenuItem>
        </Link>
        <Link to='/my-orders' className='w-full block'>
        <MenuItem onClick={handleClose} className='flex gap-2'>
        < BsBagCheck  className='text-[18px]'/> <span className='text-[14px]'>Orders</span>
        </MenuItem>
        </Link>
        <Link to='/my-list' className='w-full block'>
        <MenuItem onClick={handleClose} className='flex gap-2'>
        <FaRegHeart  className='text-[18px]'/> <span className='text-[14px]'>My List</span>
        </MenuItem>
        </Link>
       
        <MenuItem onClick={logout} className='flex gap-2'>
        <IoLogOutOutline  className='text-[18px]'/> 
        <span className='text-[14px]'>Logout</span>
        </MenuItem>
        <Divider />
          </Menu>
          </li>
       }
         </>
         )
        }
     
       {/* Icons with Tooltip 
       <li>
         <Tooltip title="Compare">
           <IconButton aria-label='compare'>
             <StyledBadge badgeContent={4}>
               <IoIosGitCompare />
             </StyledBadge>
           </IconButton>
         </Tooltip>
       </li>*/}

     {
      context?.windowWidth > 992 && 
       <li>
         <Tooltip title="Wishlist">
          <Link to='/my-list'>
           <IconButton aria-label='wishlist'>
             <StyledBadge badgeContent={
             context?.myList?.length!==0 ? context?.myList?.length : 0}>
               <FaRegHeart />
             </StyledBadge>
           </IconButton>
           </Link>
         </Tooltip>
       </li> 
      }

       <li>
         <Tooltip title="Cart">
           <IconButton aria-label='cart' onClick={()=>context.setOpenCartPanel(true)}>
             <StyledBadge badgeContent={
              context?.cartData?.length
              ? context.cartData.reduce((total, item) => total + item.quantity, 0)
              : 0
              }>
               <ShoppingCartIcon/>
             </StyledBadge>
           </IconButton>
         </Tooltip>
       </li>
     </ul>
    </div>
  </div>
</div>
<Navbar isOpenCatPanel={isOpenCatPanel} setOpenCatPanel={setOpenCatPanel}/>
</header>
  )
}

export default Header;
