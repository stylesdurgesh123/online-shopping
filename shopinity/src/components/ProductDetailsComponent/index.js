import React, { useContext, useState } from 'react'
import QtyBox from '../QtyBox';
import { FaHeart } from "react-icons/fa6";
import { IoGitCompareOutline } from "react-icons/io5";
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { MyContext } from '../../App';

function ProductDetailsComponent(props) {

  const [quantity,setQuantity]=useState(1);
  const [activeTab,setActiveTab]=useState(null);
  const [isAdded,setIsAdded]=useState(false);
  const [selectedTabName,setSelectedTabName]=useState(null);
  const [tabError,setTabError]=useState(false);

  const context=useContext(MyContext);

  const handleSelectQty=(qty)=>{
   setQuantity(qty);
  }

 const addToCart=(product,userId,quantity)=>{
  const productItem={
   _id:product?._id,
   name:product?.name,
   productTitle:product?.name,
   image:product?.images[0],
   rating:product?.rating,
   price:product?.price,
   oldPrice:product?.oldPrice,
   discount:product?.discount,
   productRam:props?.item?.productRam?.length!==0 ? selectedTabName : '',
   productWeight:props?.item?.productWeight?.length!==0 ? selectedTabName : '',
   size:props?.item?.size?.length!==0 ? selectedTabName : '',
   brand:product?.brand,
   quantity:quantity,
   subTotal:parseInt(product?.price * quantity),
   productId:product?._id,
   countInStock:product?.countInStock,
   userId:userId
   }

  setIsAdded(true); 

  if(selectedTabName !== null){
   context?.addToCart(productItem,userId,quantity);
    setIsAdded(false); 
  }else{
    setTabError(true);
  }
  } 
 
 const handleClickActiveTab=(index,name)=>{
  setActiveTab(index)
  setSelectedTabName(name)
}

  return (
    <>
    <h1 className='text-[22px] font-semibold mb-2'>
       {props?.item?.name}
      </h1>
    <div className='flex items-center gap-3 mb-3'>
  <span className='text-gray-500'>
    Brand: <span className='font-medium text-black'>  {
     props?.item?.brand
     }
  </span>
  </span>
  <Rating name="size-small" defaultValue={props?.item?.rating} size="small" readOnly />
  <span className='text-[13px] text-blue-600 cursor-pointer' onClick={props.gotoReviews}>
  {props?.reviewCount} Review</span>
</div>

<p className='text-[14px] text-gray-600 leading-6 mb-4'>
  {props?.item?.description}
</p>

<div className='mb-4'>
  <span className='text-xl font-bold text-[#ff5252]'>&#x20b9; {props?.item?.price}</span>
  <span className='text-gray-400 line-through ml-3'>&#x20b9; {props?.item?.oldPrice} </span>
  <span className='ml-2 text-green-600 text-sm'>(&#x20b9; {props?.item?.discount})</span>
</div>

{
  props?.item?.productRam?.length !== 0 && 
  <div className='flex items-center gap-3 mb-5'>
    <sapn className='text-[16px]'>RAM:</sapn>
    <div className='flex items-center gap-1 '>
      {
        props?.item?.productRam?.map((item, index) => (
          <button 
            key={index} 
            className={`${activeTab===index ? 'bg-[#ff5252] text-white border px-2 py-0 rounded' : 'border px-2 py-0 rounded'} 
           `} onClick={()=>handleClickActiveTab(index,item)}>
            {item}
          </button>
        ))
      }
     </div>
   </div>
  }

  {
  props?.item?.size?.length !== 0 && 
  <div className='flex items-center gap-3 mb-5'>
    <sapn className='text-[16px]'>Size:</sapn>
    <div className='flex items-center gap-1 '>
      {
        props?.item?.size?.map((item, index) => (
          <button 
            key={index} 
            className={`${activeTab===index ? 'bg-[#ff5252] text-white border px-2 py-0 rounded' :
            'border px-2 py-0 rounded'}${tabError===true && '!border !border-[#ff5252]'}`} onClick={()=>handleClickActiveTab(index,item)}>
            {item}
          </button>
        ))
      }
     </div>
   </div>
  }

 {
  props?.item?.productWeight?.length !== 0 && 
  <div className='flex items-center gap-3 mb-5'>
    <sapn className='text-[16px]'>Weight:</sapn>
    <div className='flex items-center gap-1 '>
      {
        props?.item?.productWeight?.map((item, index) => (
          <button 
          key={index} 
          className={`${activeTab===index ? 'bg-[#ff5252] text-white border px-2 py-0 rounded' : 'border px-2 py-0 rounded'} 
          `} onClick={()=>handleClickActiveTab(index,item)}>
            {item}
          </button>
        ))
      }
     </div>
   </div>
  }

{/* Quantity and Cart */}
<div className='flex items-center gap-4 mb-5'>
  <QtyBox handleSelectQty={handleSelectQty}/>

  <Button variant="contained" sx={{ backgroundColor: '#ff5252', '&:hover': { backgroundColor: '#e04848' },}}
   onClick={()=>addToCart(props?.item,context?.userData?._id, quantity)}>
    Add to Cart
  </Button>
  
</div>

{/* Wishlist and Compare */}
<div className='flex items-center gap-4 mt-5'>
  <button className='flex items-center gap-2 text-[15px] font-medium text-gray-700 hover:text-[#ff5252] transition-all duration-300 border border-gray-300 rounded-full px-4 py-2 hover:shadow-sm'>
    <FaHeart className='text-[18px]' />
    Add to Wishlist
  </button>

  <button className='flex items-center gap-2 text-[15px] font-medium text-gray-700 hover:text-[#ff5252] transition-all duration-300 border border-gray-300 rounded-full px-4 py-2 hover:shadow-sm'>
    <IoGitCompareOutline className='text-[18px]' />
    Add to Compare
  </button>
  </div>
    </>
  )
}

export default ProductDetailsComponent;
