import React, { useContext, useState } from 'react'
import { RiMenu3Line } from "react-icons/ri";
import Button from '@mui/material/Button';
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';
import { IoRocketOutline } from "react-icons/io5";
import CatagoryPanel from './CatagoryPanel';
import { useEffect } from 'react';
import { MyContext } from '../../../App';
import MobileNav from './MobileNav';

function Navbar(props) {

  const [isOpenCatPanel,setOpenCatPanel]=useState(false);
  const [catData,setCatData]=useState([]);

  const context=useContext(MyContext);

   useEffect(()=>{
    setCatData(context?.catData);
  },[context?.catData]);

  useEffect(()=>{
   setOpenCatPanel(props.isOpenCatPanel)
  },[props.isOpenCatPanel])

  const openCategoryPanel=()=>{
    setOpenCatPanel(true);
  }

  return (
    <>
    <nav className='navigation py-4 lg:py-2'>
      <div className='w-[95%] m-auto flex items-center justify-start lg:justify-end gap-7'>
      {
      context?.windowWidth > 992 &&
       <div className='col_1 w-[20%]'>
       <Button className='!text-black gap-2 w-full' onClick={openCategoryPanel}>
       <RiMenu3Line className='text-[16px]'/>
       Shop By Categories
       <LiaAngleDownSolid className='text-[15px] ml-auto font-bold'/>
       </Button>
      </div>
      }
     
      <div className='col_2 w-full lg:w-[60%]'>
       <ul className='flex items-center gap-5'>
        <li>
        <Link to='/' className='transition-colors duration-300 hover:text-[#ff5252] 
        text-[15px] font-[550]'>
          Home
          </Link>
        </li>
        {
       catData?.length!==0 && catData?.map((catItem,index)=>{
        return (
      <li className='relative group' key={index}>
        <Link to={`/productListing?catId=${catItem?._id}`}
         className='transition-colors duration-300 hover:text-[#ff5252]
         text-[15px] font-[600]'>
         {catItem?.name}
        </Link>
          {
        catItem?.children?.length!==0 && 
        <div className='absolute top-[120%] left-0 min-w-[200px]
        bg-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10'>
        <ul>
         {
          catItem?.children?.map((subCat,index_)=>{
           return (
          <li className='w-full relative group/menu' key={index_}>
           <Link to={`/productListing?subCatId=${subCat?._id}`} className='w-full'>
          <Button className='!text-[rgba(0,0,0,0.8)] !normal-case w-full !justify-start'>
             {subCat?.name}
           </Button>
           {
           subCat?.children?.length!==0 && 
        <div className='absolute top-[100%] left-full min-w-[200px] bg-white shadow-md
          opacity-0 invisible group-hover:opacity-100  group-hover/menu:visible transition-all duration-300 z-10'>
         <ul>
          {
           subCat?.children?.map((thirdLavelCat,index_)=>{
             return (
           <li className='w-full' key={index_}>
           <Link to={`/productListing?thirdSubCatId=${thirdLavelCat?._id}`} className='w-full'>
           <Button className='!text-[rgba(0,0,0,0.8)] !normal-case 
           w-full !justify-start'>
            {thirdLavelCat?.name}
            </Button>
           </Link> 
          </li>
             )
            })
          }
        </ul>
        </div>
           }
          </Link> 
          </li>
           )
          })
         }
        </ul>
        </div>
          }
        </li>
        )
       })   
        }
       </ul>
      </div>
       <div className='col_3 w-[20%] hidden lg:block'>
        <p className='text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0'>
        <IoRocketOutline className='text-[18px]'/>
        Free International Deliver
        </p>
       </div>
      </div>
    </nav>
    {
    catData?.length!==0 && 
    <CatagoryPanel 
    setOpenCatPanel={setOpenCatPanel} 
    isOpenCatPanel={isOpenCatPanel}
    propsSetOpenCatPanel={props.setOpenCatPanel}
    data={catData}
    />
    }

  {
  context?.windowWidth < 992 && <MobileNav/>
  }

    </>
  )
}

export default Navbar;


