import React from 'react'
import { IoMdTime } from "react-icons/io";
import {Link} from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";


const stripHtml = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};
function BlogItem(props) {
  return (
    <div className="blogitem group">
    <div className="imgWrapper w-full overflow-hidden rounded-md cursor-pointer relative">
      <img
        src={props?.item?.images[0]}
        className="w-full transition-transform duration-500 ease-in-out hover:scale-110"
        alt="blogImage"/>

   <span className="flex items-center justify-center text-white absolute bottom-[11px] right-[15px] z-10
   bg-[#ff5252] rounded-md p-1 text-[12px] font-[500] gap-1">
    <IoMdTime className='text-[16px]'/> {props?.item?.createdAt?.split('T')[0]}
    </span>
    </div>
   <div className='info py-4'>
    <h2 className='text-[16px] font-[600] text-black'>
      <Link to='/' className='hover:text-[#ff5252] transition-all duration-300'>
       {props?.item?.title}
      </Link>
      </h2>
    <p className='text-[13px] font-[400] text-[rgba(0,0,0,0.8)] mb-4'>
     {
      props?.item?.description 
       ? stripHtml(props?.item.description).substring(0, 200) + '...'
       : 'No Description'
       }
      </p>
    <Link to='/' className='hover:text-[#ff5252] transition-all duration-300 font-[500] text-[14px] flex items-center gap-1'>
     Read More<IoIosArrowForward/>
    </Link>
   </div>
  </div> 
  )
}

export default BlogItem;
