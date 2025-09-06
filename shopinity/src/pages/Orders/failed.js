import React from 'react'
import checked from '../../assets/cross.png'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function OrderFailed() {
  return (
    <section className='w-full p-10 py-8 lg:py-20 flex items-center justify-center flex-col gap-2'>
    <img src={checked} alt="checkedimage" width='70' className='w-[70px] sm:w-[120px]'/>
    <h1 className='mb-0 text-[20px] sm:text-[25px] font-[500]'>Your order is failed</h1>
    <p className='mb-0 text-center'>Your order is failed due to some reason.</p>
    <Link to='/'>
    <Button className='!text-sm !border-2 !border-solid !border-[#ff5252]
   !text-[#ff5252] hover:!bg-[#ff5252]
   hover:!text-white transition-all duration-300'>
    Back to Home 
    </Button>
    </Link>
    </section>
  )
}

export default OrderFailed;