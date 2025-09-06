import React, { useRef, useState, useEffect } from 'react'
import '../../App.css';
import { useParams } from 'react-router-dom';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import { Swiper,SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { fetchDataFromApi } from '../../utlis/api';
import { MdOutlineBrandingWatermark } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { GiWireframeGlobe } from "react-icons/gi";
import { SlSizeFullscreen } from "react-icons/sl";
import { MdReviews } from "react-icons/md";
import { MdUnpublished } from "react-icons/md";
import { FaWeightHanging } from "react-icons/fa";
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';

 function ProductDetails() {

  const [slideIndex,setSlideIndex]=useState(0);
  const [product,setProduct]=useState();
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef(); 

  const {id} = useParams();

  const goto = (index)=>{
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  }

  useEffect(()=>{
   fetchDataFromApi(`/api/product/${id}`) 
    .then((res)=>{
   if(res.error===false){
    setProduct(res.product);
   }
    })
  },[]);

  return (
    <>
     <div className='flex items-center justify-between px-2 py-0 mt-3'>
      <h2 className='text-[18px] font-[600]'>Products Details 
       </h2>
      </div> 
     <div className='productDetails flex gap-8'>
      <div className='w-[40%]'>
    {/*   {
       product && product.images && product.images.length > 0 &&  (
      <div className='flex gap-3'>
       <div className='slider w-[15%]'>
        <Swiper
        ref={zoomSliderSml}
        direction={'vertical'}
        slidesPerView={5}
        spaceBetween={0}
        navigation={true}
        modules={[Navigation]}
        className='zoomProductSliderThumbs h-[400px] overflow-hidden'>
          {
          product.images.map((item,index)=>{
           return(
          <SwiperSlide key={index}>
          <div className={`item rounded-md overflow-hidden cursor-pointer group 
          ${slideIndex === index ? 'opacity-1' : 'opacity-30'}`} onClick={()=>goto(index)}>
          <img 
          src={item}
          className='w-full' 
          />
         </div>
         </SwiperSlide>
            )
           })
          }

         {
         product.images.map((item,index)=>{
          return ( 
         <SwiperSlide key={index}>
        <div className={`item rounded-md overflow-hidden cursor-pointer group 
         ${slideIndex === 0 ? 'opacity-1' : 'opacity-30'}`} onClick={()=>goto(1)}>
         <img 
         src={item}
         className='w-full'
          />
         </div>
         </SwiperSlide>
          )
         })
        }
         </Swiper>
       </div>
      <div className='zoomContainer w-[85%] overflow-hidden rounded-md'>
      <Swiper
       ref={zoomSliderBig}
       slidesPerView={1}
       spaceBetween={0}
       navigation={false}
       modules={[Navigation]}
      className="zoomProductSliderMain h-[400px] overflow-hidden rounded-md">
       {
       product.images.map((item,index)=>{
        return (
        <SwiperSlide key={index}>
       <InnerImageZoom
      zoomType='hover'
      zoomScale={1}
      src={item}
      />
     </SwiperSlide>
        )
       })
     }

      {
       product.images.map((item,index)=>{
       return (
      <SwiperSlide key={index}>
      <InnerImageZoom
      zoomType='hover'
      zoomScale={1}
      src={item}
      />
      </SwiperSlide>
       )
       })  
      }
      </Swiper>
      </div>
      </div>
       )
       }*/}
       {
    product && product.images && product.images.length > 0 && (
    <div className='flex gap-3'>
      <div className='slider w-[15%]'>
        <Swiper
          ref={zoomSliderSml}
          direction='vertical'
          slidesPerView={5}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          className='zoomProductSliderThumbs h-[400px]'>
          {
            product.images.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`item rounded-md overflow-hidden cursor-pointer 
                    ${slideIndex === index ? 'opacity-100' : 'opacity-30'}`}
                    onClick={() => goto(index)}
                   >
                    <img src={item} className='w-full object-cover' />
                   </div>
                   </SwiperSlide>
                 ))
               }
            </Swiper>
          </div>

       {/* Big Image Zoom */}
       <div className='zoomContainer w-[85%] overflow-hidden rounded-md'>
            <Swiper
             ref={zoomSliderBig}
             slidesPerView={1}
             spaceBetween={0}
             navigation={false}
             modules={[Navigation]}
            className="zoomProductSliderMain h-[400px]">
            {
            product.images.map((item, index) => (
              <SwiperSlide key={index}>
                <InnerImageZoom
                  zoomType='hover'
                  zoomScale={1.5}
                  src={item}
                  className='w-full h-full object-contain'
                />
              </SwiperSlide>
             ))
             }
           </Swiper>
          </div>
        </div>
        )
        }
      </div>
     <div className='w-[60%]'>
      <h1 className='text-[25px] font-[500] mb-4'>{product?.name}</h1>
      <div className='flex items-center py-2'>
       <span className='w-[20%] font-[500] flex items-center gap-2'>
        <MdOutlineBrandingWatermark className='opacity-65'/> Brand : </span>
       <span>{product?.brand}</span>
      </div>
       <div className='flex items-center py-2'>
       <span className='w-[20%] font-[500] flex items-center gap-2'>
        <BiSolidCategoryAlt className='opacity-65'/> Category : </span>
       <span>{product?.catName}</span>
      </div>
       <div className='flex items-center py-2'>
       <span className='w-[20%] font-[500] flex items-center gap-2'>
        <GiWireframeGlobe className='opacity-65'/> RAM : </span>
       <div className='flex items-center gap-2'>
        {
       product?.productRam?.map((item,index)=>{
        return (
      <span className='inline-block p-1 shadow-sm bg-[#fff]
       text-[12px] font-[500]' key={index}>
       {item}</span>   
        )
       })
        }
       </div>
      </div>
       <div className='flex items-center py-2'>
       <span className='w-[20%] font-[500] flex items-center gap-2'>
       <SlSizeFullscreen className='opacity-65'/> Size : </span>
       <div className='flex items-center gap-2'>
        {
       product?.size?.map((item,index)=>{
        return (
      <span className='inline-block p-1 shadow-sm bg-[#fff]
       text-[12px] font-[500]' key={index}>
       {item}</span>   
        )
       })
        }
       </div>
      </div>
       <div className='flex items-center py-2'>
       <span className='w-[20%] font-[500] flex items-center gap-2'>
       <FaWeightHanging className='opacity-65'/>Weight : </span>
       <div className='flex items-center gap-2'>
        {
       product?.productWeight?.map((item,index)=>{
        return (
      <span className='inline-block p-1 shadow-sm bg-[#fff]
       text-[12px] font-[500]' key={index}>
       {item}</span>   
        )
       })
        }
       </div>
      </div>
       <div className='flex items-center py-2'>
       <span className='w-[20%] font-[500] flex items-center gap-2'>
        <MdReviews className='opacity-65'/> Review : </span>
       <span>{product?.rating}</span>
      </div>
       <div className='flex items-center py-2'>
       <span className='w-[20%] font-[500] flex items-center gap-2'>
        <MdUnpublished className='opacity-65'/> Published : </span>
       <span>{product?.dateCreated?.split('T')[0]}</span> 
      </div>
       <h2 className='text-[25px] mb-3 font-[500]'>Product Description</h2>
     {
      product?.description && <p className='text-[15px]'>{product?.description}</p>
     }
    </div>
     </div>

   <h2 className='text-[20px] font-[500]'>Customer Reviews</h2>
    <div className='reviewsWrap mt-3'>
      <div className='reviews w-full h-auto p-4 mb-3 bg-white shadow-md rounded-sm flex items-center justify-between'>
      <div className='flex items-center gap-8'>
       <div className='img w-[85px] h-[85px] rounded-full overflow-hidden'>
       <img src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
        alt="" className='w-full h-full object-cover'/>
       </div>
       <div className="info w-[80%]">
       <div className='flex items-center justify-between'>
       <h4 className='text-[16px] font-[500]'> Durgesh Yadav</h4>
       <Rating name="read-only" value={5} readOnly size='small'/>
        </div>
       <span className='text-[13px]'>2025-06-24</span>
       <p className='text-[13px] mt-2'>Lorem Ipsum is simply dummy text of the
         printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took 
          a galley of type and scrambled it to make a type specimen book. It has 
          survived not only five centuries, but also the leap into electronic 
          typesetting, remaining essentially unchanged.
          </p>
       </div>
      </div>
      </div>
         <div className='reviews w-full h-auto p-4 mb-3 bg-white shadow-md rounded-sm flex items-center justify-between'>
      <div className='flex items-center gap-8'>
       <div className='img w-[85px] h-[85px] rounded-full overflow-hidden'>
       <img src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
        alt="" className='w-full h-full object-cover'/>
       </div>
       <div className="info w-[80%]">
       <div className='flex items-center justify-between'>
       <h4 className='text-[16px] font-[500]'> Durgesh Yadav</h4>
       <Rating name="read-only" value={5} readOnly size='small'/>
        </div>
       <span className='text-[13px]'>2025-06-24</span>
       <p className='text-[13px] mt-2'>Lorem Ipsum is simply dummy text of the
         printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took 
          a galley of type and scrambled it to make a type specimen book. It has 
          survived not only five centuries, but also the leap into electronic 
          typesetting, remaining essentially unchanged.
          </p>
       </div>
      </div>
      </div>
         <div className='reviews w-full h-auto p-4 mb-3 bg-white shadow-md rounded-sm flex items-center justify-between'>
      <div className='flex items-center gap-8'>
       <div className='img w-[85px] h-[85px] rounded-full overflow-hidden'>
       <img src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
        alt="" className='w-full h-full object-cover'/>
       </div>
       <div className="info w-[80%]">
       <div className='flex items-center justify-between'>
       <h4 className='text-[16px] font-[500]'> Durgesh Yadav</h4>
       <Rating name="read-only" value={5} readOnly size='small'/>
        </div>
       <span className='text-[13px]'>2025-06-24</span>
       <p className='text-[13px] mt-2'>Lorem Ipsum is simply dummy text of the
         printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took 
          a galley of type and scrambled it to make a type specimen book. It has 
          survived not only five centuries, but also the leap into electronic 
          typesetting, remaining essentially unchanged.
          </p>
       </div>
      </div>
      </div>
    </div>
   </>
  )
 }

 export default ProductDetails;
