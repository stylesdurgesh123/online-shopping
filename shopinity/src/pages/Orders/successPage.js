import React from 'react'
import checked from '../../assets/checked.png'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function OrderSuccess() {
  return (
    <section className='w-full p-10 py-8 lg:py-20 flex items-center justify-center flex-col gap-2'>
    <img src={checked} alt="checkedimage" width='120' className='w-[80px] sm:w-[120px]'/>
    <h1 className='mb-0 text-[20px] sm:text-[25px] font-[500]'>Your order is placed</h1>
    <p className='mb-0 text-center'>Thank you for your payment.</p>
    <Link to='/'>
    <Button className='!text-sm !border-2 !border-solid !border-green-500
   !text-green-500 hover:!bg-green-500
   hover:!text-white transition-all duration-300'>
    Back to Home 
    </Button>
    </Link>
    </section>
  )
}

export default OrderSuccess;