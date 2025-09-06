import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import { MdClose } from "react-icons/md";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { GoTriangleDown } from "react-icons/go";
import Rating from '@mui/material/Rating';
import { deleteData } from '../../utlis/api';
import { MyContext } from '../../App';

function CartItem(props) {

  const [sizeanchorEl, setSizeAnchorEl] =useState(null);
  const [selectedSize,setCartItems]=useState();
  const openSize = Boolean(sizeanchorEl);
      
  const [qtyanchorEl, setQtyAnchorEl] =useState(null);
  const [selectedQty,setSelectedQty]=useState(props.qty);
  const openQty = Boolean(qtyanchorEl);

  const context=useContext(MyContext);

    const handleClickSize = (event) => {
        setSizeAnchorEl(event.currentTarget);
      };
      const handleCloseSize = (value) => {
        setSizeAnchorEl(null);
        if(value!==null){
        setCartItems(value)    
        }
      };

    const handleClickQty = (event) => {
        setQtyAnchorEl(event.currentTarget);
      };
    const handleCloseQty = (value) => {
        setQtyAnchorEl(null);
        if(value!==null){
        setSelectedQty(value)    
        }
      };

   const removeItem=(id)=>{
     deleteData(`/api/cart/delete-cart-item/${id}`)
      .then((res)=>{
        if (res?.error === false) {
         context?.openAlertBox('success', res?.message);
         context?.refreshCart();
        }
      })
   }   

      return (
          <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
            <div className="img w-[30%] sm:w-[20%] lg:w-[15%] rounded-md overflow-hidden">
             <Link to={`/product/${props?.item?.productId}`} className='group'>
             <img src={props?.item?.image} alt="cartImage" 
             className='w-full group-hover:scale-105 transition-all duration-300'/>
             </Link>
            </div>
   
            <div className="info w-[70%] sm:w-[80%] lg:w-[85%] relative">
            <MdClose className='cursor-pointer absolute top-0 right-0 text-[22px] transition-all 
             duration-300 hover:text-[#ff5252]' onClick={()=>removeItem(props?.item?._id)}/>
             <span className='text-[13px]'>{props?.item?.brand}</span>
             <h3 className='text-[13px] sm:text-[15px] font-[500] capitalize'>
            <Link to={`/product/${props?.item?.productId}`} className='transition-all duration-300 hover:text-[#ff5252]'>
              {props?.item?.productTitle?.substr(0, context?.windowWidth < 992 ? 40  : 60)+'...'}
             </Link>
             </h3>
               
              <Rating name="size-small" value={props?.item?.rating} size="small" readOnly/>
              <div className='flex items-center gap-4 mt-2'>
           
               <div className='relative'>
               <span className='flex items-center justify-center bg-[#f1f1f1] text-[12px]
                font-[600] py-1 px-2 rounded-md cursor-pointer' onClick={handleClickSize}>
                 Size: {selectedSize} <GoTriangleDown/>
                </span>
                <Menu
                id="size-menu"
                anchorEl={sizeanchorEl}
                open={openSize}
                onClose={()=>handleCloseSize(null)}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}>
               <MenuItem onClick={()=>handleCloseSize('S')}>S</MenuItem>
               <MenuItem onClick={()=>handleCloseSize('M')}>M</MenuItem>
               <MenuItem onClick={()=>handleCloseSize('L')}>L</MenuItem>
               <MenuItem onClick={()=>handleCloseSize('XL')}>XL</MenuItem>
               <MenuItem onClick={()=>handleCloseSize('XXL')}>XXL</MenuItem>
               </Menu>
               </div>           
                <div className='relative'>
                <span className='flex items-center justify-center bg-[#f1f1f1] text-[12px]
                font-[600] py-1 px-2 rounded-md cursor-pointer' onClick={handleClickQty}>
                Qty: {selectedQty} <GoTriangleDown />
                </span>

                <Menu
                id="size-menu"
                anchorEl={qtyanchorEl}
                open={openQty}
                onClose={()=>handleCloseQty(null)}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}>
               <MenuItem onClick={()=>handleCloseQty('1')}>1</MenuItem>
               <MenuItem onClick={()=>handleCloseQty('2')}>2</MenuItem>
               <MenuItem onClick={()=>handleCloseQty('3')}>3</MenuItem>
               <MenuItem onClick={()=>handleCloseQty('4')}>4</MenuItem>
               <MenuItem onClick={()=>handleCloseQty('5')}>5</MenuItem>
               </Menu>
                </div>
              </div>
              <div className='flex items-center gap-4 mt-2'>
              <span className='Price text-[14px] font-bold'>&#x20b9; {props?.item?.price}</span>
              <span className='oldPrice line-through text-gray-500 text-[14px] font-[500]'>&#x20b9; {props?.item?.oldPrice}</span>
              <span className='Price text-[#ff5252] text-[14px] font-bold'>&#x20b9; {props?.item?.discount}</span>
              </div>
              </div>
             </div>
  )
}

export default CartItem;

  