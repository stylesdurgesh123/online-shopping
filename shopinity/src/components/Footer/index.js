import React, { useContext } from 'react'
import { LiaShippingFastSolid } from "react-icons/lia";
import { GiReturnArrow } from "react-icons/gi";
import { BsWallet2 } from "react-icons/bs";
import { LiaGiftSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
import {Link} from 'react-router-dom';
import { MdOutlineChat } from "react-icons/md";
import { PiArrowBendDoubleUpRightBold } from "react-icons/pi";
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Productzoom from '../Productzoom';
import ProductDetailsComponent from '../ProductDetailsComponent';

import { IoCloseSharp } from "react-icons/io5";
import Drawer from '@mui/material/Drawer';
import CartPanel from '../CartPanel';
import { MyContext } from '../../App';
import AddAddress from '../../pages/MyAccount/addAddress';

function Footer() {

 const context=useContext(MyContext);

  return (
    <>
    <footer className='py-6 !bg-gray-100'>
      <div className='w-[95%] m-auto'>
      <div className='flex items-center justify-center gap-2 py-8 pb-8 px-0 lg:px-5 scrllableBox'>
       <div className='col flex items-center justify-center flex-col group w-[20%]'>
       <LiaShippingFastSolid className='text-[40px] transition-all duration-300
        group-hover:text-[#ff5252] group-hover:-translate-y-1'/>
        <h3 className='text-[18px] font-[600] mt-3'>Free Shipping</h3>
        <p className='text-[13px] font-[500]'>For all Oders $100</p>
       </div>

       <div className='col flex items-center justify-center flex-col group w-[20%]'>
       <GiReturnArrow className='text-[40px] transition-all duration-300
        group-hover:text-[#ff5252] group-hover:-translate-y-1'/>
        <h3 className='text-[18px] font-[600] mt-3'>30 Days Return</h3>
        <p className='text-[13px] font-[500]'>For an Exchange Products</p>
       </div>

       <div className='col flex items-center justify-center flex-col group w-[20%]'>
       <BsWallet2 className='text-[40px] transition-all duration-300
        group-hover:text-[#ff5252] group-hover:-translate-y-1'/>
        <h3 className='text-[18px] font-[600] mt-3'>Secured Payment</h3>
        <p className='text-[13px] font-[500]'>Payment Card Accepted</p>
       </div>

       <div className='col flex items-center justify-center flex-col group w-[20%]'>
         <LiaGiftSolid className='text-[40px] transition-all duration-300
        group-hover:text-[#ff5252] group-hover:-translate-y-1'/>
        <h3 className='text-[18px] font-[600] mt-3'>Special Gifts</h3>
        <p className='text-[13px] font-[500]'>Our First Product Order</p>
       </div>

       <div className='col flex items-center justify-center flex-col group w-[20%]'>
       <BiSupport className='text-[40px] transition-all duration-300
        group-hover:text-[#ff5252] group-hover:-translate-y-1'/>
        <h3 className='text-[18px] font-[600] mt-3'>Support 24/7</h3>
        <p className='text-[13px] font-[500]'>Contact us Anytime</p>
       </div>

     </div>
      <br/>
     <hr/>

    <div className="footer px-3 lg:px-0 flex flex-col lg:flex-row py-8">
     <div className="part1 w-full lg:w-[25%] border-r-2 border-[rgba(0,0,0,0.1)]">
     <h2 className='text-[20px] font-[600] mb-4'>Contact Us</h2>
     <p className="text-[13px] font-[400] text-gray-600 pb-4">
     Have questions or need help with<br/> your order? 
     Feel free to reach out to us anytime.We're here to assist you 24/7.
     </p>
     <Link to='mailto:someone@example.com' className='hover:text-[#ff5252] text-[13px]'>
      sale@example.com
     </Link>
     <span className='text-[20px] font-[600] block w-full mt-3 mb-5 text-[#ff5252]'>
       (+91) 6666-888-345
      </span>
     <div className='flex items-center gap-2'>
     <MdOutlineChat className='text-[40px] text-[#ff5252]'/>
     <span className='text-[16px] font-[600]'>
      Online Chat<br/>
      Get Expert Help
     </span>
      </div> 
      </div>

      <div className="part2 w-full lg:w-[40%] flex pl-0 lg:pl-8 mt-5 lg:mt-0">
      <div className='part2_col1 w-[50%]'>
      <h2 className='text-[20px] font-[600] mb-4'>Products</h2>

       <ul>
        <li className='text-[14px] w-full mb-2'>
        <Link to='/' 
        className='flex items-center gap-1 transition-all duration-300 hover:text-[#ff5252]'>
        <PiArrowBendDoubleUpRightBold className='text-[20px] font-bold'/>
         Prices drop
        </Link>
        </li>

       <li className='text-[14px] w-full mb-2'>
        <Link to='/' 
        className='flex items-center gap-1 transition-all duration-300 hover:text-[#ff5252]'>
        <PiArrowBendDoubleUpRightBold className='text-[20px] font-bold'/>
         New Products
        </Link>
        </li>

        <li className='text-[14px] w-full mb-2'>
        <Link to='/' 
        className='flex items-center gap-1 transition-all duration-300 hover:text-[#ff5252]'>
        <PiArrowBendDoubleUpRightBold className='text-[20px] font-bold'/>
         Best Sales
        </Link>
        </li>

        <li className='text-[14px] w-full mb-2'>
        <Link to='/' 
        className='flex items-center gap-1 transition-all duration-300 hover:text-[#ff5252]'>
        <PiArrowBendDoubleUpRightBold className='text-[20px] font-bold'/>
         Contact Us
        </Link>
        </li>

        <li className='text-[14px] w-full mb-2'>
        <Link to='/' 
        className='flex items-center gap-1 transition-all duration-300 hover:text-[#ff5252]'>
        <PiArrowBendDoubleUpRightBold className='text-[20px] font-bold'/>
         Sitemap
        </Link>
        </li>

        <li className='text-[14px] w-full mb-2'>
        <Link to='/' 
        className='flex items-center gap-1 transition-all duration-300 hover:text-[#ff5252]'>
        <PiArrowBendDoubleUpRightBold className='text-[20px] font-bold'/>
         Stores
        </Link>
        </li>
      </ul>
      </div> 

      <div className='part2_col2 w-[50%]'>
      <h2 className='text-[18px] font-[600] mb-4'>Our Company</h2>

      <ul>
        <li className='text-[14px] w-full mb-2'>
        <Link to='/' 
        className='flex items-center gap-1 transition-all duration-300 hover:text-[#ff5252]'>
        <PiArrowBendDoubleUpRightBold className='text-[20px] font-bold'/>
         Delivery
        </Link>
        </li>

        <li className='text-[14px] w-full mb-2'>
        <Link to='/' 
        className='flex items-center gap-1 transition-all duration-300 hover:text-[#ff5252]'>
        <PiArrowBendDoubleUpRightBold className='text-[20px] font-bold'/>
         Legal Notice
        </Link>
        </li>

        <li className='text-[14px] w-full mb-2'>
        <Link to='/' 
        className='flex items-center gap-1 transition-all duration-300 hover:text-[#ff5252]'>
        <PiArrowBendDoubleUpRightBold className='text-[20px] font-bold'/>
          Terms And Condition Of Use
        </Link>
        </li>

        <li className='text-[14px] w-full mb-2'>
        <Link to='/' 
        className='flex items-center gap-1 transition-all duration-300 hover:text-[#ff5252]'>
        <PiArrowBendDoubleUpRightBold className='text-[20px] font-bold'/>
         About Us
        </Link>
        </li>

        <li className='text-[14px] w-full mb-2'>
        <Link to='/' 
        className='flex items-center gap-1 transition-all duration-300 hover:text-[#ff5252]'>
        <PiArrowBendDoubleUpRightBold className='text-[20px] font-bold'/>
         Secure Payment
        </Link>
        </li>

        <li className='text-[14px] w-full mb-2'>
        <Link to='/' 
        className='flex items-center gap-1 transition-all duration-300 hover:text-[#ff5252]'>
        <PiArrowBendDoubleUpRightBold className='text-[20px] font-bold'/>
          Login
        </Link>
        </li>
      </ul>
      </div> 

      </div>

      <div className="part2 w-full lg:w-[35%] flex pl-0 lg:pl-8 flex-col pr-8 mt-5 lg:mt-0">
      <h2 className='text-[20px] font-[600] mb-2 lg:mb-4'>Subscribe & Save</h2>
      <p className='text-[13px]'>Subscribe now and enjoy early access to sales, fresh collections, and member-only perks.</p>
      <form className='mt-5'>
       <input 
        type="text" 
        className='w-full h-[45px] border outline-none pl-4 pr-4 rounded-md focus:border-[#000]'
        placeholder='Your Email Addresh'/>
        <Button 
         className="!bg-[#ff5252] hover:!bg-[rgb(224,75,75)] !text-white w-full !font-semibold !text-[13px] !mt-3">
         SUBSCRIBE
         </Button>
         <FormControlLabel
         className='mt-3 lg:mt-0' 
         control={<Checkbox sx={{
         color: '#999',
         '&.Mui-checked': {
          color: '#ff5252',
        },
      }}/>} 
      label='I agree to the terms and conditions'/>
      </form>
      </div>
      </div>
     </div>
    </footer>

    <div className="bottomStrip border-t border-[rgba(0,0,0,0.1)] pt-3 pb-[100px] lg:pb-3 py-3 bg-white">
      <div className='w-[95%] m-auto flex items-center justify-between flex-col lg:flex-row gap-4 lg:gap-0'>
       <ul className='flex items-center gap-2'>
       <li>
        <Link to='/' target='_blank' 
        className='w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group transition-all duration-300 hover:bg-[#ff5252]'>
          <FaFacebook className='text-[15px] group-hover:text-white'/>
       </Link>
       </li>
       <li>
        <Link to='/' target='_blank' 
        className='w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group transition-all duration-300 hover:bg-[#ff5252]'>
          <FaTwitter className='text-[15px] group-hover:text-white'/>
       </Link>
       </li>
       <li>
        <Link to='/' target='_blank' 
        className='w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group transition-all duration-300 hover:bg-[#ff5252]'>
          <FaYoutube className='text-[15px] group-hover:text-white'/>
       </Link>
       </li>
       <li>
        <Link to='/' target='_blank' 
        className='w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group transition-all duration-300 hover:bg-[#ff5252]'>
          <FaInstagramSquare className='text-[15px] group-hover:text-white'/>
       </Link>
       </li>
       </ul>

       <p className="text-center text-sm text-gray-500 mt-6 mb-0">
       © 2025 - <span className="font-semibold text-[#ff5252]">EcommerceShop</span>. All rights reserved.
       </p>
     <div className='flex items-center'>
      <img src=".jpg" alt="payments image"/>
      </div>   
      </div>
    </div>

  {/* cart panel */}
  <Drawer
  open={context.openCartPanel}
  onClose={context.toggleCartPanel(false)} 
  anchor="right"
  className="cartPanel">
  <div className="flex items-center justify-between py-3 px-4 border-b border-[rgba(0,0,0,0.1)]">
    <h4 className="text-[18px] font-semibold">Shopping Cart ({context?.cartData?.length})</h4>
    <IoCloseSharp
      className="text-[22px] cursor-pointer hover:text-[#ff5252] transition-all duration-300"
      onClick={context.toggleCartPanel(false)}/>
    </div>
    {
     context?.cartData?.length!==0 ? <CartPanel data={context?.cartData}/> :
      <>
      <div className='flex items-center justify-center flex-col pt-10 gap-4'>
      <img 
      src='https://cdn-icons-png.flaticon.com/128/15106/15106109.png' 
      alt="empty-cart"
      className='w-[150px]'
       />
     <h4 className='text-[20px] font-[500]'>Your cart is currently empty</h4>
     <Button className='!bg-[#ff5252] hover:!bg-[#000]
     !text-white !font-semibold !text-[13px] !mt-4' onClick={context.toggleCartPanel(false)}>
      Continue Shopping</Button>  
     </div>
      </>
    }
  </Drawer>

   {/* Address panel */}
   <Drawer
    open={context.openAddressPanel}
    onClose={context.toggleAddressPanel(false)} 
    anchor="right"
    className="cartPanel">
    <div className="flex items-center justify-between py-3 px-4 border-b border-[rgba(0,0,0,0.1)]">
    <h4 className="text-[18px] font-semibold">{context?.addressMode === 'add' ? 'Add' : 'Edit'} Delivery Address</h4>
    <IoCloseSharp
     className="text-[22px] cursor-pointer hover:text-[#ff5252] transition-all duration-300"
     onClick={context.toggleAddressPanel(false)}/>
     </div>
     <AddAddress/>
     </Drawer>
         <Dialog
          open={context?.openProductDetailModal.open}
          fullWidth={context?.fullWidth}
          maxWidth={context?.maxWidth}
          onClose={context?.handleCloseProductDetailModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className='productDetailModal'>
            
          <DialogContent>
          <div className='flex items-center w-full productDetailModalContainer relative'>
            <Button className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000]
            !absolute top-[0px] right-[0px]'
            onClick={context?.handleCloseProductDetailModal}>
            <IoCloseSharp/>
            </Button>
             {
             context?.openProductDetailModal?.item?.length!==0 && 
              <>
           <div className="col1 w-[40%]">
             <Productzoom images={context?.openProductDetailModal?.item?.images}/>
              </div>
  
            <div className='col2 w-[60%] py-5 px-5'>
            <ProductDetailsComponent item={context?.openProductDetailModal?.item}/>
           </div>
           </>
             }
  
          </div>
          </DialogContent>
        </Dialog>

    </>
  )
}

export default Footer
