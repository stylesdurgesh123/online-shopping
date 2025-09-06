import React, { useContext, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MyContext } from '../../App';

const ITEM_HEIGHT = 48;
function AddressBox(props) {

 const [anchorEl, setAnchorEl] =useState(null);
 const open = Boolean(anchorEl);
 const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
  };
 const handleClose = () => {
    setAnchorEl(null);
  }; 

 const context=useContext(MyContext)  

 const removeAddress=(id)=>{
   setAnchorEl(null);
   props?.removeAddress(id);
 }

const editAddress=(id)=>{
 setAnchorEl(null);
 context?.setOpenAddressPanel(true);
 context?.setAddressMode('edit');
 context?.setAddressId(id);
 //context?.editAddress(id);
} 

  return (
    <div className='group relative addreshBox w-full  
    border border-dashed border-[#0,0,0,0.1] bg-[#f1f1f1] p-4
    rounded-md cursor-pointer'>
    <span className='inline-block p-1 bg-[#ff5252] text-[14px] text-white rounded-sm'>
    {props?.address?.addressType}
     </span>
            
    <h4 className='text-[#ff5252] pt-2 flex items-center gap-3'>
    <span>{context?.userData?.name}</span>
    <span>+{props?.address?.mobile}</span>
      </h4> 

      <span className='text-[13px] pt-0 block w-100'>
             {
            props?.address?.address_line1+ " "+
            props?.address?.city+ " "+
            props?.address?.country+ " "+
            props?.address?.pincode+ " "+
            props?.address?.state+ " "+
            props?.address?.landmark
            }
          </span>
       <div className='absolute top-[20px] right-[20px]'>
        <IconButton
         aria-label="more"
         id="long-button"
         aria-controls={open ? 'long-menu' : undefined}
         aria-expanded={open ? 'true' : undefined}
         aria-haspopup="true"
         onClick={handleClick}
          >
        <HiOutlineDotsVertical />
       </IconButton> 
         <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
          list: {
            'aria-labelledby': 'long-button',
          },
         }}
         >
       <MenuItem onClick={()=>editAddress(props?.address?._id)}>
         Edit
       </MenuItem>
       <MenuItem onClick={()=>removeAddress(props?.address?._id)}>
         Delete
       </MenuItem>
       </Menu>
        </div>
         </div>
  )
}

export default AddressBox
