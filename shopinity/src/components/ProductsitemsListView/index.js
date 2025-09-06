import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { MyContext } from '../../App.js';

function Productsitems(props) {
const context=useContext(MyContext);

 return (
<div className='productsitems rounded-xl overflow-hidden border
 border-[rgba(0,0,0,0.1)] shadow-lg flex items-center'>
<div className='group imagewraper w-[25%] relative rounded-md overflow-hidden'>
<Link to={`/product/${props?.item?._id}`}>
<div className="img overflow-hidden">
<img src={props?.item?.images[0]} alt="" className='w-full'/>
<img src={props?.item?.images[1]} alt="" className='w-full absolute transition-all duration-700 top-0 
left-0 opacity-0 group-hover:opacity-100 group-hover:scale-110'/>
</div>
</Link>
 <span className="discount absolute top-2 left-2 bg-[#ff5252] text-white text-xs font-semibold px-1 py-1 rounded-md">
      {props?.item?.discount}
    </span>

 <div className='actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 
  flex-col w-[50px] transition-all duration-500 group-hover:top-[15px]'>
    
   <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !text-black 
 hover:!bg-[#ff5252] hover:!text-white' onClick={()=>context.setOpenProductDetailModal(true)}>
  <MdZoomOutMap className='text-[17px]'/>
  </Button>
  
<Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !text-black 
 hover:!bg-[#ff5252] hover:!text-white'>
  <IoGitCompareOutline className='text-[17px]'/>
  </Button>
 
 <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !text-black 
 hover:!bg-[#ff5252] hover:!text-white'><FaRegHeart className='text-[17px]'/>
 </Button> 

  </div> 
</div>

<div className="info p-3 py-5 px-8 w-[75%] bg-[#f9f9f9]">
<h6 className='text-[15px]  mb-1 text-[#888]'>
  <span className='hover:text-[#ff5252]'>
    {props?.item?.brand}
  </span>
  </h6>
<h3 className='text-[18px] title mt-3 mb-3 font-[500] text-black leading-5'>
  <Link to={`/product/${props?.item?._id}`} className='hover:text-[#ff5252]'>
    {props?.item?.name}
  </Link>
  </h3>
  <p className='text-[14px] mb-3'>
    {props?.item?.description}
  </p>

<Rating name="size-small" defaultValue={props?.item?.rating} size="small" readOnly/>
 <div className='flex items-center gap-4'>
  <span className='oldPrice line-through text-gray-500 text-[16px] font-[500]'>
    &#x20b9; {props?.item?.oldPrice} 
    </span>
  <span className='Price text-[#ff5252] font-bold'>
     &#x20b9; {props?.item?.price} 
    </span>
 </div>

  <div className='mt-3'>
  <Button className='btn-org !bg-[#ff5252] !text-white !text-[13px] font-[600] 
  transition-all duration-300 hover:!bg-black hover:!text-white flex gap-2'>
  <FaShoppingCart className='text-[20px]'/>
    Add to Cart
    </Button>
  </div>
</div>
</div> 
  )
}

export default Productsitems;
