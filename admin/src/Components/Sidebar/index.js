import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { RxDashboard } from "react-icons/rx";
import { FaImages } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { TbBrandProducthunt } from "react-icons/tb";
import { TbCategory } from "react-icons/tb";
import { IoBagAddOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import {Collapse} from 'react-collapse';
import { MyContext } from '../../App';
import { fetchDataFromApi } from '../../utlis/api';

function Sidebar() {

  const [submenuIndex,setsubmenuIndex]=useState(null);
  const isOpenSubMenu=(index)=>{
    if(submenuIndex===index){
     setsubmenuIndex(null)
    }
    else{
    setsubmenuIndex(index)
    }
  }
 
 const context=useContext(MyContext);
 const navigate = useNavigate();

 const logout = () =>{
    context?.windowWidth < 992 && context?.setSidebarOpen(false)
      setsubmenuIndex(null)
   const token = localStorage.getItem('accessToken');
   fetchDataFromApi(`/api/user/logout`, token).then((res) => {
    if (res?.error === false) {
     context.setIsLogin(false);
     localStorage.removeItem('accessToken');
     localStorage.removeItem('refreshToken');
     navigate('/login');
     }
  });
 }

  return (
    <>
    <div className={`sidebar fixed top-0 left-0 z-50 bg-[#f1f1f1] h-full 
     border-r border-[rgba(0,0,0,0.1)] py-2 transition-all duration-300 overflow-hidden`}
     style={{ width: context.isSidebarOpen === true ? context?.windowWidth < 992 ? `${context?.sidebarWidth/1.5}%` : `${context?.sidebarWidth}%` : "0%"}}>
      <div className='py-2 w-full' onClick={()=>{
        context?.windowWidth < 992 && context?.setSidebarOpen(false)
         setsubmenuIndex(null)
        }}>
       <Link to=''>
       <img src="https://ecme-react.themenate.net/img/logo/logo-light-full.png" alt="" className='w-[120px]'/>
       </Link>
      </div>
        <ul className='mt-4'>
        <li>
       <Link to='/' onClick={()=>{
        context?.windowWidth < 992 && context?.setSidebarOpen(false)
          setsubmenuIndex(null)
        }}>
          <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] 
        !text-[rgba(0,0,0,0.8)] !font-[500] items-center'>
         <RxDashboard className='text-[18px]'/> <span>Dashboard</span>
          </Button>
          </Link>
          </li>
          <li>
         <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] 
        !text-[rgba(0,0,0,0.8)] !font-[500] items-center' onClick={()=>isOpenSubMenu(1)}>
         <FaImages className='text-[18px]'/> <span>Home Slides</span>
         <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'> 
          <FaAngleDown className={`transition-all duration-300 ${submenuIndex===1 ? 'rotate-180' : ''}`}/>
          </span>
          </Button>

        <Collapse isOpened={submenuIndex===1 ? true : false}>
        <ul className='w-full'>
        <li className='w-full'>
       <Link to='/homeSlider/list' onClick={()=>{
        context?.windowWidth < 992 && context?.setSidebarOpen(false)
          setsubmenuIndex(null)
        }}>
       <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start 
       !w-full !text-[13px] !font-[500] !pl-9 flex gap-3'><span className='block 
       w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span> Home Slide List</Button>
       </Link>
       </li>
         <li className='w-full'>
         <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start 
        !w-full !text-[13px] !font-[500] !pl-9 flex gap-3' 
        onClick={()=>{
        context.setIsOpenFullScreenPanel({
         open:true,
         modal:'Add Home Slide'
         })
        context?.windowWidth < 992 && context?.setSidebarOpen(false)  
          setsubmenuIndex(null)
        }}><span className='block 
        w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'> </span>Add Home Banner Slide</Button>
        </li>
          </ul>
        </Collapse>
          </li>
          <li>
          <Link to='/users' onClick={()=>{
          context?.windowWidth < 992 && context?.setSidebarOpen(false)
            setsubmenuIndex(null)
           }}>
            <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] 
        !text-[rgba(0,0,0,0.8)] !font-[500] items-center'>
         <FiUsers className='text-[18px]'/> <span>Users</span>
          </Button>
          </Link>
          </li>
          <li>
          <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] 
        !text-[rgba(0,0,0,0.8)] !font-[500] items-center' onClick={()=>isOpenSubMenu(3)}>
         <TbBrandProducthunt className='text-[18px]'/> <span>Products</span>
         <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'> 
          <FaAngleDown className={`transition-all duration-300 ${submenuIndex===3 ? 'rotate-180' : ''}`}/>
          </span>
          </Button>

          <Collapse isOpened={submenuIndex===3 ? true : false}>
          <ul className='w-full'>
          <li className='w-full'>
          <Link to='/products' onClick={()=>{
          context?.windowWidth < 992 && context?.setSidebarOpen(false)
            setsubmenuIndex(null)
           }}>
          <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start 
          !w-full !text-[13px] !font-[500] !pl-9 flex gap-3'><span className='block 
          w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>Product List</Button>
          </Link>
          </li>
          <li className='w-full'>
          <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start 
          !w-full !text-[13px] !font-[500] !pl-9 flex gap-3' onClick={()=>{
           context.setIsOpenFullScreenPanel({
           open:true,
           modal:'Add Product'
           }) 
           context?.windowWidth < 992 && context?.setSidebarOpen(false) 
             setsubmenuIndex(null)
           }}>
          <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'> </span>Product Upload</Button>
          </li>
           <li className='w-full'>
          <Link to='/products/addRams' onClick={()=>{
           context?.windowWidth < 992 && context?.setSidebarOpen(false)
             setsubmenuIndex(null)
           }}>
          <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start 
          !w-full !text-[13px] !font-[500] !pl-9 flex gap-3'>
          <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'> 
          </span>Add Product Rams
          </Button>
          </Link>
           </li>
          <li className='w-full'>
          <Link to='/products/addWeight' onClick={()=>{
            context?.windowWidth < 992 && context?.setSidebarOpen(false)
              setsubmenuIndex(null)
             }}>
           <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start 
           !w-full !text-[13px] !font-[500] !pl-9 flex gap-3'>
           <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'> 
           </span>Add Product Weight
           </Button>
           </Link>
           </li>
           <li className='w-full'>
           <Link to='/products/addSize' onClick={()=>{
           context?.windowWidth < 992 && context?.setSidebarOpen(false)
             setsubmenuIndex(null)
           }}>
            <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start 
            !w-full !text-[13px] !font-[500] !pl-9 flex gap-3'>
            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'> 
            </span>Add Product Size
             </Button>
             </Link>
            </li>
           </ul>
         </Collapse>
          </li>
          <li>
          <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] 
        !text-[rgba(0,0,0,0.8)] !font-[500] items-center' onClick={()=>isOpenSubMenu(4)}>
         <TbCategory className='text-[18px]'/> <span>Category</span>
         <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'> 
          <FaAngleDown className={`transition-all duration-300 ${submenuIndex===4 ? 'rotate-180' : ''}`}/>
          </span>
          </Button>

        <Collapse isOpened={submenuIndex===4 ? true : false}>
         <ul className='w-full'>
         <li className='w-full'>
         <Link to='/category/list' onClick={()=>{
         context?.windowWidth < 992 && context?.setSidebarOpen(false)
           setsubmenuIndex(null)
         }}>
        <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start 
        !w-full !text-[13px] !font-[500] !pl-9 flex gap-3'><span className='block 
        w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>Category List</Button>
         </Link>
        </li>
         <li className='w-full'>
         <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start 
         !w-full !text-[13px] !font-[500] !pl-9 flex gap-3' 
         onClick={()=>{
         context.setIsOpenFullScreenPanel({
         open:true,
         modal:'Add New Category'
         })
        context?.windowWidth < 992 && context?.setSidebarOpen(false)
          setsubmenuIndex(null)
         }}>
         <span className='block 
         w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'> </span>Add a Category</Button>
         </li>
         <li className='w-full'>
         <Link to='/subCategory/list' onClick={()=>{
         context?.windowWidth < 992 && context?.setSidebarOpen(false)
           setsubmenuIndex(null)
         }}>
        <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start 
        !w-full !text-[13px] !font-[500] !pl-9 flex gap-3'><span className='block 
        w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'> </span>Sub Category List</Button>
        </Link>
        </li>
        <li className='w-full'>
        <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start 
         !w-full !text-[13px] !font-[500] !pl-9 flex gap-3'  
         onClick={()=>{
         context.setIsOpenFullScreenPanel({
         open:true,
         modal:'Add New Sub Category'
        })
        context?.windowWidth < 992 && context?.setSidebarOpen(false) 
          setsubmenuIndex(null)
        }}>
         <span className='block 
          w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>Add a Sub Category List</Button>
          </li>
          </ul>
         </Collapse>
          </li>

           <li>
           <Link to='/orders' onClick={()=>{
          context?.windowWidth < 992 && context?.setSidebarOpen(false)
            setsubmenuIndex(null)
           }}>
          <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] 
        !text-[rgba(0,0,0,0.8)] !font-[500] items-center'>
         <IoBagAddOutline className='text-[18px]'/> <span>Orders</span>
          </Button>
          </Link>
          </li>

          <li>
         <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] 
           !text-[rgba(0,0,0,0.8)] !font-[500] items-center' onClick={()=>isOpenSubMenu(5)}>
           <TbBrandProducthunt className='text-[18px]'/> <span>Banners</span>
           <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'> 
           <FaAngleDown className={`transition-all duration-300 ${submenuIndex===5 ? 'rotate-180' : ''}`}/>
           </span>
           </Button>

           <Collapse isOpened={submenuIndex===5 ? true : false}>
            <ul className='w-full'>
            <li className='w-full'>
            <Link to='/bannerV1List' onClick={()=>{
           context?.windowWidth < 992 && context?.setSidebarOpen(false)
             setsubmenuIndex(null)
           }}>
           <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start 
          !w-full !text-[13px] !font-[500] !pl-9 flex gap-3'>
          <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'>
           </span>
           Home Banner List
           </Button>
           </Link>
          </li>
           <li className='w-full'>
           <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start 
             !w-full !text-[13px] !font-[500] !pl-9 flex gap-3' onClick={()=>{
             context.setIsOpenFullScreenPanel({
             open:true,
             modal:'Add BannerV1'
             })
           context?.windowWidth < 992 && context?.setSidebarOpen(false)
             setsubmenuIndex(null)   
          }}>
         <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'> </span>
          Add Home Banner
          </Button>
          </li>
         </ul>
           </Collapse>
          </li>

          <li>
         <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] 
           !text-[rgba(0,0,0,0.8)] !font-[500] items-center' onClick={()=>isOpenSubMenu(6)}>
           <TbBrandProducthunt className='text-[18px]'/> <span>Blogs</span>
           <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'> 
           <FaAngleDown className={`transition-all duration-300 ${submenuIndex===6 ? 'rotate-180' : ''}`}/>
           </span>
           </Button>
           <Collapse isOpened={submenuIndex===6 ? true : false}>
            <ul className='w-full'>
            <li className='w-full'>
            <Link to='/blogList' onClick={()=>{
           context?.windowWidth < 992 && context?.setSidebarOpen(false)
             setsubmenuIndex(null)
           }}>
           <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start 
          !w-full !text-[13px] !font-[500] !pl-9 flex gap-3'>
          <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'>
           </span>
           Blog List
           </Button>
           </Link>
          </li>
           <li className='w-full'>
           <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start 
             !w-full !text-[13px] !font-[500] !pl-9 flex gap-3' onClick={()=>{
             context.setIsOpenFullScreenPanel({
             open:true,
             modal:'Add Blog'
             })
           context?.windowWidth < 992 && context?.setSidebarOpen(false)
             setsubmenuIndex(null)   
          }}>
         <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'> </span>
          Add Blog
          </Button>
          </li>
         </ul>
           </Collapse>
          </li>

          <li>
          <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] 
        !text-[rgba(0,0,0,0.8)] !font-[500] items-center' onClick={logout}>
          <IoMdLogOut className='text-[18px]'/> 
          <span>Logout</span>
          </Button>
          </li>
       </ul>
     </div>
    {
    context.isSidebarOpen && (
    <div 
     className='sidebarOverlay pointer-events-auto sm:pointer-events-none block lg:hidden w-full h-full fixed
     top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10' 
    onClick={() =>{
     context?.setSidebarOpen(false)
     setsubmenuIndex(null) 
    }}
   />
   )
   }
    </>
  )
}

export default Sidebar;
