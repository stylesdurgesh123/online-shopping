import React,{useState} from 'react'
import { Link } from 'react-router-dom'; 
import { Button } from '@mui/material';
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaRegSquareMinus } from "react-icons/fa6";


function  CategorieCollapse(props) {

  const [subMenuIndex,setSubMenuindex]=useState(null)
  const [innerSubMenuIndex, setInnerSubMenuindex]=useState(null)
 
  const openSubmenu=(index)=>{
    if(subMenuIndex===index){
      setSubMenuindex(null)
    }
    else{
      setSubMenuindex(index)
    } 
  }

  const openInnerSubmenu=(index)=>{
    if(innerSubMenuIndex===index){
      setInnerSubMenuindex(null)
    }
    else{
      setInnerSubMenuindex(index)
    } 
  }

  return (
     <>
      <div className='scroll'>
        <ul className='w-full'>
          {
          props?.data?.length!==0 &&  props?.data?.map((catItem,index)=>{
          return (
          <li className='flex items-center relative flex-col'>
          <Link to={`/productListing?catId=${catItem?._id}`} className='w-full'>
         <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]'>
         {catItem?.name}
        </Button>
        </Link>
        
        <div className='absolute w-[30px] h-[30px] top-[10px] 
         right-[1px] cursor-pointer' onClick={() => openSubmenu(index)}>
         {
         subMenuIndex === index ? (
         <FaRegSquareMinus/>
          ) : (
         <FaRegSquarePlus/> 
           )
         }
        </div>

          {
          subMenuIndex===index && (
          <ul className='w-full pl-3'>
           {
          catItem?.children?.length!==0 && catItem?.children?.map((subCat,index_)=>{
          return (
         <li className='relative'>
          <Link to={`/productListing?subCatId=${subCat?._id}`}  className='w-full'>
          <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]'>
           {subCat?.name}
           </Button>
          </Link>
          {
       innerSubMenuIndex === index_ ? (
       <FaRegSquareMinus
      className="absolute top-[10px] right-[15px] cursor-pointer"
      onClick={() =>  openInnerSubmenu(index_)}/> // Close submenu
       ) : (
      <FaRegSquarePlus
      className="absolute top-[10px] right-[15px] cursor-pointer"
      onClick={() =>  openInnerSubmenu(index_)} /> // Open submenu
         )
         }            
        
          {
            innerSubMenuIndex===index_ && (
              <ul className='w-full pl-3'>
               {
             subCat?.children?.length!==0 && subCat?.children?.map((thirdLavelCat,index)=>{
              return(
              <li className='relative mb-1' key={index}>
               <Link to={`/productListing?thirdSubCatId=${thirdLavelCat?._id}`} className='w-full !text-left !justify-start !px-3 text-[14px] 
               hover:text-[#ff5252] transition duration-300'>
                {thirdLavelCat?.name}
               </Link>
               </li>
                )
                })
                }
              </ul>
              )}
            </li>
             )
             })
           }
          </ul>
           )}
          </li>
           )
           })
           }
          </ul>
        </div>     
    </>
  )
}

export default CategorieCollapse;
