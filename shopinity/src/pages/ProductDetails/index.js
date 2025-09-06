import React, { useEffect, useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useParams } from 'react-router-dom'; 
import Productzoom from '../../components/Productzoom';
import ProductDetailsComponent from '../../components/ProductDetailsComponent';
import { fetchDataFromApi } from '../../utlis/api';
import Review from './review';

function ProductDetails() {
 const [activeTab, setActiveTab] = useState(0);
 const [productData,setProductData]=useState(0);
 const [reviewCount,setReviewCount]=useState(0);

 const {id}=useParams(); 
 
 useEffect(()=>{
   fetchDataFromApi(`/api/user/getReview?productId=${id}`)
   .then((res) => {
    if (res?.error === false) {
        setReviewCount((res.review || []).length);
        }
      });
 },[reviewCount])
 
  useEffect(()=>{
  fetchDataFromApi(`/api/product/${id}`)
  .then((res)=>{
   if(res?.error===false){
    setProductData(res?.product)
   }
  })
 window.scrollTo(0,0);   
  },[id])

const gotoReviews=()=>{
  window.scrollTo({
  top: 400,
  behavior: 'smooth',
})
}

  return (
    <section className='py-5 pb-0 bg-gray-50'>
      {/* Breadcrumbs */}
      <div className='w-[95%] m-auto'>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" 
          className="transition-all duration-300 hover:text-[#ff5252] hover:underline">
            Home
          </Link>
          <Link to="/products" className="transition-all duration-300 hover:text-[#ff5252] hover:underline">
            Fashion
          </Link>
        </Breadcrumbs>
      </div>

      {/* Product Content */}
      <div className='w-[95%] m-auto flex gap-6 bg-white py-5'>
        {/* Image */}
        <div className="productZoomContainer w-[40%]">
         <Productzoom images={productData?.images}/>
        </div>

        {/* Details */}
        <div className="productContent w-[60%]">
        <ProductDetailsComponent item={productData} reviewCount={reviewCount}
        gotoReviews={gotoReviews}/>
        </div>
      </div>

      {/* Tabs and Content */}
      <div className='w-[95%] m-auto pt-10 bg-white'>
        {/* Tabs */}
        <div className='flex items-center gap-6 border-b border-gray-200 pb-3 mb-4'>
          <span
            className={`text-[17px] font-medium cursor-pointer hover:text-[#ff5252]
             transition-all ${activeTab === 0 && 'text-[#ff5252]'}`}
            onClick={() => setActiveTab(0)}>
            Description
          </span>
          <span
            className={`text-[17px] font-medium cursor-pointer
             hover:text-[#ff5252] transition-all ${activeTab === 1 && 'text-[#ff5252]'}`}
            onClick={() => setActiveTab(1)}>
            Reviews ({reviewCount})
          </span>
        </div>

        {/* Tab Contents */}
        {activeTab === 0 && (
          <div className='shadow-md w-full py-6 px-8 rounded-md text-[15px] text-gray-700 space-y-6'>
            {
              productData?.description
            }
          </div>
        )}
    {
     activeTab === 1 && productData?.length !== 0 && (
     <Review productId={productData?._id} setReviewCount={setReviewCount}
     />
    )
    }
      </div>
     </section>
   );
 }

export default ProductDetails;
