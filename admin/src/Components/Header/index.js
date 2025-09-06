import React,{useContext, useState} from 'react'
import '../../App.css';
import Button from '@mui/material/Button';
import { RiMenu2Fill } from "react-icons/ri";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { FaRegBell } from "react-icons/fa";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { FaRegUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import {MyContext} from '../../App';
import { Link, useNavigate } from 'react-router-dom';
import { fetchDataFromApi } from '../../utlis/api';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IoCloseSharp } from "react-icons/io5";
import AddHomeSlide from '../../pages/HomeSliderBanners/addHomeSlide';
import AddCategory from '../../pages/Categegory/addCategory';
import AddSubCategory from '../../pages/Categegory/addSubCategory';
import AddAddresh from '../../pages/Addresh/addAddresh';
import EditCategory from '../../pages/EditCategory/editCategory';
import Slide from '@mui/material/Slide';
import AddProduct from '../../pages/Products/addProduct';
import EditAddProduct from '../../pages/Products/editAddProduct';
import AddBannerV1 from '../../pages/Banners/addBannerV1';
import EditBannerV1 from '../../pages/Banners/editBannerV1';
import AddBlog from '../../pages/Blog/addBlog';
import EditBlog from '../../pages/Blog/editBlog';


const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
      padding: '0 4px',
    },
  }));

function Header() {

    const context=useContext(MyContext);
    const navigate = useNavigate();
    
    /*
    const Signout=()=>{
     setAnchorMyAcc(null);
     const token = localStorage.getItem('accessToken');
      //fetchDataFromApi(`/api/user/logout?token`,token) 
    // fetchDataFromApi(`/api/user/logout?token=${localStorage.getItem('accessToken')}`,{ withCredentials: true })
    fetchDataFromApi(`/api/user/logout?token`,token).then((res)=>{
     if(res?.error===false){
     context.setIsLogin(false);
     localStorage.removeItem('accessToken');
     localStorage.removeItem('refreshToken');
     navigate('/login');
     }
     });
    }
     */

  const Signout = () => {
  setAnchorMyAcc(null);
  const token = localStorage.getItem('accessToken');
  fetchDataFromApi(`/api/user/logout`, token).then((res) => {
    if (res?.error === false) {
      context.setIsLogin(false);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
       }
      });
     };

   const [anchorMyAcc, setAnchorMyAcc] =useState(null);
    const openMyAcc = Boolean(anchorMyAcc);
    const handleClickMyAcc = (event) => {
     setAnchorMyAcc(event.currentTarget);
    };
    const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
    };
   
   return (
    <>
    <header className={`w-full h-auto py-2 ${context.isSidebarOpen === true ? 'pl-64' : 'pl-10'} ${context.isSidebarOpen === true && context?.windowWidth < 992 && '!pl-80'} pr-7 shadow-md bg-[#fff] flex items-center justify-between fixed top-0 left-0 z-50`}>
     <div className="part1">
    <Button className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[rgba(0,0,0,0.8)'
     onClick={() => context.setSidebarOpen(!context.isSidebarOpen)}>
     <RiMenu2Fill className='text-[18px] text-[rgba(0,0,0,0.8)]'/>
     </Button> 
     </div>
     <div className="part2 w-[40%] flex items-center justify-end gap-5">
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={4} color="secondary">
        <FaRegBell />
      </StyledBadge>
     </IconButton> 

       {
        context.isLogin===false ? 
         <Link to='/signup'>
        <Button className='!bg-blue-500 !text-white !text-sm !px-4 !rounded-full'>Sign In</Button>
        </Link>
        :
        <div className='relative'>
        <div className='rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer' onClick={handleClickMyAcc}>
          <img src="https://lh3.googleusercontent.com/ogw/AF2bZyjwI0zX5hon3WEbUk3LVFx64JzpP-IKTBf2U42k9B3U9Q=s64-c-mo" alt="logo" 
          className='w-full h-full object-cover'/>
          </div>
          <Menu
           anchorEl={anchorMyAcc}
           id="account-menu"
           open={openMyAcc}
           onClose={handleCloseMyAcc}
           onClick={handleCloseMyAcc}
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
           <MenuItem onClick={handleCloseMyAcc} className='!bg-white'>
             <div className='flex items-center gap-3'>
             <div className='rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer'>
             <img src="https://lh3.googleusercontent.com/ogw/AF2bZyjwI0zX5hon3WEbUk3LVFx64JzpP-IKTBf2U42k9B3U9Q=s64-c-mo" alt="" 
              className='w-full h-full object-cover'/>
             </div>
             <div className="info">
               <h3 className='text-[15px] font-[500] leading-4 text-black'>{context?.userData?.name}</h3>
               <p className='text-[15px] font-[400] opacity-70 text-black'>{context?.userData?.email}</p>
             </div>
             </div>
           </MenuItem>
           <Divider />
           <Link to='/profile'>
           <MenuItem onClick={handleCloseMyAcc} className='flex items-center gap-3'>
           <FaRegUser className='text-[16px]'/> <span className='text-[14px]'>Profile</span>
           </MenuItem>
           </Link>
           <MenuItem onClick={Signout} className='flex items-center gap-3'>
           <IoMdLogOut className='text-[18px]'/> <span className='text-[14px]'>Sign Out</span>
           </MenuItem>
         </Menu>
        </div>
       }
     </div>
    </header>


   <Dialog
        fullScreen
        open={context?.isOpenFullScreenPanel.open}
        onClose={()=>context?.setIsOpenFullScreenPanel({open:false})}
        TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>context?.setIsOpenFullScreenPanel({open:false})}
              aria-label="close">
              <IoCloseSharp />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {context?.isOpenFullScreenPanel.modal}
            </Typography>
          </Toolbar>
        </AppBar>

        {
       context?.isOpenFullScreenPanel?.modal==='Add Product' && <AddProduct/> 
        }

          {
       context?.isOpenFullScreenPanel?.modal==='Add Home Slide' && <AddHomeSlide/> 
        }

       {
       context?.isOpenFullScreenPanel?.modal==='Add New Category' && <AddCategory/> 
        }
        {
       context?.isOpenFullScreenPanel?.modal==='Add New Sub Category' && <AddSubCategory/> 
        }
        {
       context?.isOpenFullScreenPanel?.modal==='Add New Addresh' && <AddAddresh/> 
        }
        {
       context?.isOpenFullScreenPanel?.modal==='Edit Category' && <EditCategory/> 
        }
        {
       context?.isOpenFullScreenPanel?.modal==='Edit Product' && <EditAddProduct/> 
        }
       {
       context?.isOpenFullScreenPanel?.modal==='Add BannerV1' && <AddBannerV1/> 
       }
       {
       context?.isOpenFullScreenPanel?.modal==='Edit BannerV1' && <EditBannerV1/> 
       }
       {
       context?.isOpenFullScreenPanel?.modal==='Add Blog' && <AddBlog/> 
       }
       {
       context?.isOpenFullScreenPanel?.modal==='Edit Blog' && <EditBlog/> 
       }
      </Dialog>

    </>
  )
}

export default Header;
