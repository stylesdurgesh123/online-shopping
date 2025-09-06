import React, { useState } from 'react'
import './style.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Collapse} from 'react-collapse';
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Rating from '@mui/material/Rating';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { postData } from '../../utlis/api';

function Sidebar(props) {

    const [isOpenCategoryFilter,setIsOpenCategoryFilter]=useState(true);
    const [price, setPrice] = useState([0,60000]);

    const [filters,setFilters]=useState({
     catId:[],
     subCatId:[],
     thirdSubCatId:[],
     minPrice:'',
     maxPrice:'',
     rating:'',
     page:1,
     limit:25
    })

 const context=useContext(MyContext);
 
 const location=useLocation();

 const handlePriceChange = (event, newValue) => {
   setPrice(newValue);
    };
  
  useEffect(() => {
    console.log('updated filters',filters)
 }, [filters]);

 const handleCheckBoxChange = (field, value) => {

 context?.setSearchData([]);

  setFilters(prev => {
    const currentValues = prev[field] || [];
    const isChecked = currentValues.includes(value);
    const updatedValues = isChecked
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];

    const updatedFilters = {
      ...prev,
      [field]: updatedValues,
      page: 1
    };

    // Reset other filters if main category is changed
    if (field === 'catId') {
      updatedFilters.subCatId = [];
      updatedFilters.thirdSubCatId = [];
    }

    return updatedFilters;
    });
  };

  useEffect(() => {
  const url=window.location.href;
  const queryParameters=new URLSearchParams(location.search);

  if(url.includes('catId')){
  const categoryId = queryParameters.get('catId');  
  const catArr = [];
   catArr.push(categoryId);
   filters.catId = catArr; 
   filters.subCatId = []; 
   filters.thirdSubCatId = []; 
   filters.rating = [];
   context?.setSearchData([]);
  }

 if(url.includes('subCatId')){
  const subCategoryId = queryParameters.get('subCatId');  
  const subCatArr = [];
   subCatArr.push(subCategoryId);
   filters.subCatId = subCatArr; 
   filters.catId = []; 
   filters.thirdSubCatId = []; 
   filters.rating = [];
   context?.setSearchData([]);
  }

 if(url.includes('thirdSubCatId')){
  const thirdSubCategoryId = queryParameters.get('thirdSubCatId');  
  const thirdSubCatArr = [];
   thirdSubCatArr.push(thirdSubCategoryId);
   filters.thirdSubCatId = thirdSubCatArr; 
   filters.subCatId = []; 
   filters.catId = []; 
   filters.rating = [];
   context?.setSearchData([]);
  } 

 filters.page=1;
 
setTimeout(() => {
 filterData();
 }, 500);
}, [location]);
  
 const filterData=()=>{
  props.setIsLoading(true);

  if(context?.searchData?.products?.length>0){
   props.setProductData(context?.searchData); 
   props.setIsLoading(false);
   props.setTotalPages(context?.searchData?.totalPages);
   window.scrollTo(0,0);
  }else{
  postData(`/api/product/filters`, filters)
   .then((res)=>{
    props.setProductData(res);
    props.setIsLoading(false);
    props.setTotalPages(res?.totalPages);
     window.scrollTo(0,0);
   })
  }
 }

 useEffect(()=>{
  filters.page = props.page;
  filterData();
 },[filters, props.page])

  useEffect(()=>{
   setFilters((prev)=>({
    ...prev,
    minPrice:price[0],
    maxPrice:price[1]
   }))
 },[price])

  return (
    <aside className='sidebar py-5 sticky top-[130px] z-[50]'>
    <div className='box'>
     <h3 className='mb-3 text-[16px] font-[600] flex items-center pr-4'>Shop by Categories
      <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]' 
      onClick={()=>setIsOpenCategoryFilter(!isOpenCategoryFilter)}>
        {
          isOpenCategoryFilter === true ? <FaAngleUp/> : <FaAngleDown/>
        }
        </Button>
     </h3>
    <Collapse isOpened={isOpenCategoryFilter}>
     <div className='scroll px-4 relative -left-[10px]'>
      {
     context?.catData?.length!==0 && context?.catData?.map((item,index)=>{
      return (
     <FormControlLabel
       key={index}
       value={item?._id}
       control={<Checkbox size='small'/>}
       checked={filters?.catId?.includes(item?._id)}
       label={item?.name}
       onChange={()=>handleCheckBoxChange('catId', item?._id)} 
       className='w-full'
       />
        )
       })
      }
    </div>
     </Collapse>
    </div>
    <div className='box mt-4'>
     <h3 className='mb-3 text-[16px] font-[600] flex items-center pr-4'>
      Filter By Price
     </h3>
    <div className='px-4'>
    <Slider
      className='!w-[130px] !h-[10px]'
      getAriaLabel={() => 'Price range'}
      value={price}
      onChange={handlePriceChange}
      onInput={setPrice}
      min={0}
      max={60000}
      step={5}
      valueLabelDisplay="auto"/>
    </div>
    <div className='flex pt-4 pb-2 priceRange'>
    <span className='text-[13px]'>
      From: <strong className='text-dark'>Rs: {price[0]}</strong>
      </span> 
      <span className='ml-auto text-[13px]'>
        From: <strong className='text-dark'>Rs: {price[1]}</strong>
        </span>  
    </div>
    </div>
    <div className='box mt-4'>
     <h3 className='mb-3 text-[16px] font-[600] flex items-center pr-4'>
      Filter By Rating
     </h3>
     <div className='flex items-center'>
      <FormControlLabel
       value={5}
       control={<Checkbox size='small'/>}
       checked={filters?.rating?.includes(5)}
       onChange={()=>handleCheckBoxChange('rating', 5)} 
       /> 
       <Rating 
       name='rating'
       value={5}
       size='small'
       readOnly
       />
     </div>
      <div className='flex items-center'>
      <FormControlLabel
       value={4}
       control={<Checkbox size='small'/>}
       checked={filters?.rating?.includes(4)}
       onChange={()=>handleCheckBoxChange('rating', 4)} 
       /> 
       <Rating 
       name='rating'
       value={4}
       size='small'
       readOnly
       />
     </div>
     <div className='flex items-center'>
      <FormControlLabel
       value={3}
       control={<Checkbox size='small'/>}
       checked={filters?.rating?.includes(3)}
       onChange={()=>handleCheckBoxChange('rating', 3)} 
       /> 
       <Rating 
       name='rating'
       value={3}
       size='small'
       readOnly
       />
     </div>
     <div className='flex items-center'>
      <FormControlLabel
       value={2}
       control={<Checkbox size='small'/>}
       checked={filters?.rating?.includes(2)}
       onChange={()=>handleCheckBoxChange('rating', 2)} 
       /> 
       <Rating 
       name='rating'
       value={2}
       size='small'
       readOnly
       />
     </div>
    </div>
    </aside>
  )
}

export default Sidebar;











