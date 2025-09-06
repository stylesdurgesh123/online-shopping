import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import {Link} from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode } from 'swiper/modules';
import { MyContext } from '../../App';

function CardSlider(props) {

const context = useContext(MyContext);  

  return (
    <div className='CardSlider py-8 pt-2 lg:pt-4'>
      <div className='w-[95%] m-auto'>
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        navigation={context?.windowWidth < 992 ? false : true}
        modules={[Navigation,FreeMode]}
        freeMode={true}
        breakpoints={{
          300: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          650: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          992: {
            slidesPerView: 7,
            spaceBetween: 10,
          }, 
        }}
        className="mySwiper"
        >
        {
         props?.data?.map((cat,index)=>{
          return (
          <SwiperSlide key={index}>
          <Link to="/">
          <div className='item py-7 px-0 bg-white rounded-sm text-center flex items-center justify-center flex-col'>
          <img src={cat?.images[0]} alt="" className='w-[50px] lg:w-[80px] object-contain transition-transform duration-300 hover:scale-105'/>
          <h3 className='text-[14px] lg:text-[15px] font-[550] mt-3'>{cat?.name}</h3>
          </div>
          </Link>
        </SwiperSlide>     
           )
         })
         }
      </Swiper>
      </div>
    </div>
  )
}

export default CardSlider
