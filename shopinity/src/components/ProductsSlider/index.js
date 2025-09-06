import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, FreeMode, Mousewheel } from 'swiper/modules';
import Productsitems from '../Productsitems';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { MyContext } from '../../App';

function ProductsSlider(props) {

const context = useContext(MyContext);

  return (
      <div className='productsSlide py-5'>
        <Swiper
         slidesPerView={props.items}
         spaceBetween={10}
         navigation={context?.windowWidth < 992 ? false : true}
         modules={[Navigation, FreeMode, Mousewheel]}
         mousewheel={{
         forceToAxis: true,  // only horizontal axis on sliding
         }}
         freeMode={true}
         breakpoints={{
         250: {
          slidesPerView: 1,
          spaceBetween: 10,
          },
          330: {
          slidesPerView: 2,
          spaceBetween: 10,
          },
          500: {
          slidesPerView: 3,
           spaceBetween: 10,
           },
          1100: {
          slidesPerView: 5,
            spaceBetween: 10,
           }, 
         }}
          className="mySwiper">
            {
             props?.data?.map((item,index)=>{
              return (
              <SwiperSlide key={index}>
              <Productsitems item={item}/>
              </SwiperSlide> 
              )
             })
            }
       </Swiper> 
    </div>
  )
}

export default ProductsSlider
