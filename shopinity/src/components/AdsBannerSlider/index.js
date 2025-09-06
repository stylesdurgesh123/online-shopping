import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, FreeMode, Mousewheel } from 'swiper/modules';
import BannerBox from '../Bannerbox';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { MyContext } from '../../App';

function AdsBannerSlider(props) {

const context = useContext(MyContext);

  return (
    <div className='py-2 lg:py-5 w-full'>
     <Swiper
        slidesPerView={props.items}
        spaceBetween={10}
        navigation={context?.windowWidth < 992 ? false : true}
        modules={[Navigation, FreeMode, Mousewheel]}
        freeMode={true}
        mousewheel={{
        forceToAxis: true,  // only horizontal axis on sliding
        }}
        breakpoints={{
        300: {
        slidesPerView: 1,
        spaceBetween: 5,
         },
        450: {
        slidesPerView: 2,
        spaceBetween: 5,
        },
        750: {
        slidesPerView: 3,
        spaceBetween: 5,
        },
        1100: {
        slidesPerView: 4,
        spaceBetween: 5,
          }, 
        }}
        className="mySwiper">
        {
        props?.data?.map((item,index)=>{
          return (
         <SwiperSlide key={index}>
          <BannerBox img={item?.images[0]} link={'/'} item={item}/>
         </SwiperSlide>
          )
        })
        }
      </Swiper>
    </div>
  )
}

export default AdsBannerSlider

