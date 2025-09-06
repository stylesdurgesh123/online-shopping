import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import Productsitems from '../Productsitems';

function ProductsSlider(props) {
  return (
    <div className='productsSlide py-5'>
        <Swiper
            slidesPerView={props.items}
            spaceBetween={10}
            navigation={true} 
            modules={[ Navigation]}
            className="mySwiper">
       <SwiperSlide>
        <Productsitems/>
       </SwiperSlide> 
        
       <SwiperSlide>
        <Productsitems/>
       </SwiperSlide> 
       <SwiperSlide>
        <Productsitems/>
       </SwiperSlide> 
       <SwiperSlide>
        <Productsitems/>
       </SwiperSlide> 
       <SwiperSlide>
        <Productsitems/>
       </SwiperSlide> 
       <SwiperSlide>
        <Productsitems/>
       </SwiperSlide> 
       <SwiperSlide>
        <Productsitems/>
       </SwiperSlide> 
       <SwiperSlide>
        <Productsitems/>
       </SwiperSlide> 
       <SwiperSlide>
        <Productsitems/>
       </SwiperSlide> 
       <SwiperSlide>
        <Productsitems/>
       </SwiperSlide> 
       <SwiperSlide>
        <Productsitems/>
       </SwiperSlide> 
       <SwiperSlide>
        <Productsitems/>
       </SwiperSlide> 

       </Swiper> 
    </div>
  )
}

export default ProductsSlider
