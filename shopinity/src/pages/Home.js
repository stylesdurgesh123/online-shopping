import React, { useContext, useEffect, useState } from 'react'
import HomeSlider from '../components/HomeSlider'
import CardSlider from '../components/CardSlider'
import { FaShippingFast } from "react-icons/fa";
import AdsBannerSlider from '../components/AdsBannerSlider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProductsSlider from '../components/ProductsSlider';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, FreeMode, Mousewheel } from 'swiper/modules';
import BlogItem from '../components/Blogitem';
import { fetchDataFromApi } from '../utlis/api';
import { MyContext } from '../App';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


function Home() {

  const [value, setValue] = React.useState(0);
  const [homeSlidesData,setHomeSlidesData] = useState([]);
  const [productsData,setAllProductsData] = useState([]);
  const [productFeatured,setProductFeatured] = useState([]);
  const [popularProductData,setPopularProductData]=useState([]);
  const [bannerV1Data,setBannerV1Data]=useState([]);
  const [blogData,setBlogData]=useState([]);

  const context=useContext(MyContext);

 /* useEffect(()=>{
    window.scrollTo(0,0)
  })*/

  useEffect(()=>{

   window.scrollTo(0,0);

   fetchDataFromApi('/api/homeSlides')
   .then((res)=>{
  setHomeSlidesData(res?.data);
   })
  fetchDataFromApi('/api/product/getAllProducts')
   .then((res)=>{
  setAllProductsData(res?.products);
   })
   fetchDataFromApi('/api/product/getProductFeatured')
   .then((res)=>{
  setProductFeatured(res?.products);
   })

  fetchDataFromApi('/api/bannerV1')
   .then((res)=>{
   setBannerV1Data(res?.data)
   }) 

  fetchDataFromApi('/api/blog')
   .then((res)=>{
   setBlogData(res?.blogs)
   })  
  },[]);


  useEffect(()=>{
   fetchDataFromApi('/api/product/getAllProducts')
   .then((res)=>{
   console.log(res);
   })
  },[]);

  useEffect(()=>{
  fetchDataFromApi(`/api/product/getAllProductsByCatId/${context?.catData[0]?._id}`)
   .then((res)=>{
  if(res?.error===false){
   setPopularProductData(res?.products)
  }
   })
  },[context?.catData])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const filterByCatId=(id)=>{
  fetchDataFromApi(`/api/product/getAllProductsByCatId/${id}`)
   .then((res)=>{
  if(res?.error===false){
   setPopularProductData(res?.products)
  }
   })
  }

  return (
    <>
    <div className='min-h-[28vh] lg:min-h-[65vh] relative'>
    {
     homeSlidesData?.length!==0 && <HomeSlider data={homeSlidesData}/> 
    }
    </div>
    {
     context?.catData?.length!==0 && <CardSlider data={context?.catData}/> 
    }

     <section className='bg-white py-8'>
      <div className='w-[95%] m-auto'>
      <div className='flex items-center justify-between flex-col lg:flex-row'>
       <div className='leftsection w-full lg:w-[40%]'>
       <h2 className='text-[16px] sm:text-[16px] md:text-[16px] lg:text-[22px] font-[600]'>Papulor Products</h2>
       <p className='text-[13px] sm:text-[13px] md:text-[13px] lg:text-[14px] font-[400]'>Do not miss the current offers until the end of March.</p>
       </div>

      <div className='rightsection w-full lg:w-[60%]'>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        >
       
        {
         context?.catData?.length!==0 && context?.catData?.map((catItem,index)=>{
          return (
           <Tab label={catItem?.name} onClick={()=>filterByCatId(catItem?._id)}/>
          )
         }) 
        }

      </Tabs>
      </div>
      </div>
       {
        popularProductData?.length!==0 && <ProductsSlider items={6} data={popularProductData}/>  
       }    
      </div>
     </section>
   
    <section className='py-0 lg:py-4 pt-0 lg:pt-8 pb-0 bg-white'>
      <div className='w-[95%] m-auto'> 
       <div className='w-full py-4 p-4 border-2 border-[#ff5252] rounded-md mb-10 flex
        items-center justify-center lg:justify-between flex-col lg:flex-row'>
        <div className='col1 flex items-center gap-4'>
        <FaShippingFast className='text-[30px] lg:text-[50px]'/>
        <span className='text-[20px] lg:text-[25px] font-[600] uppercase'>Free Shipping</span>
        </div>

        <div className='col2'>
         <p className='mb-0 font-[500] text-center'>Free Delivery Now On Your First Order and over $200</p>
       </div>
        <p className='font-bold text-[25px]'>Only $200*</p>
       </div>
       {
        bannerV1Data?.length!==0 && <AdsBannerSlider items={4} data={bannerV1Data}/>
       }
      </div>
    </section>

    <section className='py-5 bg-white pt-0'>
      <div className='w-[95%] m-auto'>
      <h2 className='text-[22px] font-[600]'>Latest Products</h2>
       {
        productsData?.length!==0 && <ProductsSlider items={6} data={productsData}/>  
       }
     
      <AdsBannerSlider items={4}/>
      </div>
    </section>

    <section className='py-5 bg-white pt-0'>
      <div className='w-[95%] m-auto'>
      <h2 className='text-[22px] font-[600]'>Featured Products</h2>
       {
        productFeatured?.length!==0 && <ProductsSlider items={6} data={productFeatured}/>  
       } 
      <AdsBannerSlider items={3}/>
      </div>
    </section>

     {
      blogData?.length!==0 && 
      <section className='blogSection py-5 pb-8 pt-0 bg-white'>
     <div className='w-[95%] m-auto'>
     <h2 className='text-[20px] font-[600] mb-4'>From The Blog</h2>
      <Swiper
       slidesPerView={4}
       spaceBetween={30}
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
       300: {
       slidesPerView: 1,
       spaceBetween: 10,
       },
       500: {
       slidesPerView: 2,
       spaceBetween: 10,
        },
       700: {
       slidesPerView: 3,
       spaceBetween: 10,
        },
       1100: {
       slidesPerView: 5,
       spaceBetween: 10,
       }, 
       }}
       className="blogSlider">
       {
      blogData?.map((item,index)=>{
      return (
       <SwiperSlide key={index}>
       <BlogItem item={item}/>
       </SwiperSlide>
        )
      })
      }
     </Swiper>
      </div>
      </section>  
    } 
    </>
  )
}

export default Home;
