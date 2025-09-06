import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation} from 'swiper/modules';
import { CiGift } from "react-icons/ci";
import { IoStatsChart } from "react-icons/io5";
import { FiPieChart } from "react-icons/fi";
import { BsBank } from "react-icons/bs";
import { TbBrandProducthunt } from "react-icons/tb";
import { MyContext } from '../../App';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode } from 'swiper/modules';

function DashboardBoxes() {

const context = useContext(MyContext);

  return (
        <>
       <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={context?.windowWidth < 992 ? false : true}
        modules={[Navigation,FreeMode]}
        freeMode={true}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          650: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 10,
          }, 
        }}
        className="DashboardBoxesSlider">
        <SwiperSlide>
         <div className='box bg-blue-600 p-5 cursor-pointer transition-all duration-300 hover:bg-blue-500 rounded-md border border-[rgba(0,0,0,0.1)]
         flex items-center gap-4'>
            <CiGift className='text-[50px] text-[#fff]'/>
         <div className="info w-[70%]">
          <h3 className='text-[#fff]'>New Orders</h3>
          <b className='text-[#fff]'>1,390</b>
         </div>
         <IoStatsChart className='text-[50px] text-[#fff]'/>
         </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className='box bg-[#10b981] p-5 cursor-pointer transition-all duration-300 hover:bg-green-500 rounded-md border border-[rgba(0,0,0,0.1)]
         flex items-center gap-4'>
         <FiPieChart className='text-[50px] text-[#fff]'/>
         <div className="info w-[70%]">
          <h3 className='text-[#fff]'>Sales</h3>
          <b className='text-[#fff]'>$57,890</b>
         </div>
         <IoStatsChart className='text-[50px] text-[#fff]'/>
         </div>
        </SwiperSlide>
        <SwiperSlide>
         <div className='box bg-red-500 p-5 cursor-pointer transition-all duration-300 hover:bg-red-600 rounded-md border border-[rgba(0,0,0,0.1)]
         flex items-center gap-4'>
          <BsBank className='text-[40px] text-[#fff]'/>
         <div className="info w-[70%]">
          <h3 className='text-[#fff]'>Reveneu</h3>
          <b className='text-[#fff]'>$12,390</b>
         </div>
         <IoStatsChart className='text-[50px] text-[#fff]'/>
         </div>
        </SwiperSlide>
        <SwiperSlide>
         <div className='box bg-indigo-600 p-5 cursor-pointer transition-all duration-300 hover:bg-indigo-500 rounded-md border border-[rgba(0,0,0,0.1)]
         flex items-center gap-4'>
         <TbBrandProducthunt className='text-[#fff] text-[45px]'/>
         <div className="info w-[70%]">
          <h3 className='text-[#fff]'>Total Product</h3>
          <b className='text-[#fff]'>1,390</b>
         </div>
         <IoStatsChart className='text-[50px] text-[#fff]'/>
         </div>
        </SwiperSlide>
        </Swiper>
    </>
  )
}

export default DashboardBoxes;
