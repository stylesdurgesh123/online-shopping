import React, { useContext } from 'react'
import '../../App.css'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation,Autoplay } from 'swiper/modules';
import { MyContext } from '../../App';

function HomeSlider(props) {

const context = useContext(MyContext);  

  return (
     <div className='pb-0 lg:pb-5 pt-4 lg:pt-5 relative z-[99]'>
      <div className='w-[95%] m-auto'>
      <Swiper   
      spaceBetween={30} 
      loop={true}
      navigation={context?.windowWidth < 992 ? false : true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }} 
      modules={[Navigation,Autoplay]}
      className='sliderHome'
      >
       {
         props?.data?.length!==0 && props?.data?.map((item,index)=>{
      return (
        <SwiperSlide key={index}>
        {/*<div className="w-full h-[440px] md:h-[400px] lg:h-[485px] rounded-[20px] overflow-hidden">*/}
        <div className="item rounded-[10px] overflow-hidden">
         <img 
         src={item?.images[0]} 
         alt="bannerimg" 
         className="w-full object-cover object-center"
        />
        </div>  
    </SwiperSlide>
          )
         })
        }
  </Swiper>
      </div>
     </div> 
  )
}

export default HomeSlider
