import React,{useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { FaRegHeart } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import { MyContext } from '../../App.js';
import { FaShoppingCart } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { deleteData, postData, profileEditData } from '../../utlis/api.js';
import { IoClose } from "react-icons/io5";

function Productsitems(props) {

 const [quantity,setQuantity]=useState(1);
 const [isAdded,setIsAdded]=useState(false);
 const [isAddedInMyList,setIsAddedInMyList]=useState(false);
 const [cartItem,setCartItem]=useState([]);
 const [isShowTabs,setIsShowTabs]=useState(false);
 const [activeTab,setActiveTab]=useState(null);
 const [selectedTabName,setSelectedTabName]=useState(null);

 const context=useContext(MyContext);

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

  if(props?.item?.size?.length!==0 || props?.item?.productRam?.length!==0 || props?.item?.productWeight?.length!==0){
    setIsShowTabs(true)
   }else{
  context?.addToCart(productItem,userId,quantity);
   setIsAdded(true);
   setIsShowTabs(false)
   }
  if(activeTab !== null){
   context?.addToCart(productItem,userId,quantity);
   setIsAdded(true);
   setIsShowTabs(false)
  }
 }

const handleClickActiveTab=(index,name)=>{
  setActiveTab(index)
  setSelectedTabName(name)
}

  useEffect(() => {
    const item = context?.cartData?.filter(
     (cartItem) => cartItem.productId === props?.item?._id
    );

   const myListItem = context?.myList?.filter(
    (item) => item.productId === props?.item?._id
    );   

    if (item?.length > 0) {
      setCartItem(item);
      setIsAdded(true);
      setQuantity(item[0]?.quantity || 1);
    }else{
    setQuantity(1);  
    }

   if(myListItem?.length > 0) {
    setIsAddedInMyList(true);
    }else{
    setIsAddedInMyList(false);  
    } 

  }, [context?.cartData, props?.item?._id]);

  const addQty = () => {
  const newQty = quantity + 1;
  setQuantity(newQty);

  const obj = {
    _id: cartItem[0]?._id,
    qty: newQty,  
    subTotal:props?.item?.price * newQty
  };

  profileEditData(`/api/cart/update-qty`, obj)
    .then((res) => {
     if (res?.error === false) {
     context?.openAlertBox('success', res?.message);
     context?.refreshCart();
     }
    });
};
 
  const minusQty = () => {
  if (quantity > 0) {
    const newQty = quantity - 1;
    setQuantity(newQty);

    if (newQty === 0 && cartItem.length > 0) {
      deleteData(`/api/cart/delete-cart-item/${cartItem[0]?._id}`)
        .then((res) => {
          if (res?.error === false) {
            setIsAdded(false);
            context?.openAlertBox('success', res?.message);
              context?.refreshCart();
              setIsShowTabs(false)
              setActiveTab(null)
          }
        })
    } else {
      const obj = {
        _id: cartItem[0]?._id,
        qty: newQty,
        subTotal: props?.item?.price * newQty,
      };
      profileEditData(`/api/cart/update-qty`, obj)
      .then((res) => {
      if (res?.error === false) {
       context?.openAlertBox('success', res?.message);
        context?.refreshCart();
       }
        });
    }
  }
};

 const handleAddToMyList=(item)=>{
  if(context?.userData===null){
  context?.openAlertBox('error','Your are not login'); 
    return false;
  }else { 
   const obj={
    productId:item?._id,
    userId:context?.userData?._id,
    productTitle:item?.name,
    image:item?.images[0],
    rating:item?.rating,
    price:item?.price,
    oldPrice:item?.oldPrice,
    brand:item?.brand,
    discount:item?.discount
  }
 postData('/api/myList/add', obj)
  .then((res)=>{
   if(res?.error===false){
   context?.openAlertBox('success',res?.message); 
   setIsAddedInMyList(true); 
   context?.getMyListData();  
   }else{
   context?.openAlertBox('error',res?.message); 
   }
  })
 }
 }

 return (
 <div className='productsitems rounded-xl overflow-hidden border border-[rgba(0,0,0,0.1)]
  shadow-lg flex flex-col h-full'>
 <div className='group imagewraper w-full relative rounded-md overflow-hidden'>
 <Link to={`/product/${props?.item?._id}`}>
 <div className="img overflow-hidden relative">
  <img src={props?.item?.images[0]} alt="" 
  className='w-full h-[220px] object-cover'/>
  <img src={props?.item?.images[1]} alt="" 
  className='w-full h-[220px] object-cover absolute transition-all duration-700 
  top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-110'/>
 </div>
 </Link>
 {
  isShowTabs===true &&
  <div className='flex items-center justify-center absolute top-0 left-0 w-full h-full
  bg-[rgba(0,0,0,0.7)] z-[60] p-3 gap-2 flex-wrap'>
     
   <Button className='!absolute !top-[10px] !right-[10px] !min-w-[30px] !min-h-[30px]
   !w-[30px] !rounded-full !bg-[rgba(255,255,255,0.5)]
   hover:!bg-[#ff5252] !transition-all !duration-300' onClick={()=>setIsShowTabs(false)}>
   <IoClose className=' text-white z-[90] text-[20px]'/>
   </Button>
   
    {
     props?.item?.size?.length!==0 && props?.item?.size?.map((item,index)=>{
      return(
    <span key={index} className={`flex items-center justify-center p-1 bg-[rgba(255,255,255,0.8)]
     w-[25px] h-[25px] min-w-[35px] rounded-sm cursor-pointer hover:bg-white ${activeTab===index && '!bg-[#ff5252] !text-white !transition-all !duration-300'}`}
     onClick={()=>handleClickActiveTab(index,item)}>{item}</span>
      )
     }) 
    }

   {
     props?.item?.productWeight?.length!==0 && props?.item?.productWeight?.map((item,index)=>{
      return(
    <span key={index} className={`flex items-center justify-center p-1 bg-[rgba(255,255,255,0.8)]
     w-[25px] h-[25px] min-w-[35px] rounded-sm cursor-pointer hover:bg-white ${activeTab===index && '!bg-[#ff5252] !text-white !transition-all !duration-300'}`}
     onClick={()=>handleClickActiveTab(index,item)}>{item}</span>
      )
     }) 
    }

     {
     props?.item?.productRam?.length!==0 && props?.item?.productRam?.map((item,index)=>{
      return(
    <span key={index} className={`flex items-center justify-center p-1 bg-[rgba(255,255,255,0.8)]
     w-[25px] h-[25px] min-w-[35px] rounded-sm cursor-pointer hover:bg-white ${activeTab===index && '!bg-[#ff5252] !text-white !transition-all !duration-300'}`}
     onClick={()=>handleClickActiveTab(index,item)}>{item}</span>
      )
     }) 
    }

 </div>
 }
 <span className="discount absolute top-2 left-2
  bg-[#ff5252] text-white text-xs font-semibold px-1 py-1 rounded-md">
  {props?.item?.discount}   
  </span>
  <div className='actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 
   flex-col w-[50px] transition-all duration-500 group-hover:top-[15px]'>    
  <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !text-black 
 hover:!bg-[#ff5252] hover:!text-white'
  onClick={() => context.handleOpenProductDetailModal(true, props?.item)}
  >
  <MdZoomOutMap className='text-[17px]'/>
  </Button>
  
<Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !text-black 
 hover:!bg-[#ff5252] hover:!text-white'>
  <IoGitCompareOutline className='text-[17px]'/>
  </Button>
 
 <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !text-black 
 hover:!bg-[#ff5252] hover:!text-white ' onClick={()=>handleAddToMyList(props?.item)}>
   {
   isAddedInMyList === true ? <IoMdHeart className='text-[17px] text-[#ff5252]'/> : <FaRegHeart className='text-[17px]'/>
   }
 </Button> 
  </div> 
</div>

<div className="info p-3 bg-[#f9f9f9] w-full">
<h6 className='text-[13px]  mb-1 text-[#888]'>
 <Link to={`/product/${props?.item?._id}`} className='hover:text-[#ff5252]'>
 {props?.item?.brand}
 </Link>
 </h6>
<h3 className='text-[14px] title mt-1 font-[500] text-black leading-5 mb-1'>
  <Link to={`/product/${props?.item?._id}`} className='hover:text-[#ff5252]'>
    {props?.item?.name?.substr(0, 30)+'...'}
  </Link>
  </h3>
<Rating name="size-small" defaultValue= {props?.item?.rating} size="small" readOnly/>
 <div className='flex items-center gap-4'>
  <span className='oldPrice line-through text-gray-500 text-[16px] font-[500]'>
    &#x20b9; {props?.item?.oldPrice} 
    </span>
  <span className='Price text-[#ff5252] font-bold'>
   &#x20b9; {props?.item?.price}
   </span>
 </div>
  <div className='mt-3'>
    {
    isAdded===false ?
   <Button className='btn-org !bg-[#fff] !border-2 
    !border-solid !border-[#ff5252] !text-[#ff5252] !text-[12px] font-[500] 
    transition-all duration-300 hover:!bg-[#ff5252]
   hover:!text-white flex gap-1 w-full' 
    onClick={()=>addToCart(props?.item,context?.userData?._id, quantity)}>
    <FaShoppingCart className='text-[18px]'/>
    Add to Cart
    </Button>
    :
   <div className='flex items-center justify-between overflow-hidden rounded-full
     border border-[rgba(0,0,0,0.1)]'>
    <Button className='!min-w-[30px] !w-[30px] !h-[30px]
     !rounded-none !bg-[#f1f1f1] !text-[#000]' onClick={minusQty}>
     <FaMinus/>
     </Button>
     <span>{quantity}</span>
     <Button className='!min-w-[30px] !w-[30px] !h-[30px] !bg-[#ff5252] !text-[#fff]
     !rounded-none' onClick={addQty}>
      <FaPlus/>
      </Button>
    </div>
    }
  </div>
</div>
</div>
  )
}
export default Productsitems;
