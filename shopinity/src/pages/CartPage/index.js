import React, { useContext } from 'react';
import Button  from '@mui/material/Button';
import { IoBagAddOutline } from "react-icons/io5";
import CartItem from './cartItem';
import { MyContext } from '../../App';
import { Link } from 'react-router-dom';

function CartPage() {

const context=useContext(MyContext);

window.scrollTo(0,0);

  return (
    <section className='section py-4 lg:py-10 pb-10'>
    <div className='w-[95%] m-auto max-w-[80%] flex gap-5 flex-col lg:flex-row'>
     <div className="leftPart w-full lg:w-[70%]">
       <div className='shadow-md rounded-md bg-white'>
        <div className='py-2 px-3 border-b border-[rgba(0,0,0,0.1)]'>
        <h2>Your Cart</h2>
         <p className='mt-0'>There are <span className='font-bold text-[#ff5252]'> {context?.cartData?.length} </span>{' '} 
         product in your cart</p>
        </div>
        {
         context?.cartData?.length!==0 ? context?.cartData?.map((item,index)=>{
          return(
         <CartItem size='S' qty={item?.quantity} item={item} key={index}/>
          )
        })
        :
       <>
       <div className='flex items-center justify-center flex-col py-8 gap-4'>
        <img 
       src='https://cdn-icons-png.flaticon.com/128/15106/15106109.png' 
       alt="empty-cart"
       className='w-[150px]'
       />
      <h4 className='text-[20px] font-[500]'>Your cart is currently empty</h4>
      <Link to='/'>
      <Button className='!bg-[#ff5252] hover:!bg-[#000]
      !text-white !font-semibold !text-[13px] !mt-4' onClick={context.toggleCartPanel(false)}>
       Continue Shopping
       </Button> 
       </Link> 
      </div>
       </>    
        }
        </div> 
       </div>
       <div className="rightPart w-full lg:w-[30%]">
        <div className='shadow-md rounded-md bg-white p-3 space-y-4 sticky top-[150px] z-[90]'>
         <h3 className='pb-2'>Card Totals</h3>
         <hr className='border-gray-200'/>
        <p className='flex items-center justify-between text-sm'>
        <span className='text-[14px] font-[500]'>Subtotal</span>
        <span className='!text-[#ff5252] font-bold'>
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
        </p>
        <p className='flex items-center justify-between'>
          <span className='text-[14px] font-[500]'>Shipping</span>
          <span className='text-gray-800 font-bold'>Free</span>
        </p>
        <p className='flex items-center justify-between'>
          <span className='text-[14px] font-[500]'>Estimate for</span>
          <span className='text-gray-800 font-bold'>United Kingdom</span>
          </p>
          <p className='flex items-center justify-between'>
          <span className='text-[14px] font-[500]'>Total</span>
          <span className='!text-[#ff5252] font-bold'>
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
         </p>
         <br/>
       <Link to='/checkout'>
        <Button className='btn-lg !text-white !font-[500] !bg-[#ff5252] transition-all duration-300
       hover:!bg-black w-full flex gap-2'><IoBagAddOutline className='text-[20px]'/> Checkout</Button>
       </Link>
        </div>
       </div>
    </div>
  </section>
  )
}

export default CartPage;
