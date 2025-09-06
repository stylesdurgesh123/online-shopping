import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import Button from '@mui/material/Button'; 
import { MyContext } from '../../App';
import { deleteData } from '../../utlis/api';

function CartPanel(props) {

 const context=useContext(MyContext);

 const removeItem=(id)=>{
  deleteData(`/api/cart/delete-cart-item/${id}`)
  .then((res) => {
    if (res?.error === false) {
   context?.openAlertBox('success', res?.message);
   context?.refreshCart();
    }
  })
  }

  return (
    <>
    <div className="scroll max-h-[300px] overflow-y-scroll py-3 px-4">
      {
       props?.data?.map((item,index)=>{
        return(
     <div className="cartItem flex items-center gap-4 border-b pb-4 mb-2">
      <div className="img w-[25%] h-[80px] overflow-hidden rounded-md" key={index}>
        <Link to={`/product/${item?._id}`}>
          <img
            src={item?.image}
            alt="product"
            className="w-full h-full object-cover"/>
        </Link>
      </div>
      <div className="info w-[75%] pr-5 relative">
        <h4 className="text-[12px] sm:text-[16px] font-[500]">
          <Link
            to={`/product/${item?._id}`}
            className="hover:text-[#ff5252] transition-all duration-300">
             {item?.productTitle?.substr(0, 30)+'...'}
          </Link>
        </h4>
        <p className="flex items-center gap-5 mt-2 mb-2 text-[14px]">
          <span className='text-[13px] sm:text-[14px]'>Qty: {item?.quantity}</span>
          <span className="text-[#ff5252] font-bold">&#x20b9; {item?.price}</span>
        </p>
        <MdDelete className="absolute top-[10px] right-[10px] cursor-pointer 
        text-[20px] hover:text-[#ff5252]" onClick={()=>removeItem(item?._id)}/>
      </div>
    </div>
        )
       })
      }
  </div>
   {/* Total Section*/}
    <div className="bottomInfo py-3 px-4 border-t border-[rgba(0,0,0,0.1)] w-full">
      <div className="flex justify-between mb-2">
        <span className="text-[14px] font-[600]">{context?.cartData?.length} items</span>
        <span className="text-[#ff5252] font-bold">
        {
       (context?.cartData?.length
       ? context.cartData
        .map(item => Number(item.price) * item.quantity)
        .reduce((total, value) => total + value, 0)
        : 0
        ).toLocaleString('en-IN', {
       style: 'currency',
      currency: 'INR'
      })
     }
     </span>
    </div>
      <div className="flex justify-between mb-2">
        <span className="text-[14px] font-[600]">Total (tax excl.)</span>
        <span className="text-[#ff5252] font-bold">
        {
         (context?.cartData?.length
         ? context.cartData
         .map(item => Number(item.price) * item.quantity)
         .reduce((total, value) => total + value, 0)
         : 0
        ).toLocaleString('en-IN', {
       style: 'currency',
      currency: 'INR'
       })
     }
     </span>
     </div>
    </div>
  
    {/* Buttons */}
    <div className="py-3 px-4 flex gap-3">
      <Link to="/cartpage" className="w-1/2" onClick={context.toggleCartPanel(false)}>
        <Button className="!bg-black !text-white !font-[600] hover:!bg-[#ff5252] w-full">
          View Cart
        </Button>
      </Link>
      <Link to="/checkout" className="w-1/2" onClick={context.toggleCartPanel(false)}>
        <Button className="!bg-black !text-white !font-[600] hover:!bg-[#ff5252] w-full">
          Checkout
        </Button>
      </Link>
    </div>
    </>
  )
}

export default CartPanel;
