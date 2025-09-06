import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from "react-icons/fa";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MyContext } from '../../App';
import { fetchDataFromApi, postData } from '../../utlis/api';
import CircularProgress from '@mui/material/CircularProgress';

function AddSubCategory() {

  const context=useContext(MyContext);

  const [isLoading,setIsLoading]=useState(false);
  const [isLoading2,setIsLoading2]=useState(false);
  const [productCat, setProductCat] =useState('');
  const [productCat2, setProductCat2] =useState('');
  const [formFields,setFormFields]=useState({
      name:"",
      parentCatName: null,
      parentId: null
      });

    const [formFields2,setFormFields2]=useState({
      name:"",
      parentCatName: null,
      parentId: null
      });

       useEffect(()=>{
        fetchDataFromApi('/api/category')
        .then((res)=>{
        context?.setCartData(res?.data);
        })
       },[context?.isOpenFullScreenPanel]);   
  
  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    formFields.parentId=event.target.value;
  };

    const handleChangeProductCat2 = (event) => {
    setProductCat2(event.target.value);
    formFields2.parentId=event.target.value;
  };
  
 const selectCatFun=(catName)=>{
// formFields.parentCatName=catName.target.value;
  formFields.parentCatName = catName;  
 }

  const selectCatFun2=(catName)=>{
// formFields.parentCatName=catName.target.value;
  formFields2.parentCatName = catName;  
 }

 const onChangeInput = (e) => {
  const { name, value } = e.target;

  const catId=productCat
  setProductCat(catId)

   setFormFields(()=>{
    return {
      ...formFields,
      [name]:value
     }
    })
  };

  const onChangeInput2 = (e) => {
  const { name, value } = e.target;

  const catId=productCat2
  setProductCat2(catId)

   setFormFields2(()=>{
    return {
      ...formFields2,
      [name]:value
     }
    })
  };

   const handleSubmit=(e)=>{
    e.preventDefault();

    console.log(formFields);

    setIsLoading(true);
   if(formFields.name===''){
     context.openAlertBox('error','Please enter category name');
      setIsLoading(false);
       return false
     }
    if(productCat===''){
     context.openAlertBox('error','Please select parent category');
      setIsLoading(false);
      return false
     }
  
    postData('/api/category/create',formFields,{withCredentials: true})
     .then((res)=>{
      console.log(res);
      context?.fetchCategories();
      setIsLoading(false)
      setTimeout(() => {
      context.setIsOpenFullScreenPanel({
      open:false
      });    
      }, 1000);
     });
   }

   
   const handleSubmit2=(e)=>{
    e.preventDefault();

    console.log(formFields2);

    setIsLoading2(true);
   if(formFields2.name===''){
     context.openAlertBox('error','Please enter category name');
      setIsLoading2(false);
       return false
     }
    if(productCat2===''){
     context.openAlertBox('error','Please select parent category');
      setIsLoading2(false);
      return false
     }
  
    postData('/api/category/create',formFields2,{withCredentials: true})
     .then((res)=>{
      console.log(res);
      context?.fetchCategories();
      setIsLoading2(false)
      setTimeout(() => {
      context.setIsOpenFullScreenPanel({
      open:false
      });     
      }, 1000);
     });
   }

  return (
    <section className='p-5 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-10'>
      <form className='form py-1 p-1 md:p-8 md:py-1' onSubmit={handleSubmit}>
        <h4 className='font-[600]'>Add Sub Category</h4>
      <div className='grid grid-cols-1 md:grid-cols-1 mb-3 gap-5'>
      <div className='col'>
        <h3 className='text-[14px] font-[500] mb-1'>Product Category</h3>
        <Select
         labelId="demo-simple-select-label"
          id="ProductCatDrop"
          size='small'
          className='w-full'
          value={productCat}
          label="Category"
          onChange={handleChangeProductCat}>
           {
            context?.cartData?.length!==0 && context?.cartData?.map((item,index)=>{
              return (
           <MenuItem key={index} value={item?._id} onClick={()=>selectCatFun(item?.name)}>{item?.name}</MenuItem>
              )
            })
           }
        </Select>   
       </div>
       <div className='col'>
        <h3 className='text-[14px] font-[500] mb-1'>Sub Category Name</h3>
        <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.1)]
        focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounde-sm p-3 text-sm'
        name='name'
        value={formFields.name}   
        onChange={onChangeInput}
        />
       </div>
       </div>  
       <br/>
        <div className='w-[250px]'>
        <Button type='submit' className='!bg-blue-600 !text-white !font-[600] !px-4 w-full flex gap-1'>
          {
            isLoading === true ? <CircularProgress color="inherit"/> 
             :
            <>
          <FaCloudUploadAlt className='text-[25px]'/> Publish and View
           </>
           }
        </Button>
        </div>
        </form>

      <form className='form py-1 p-1 md:p-8 md:py-1' onSubmit={handleSubmit2}>
       <h4 className='font-[600]'>Add Third Lavel Category</h4>
      <div className='grid grid-cols-1 md:grid-cols-1 mb-3 gap-5'>
      <div className='col'>
        <h3 className='text-[14px] font-[500] mb-1'>Product Category</h3>
        <Select
         labelId="demo-simple-select-label"
          id="ProductCatDrop"
          size='small'
          className='w-full'
          value={productCat2}
          label="Category"
          onChange={handleChangeProductCat2}>
           {
            context?.cartData?.length !==0 && context?.cartData?.map((item,index)=>{
             return (
             item?.children?.length !==0 && item?.children?.map((item2,index)=>{
              return (
            <MenuItem key={index} value={item2?._id} 
            onClick={()=>selectCatFun2(item2?.name)}>
              {item2?.name}
            </MenuItem>
              )
             }) 
             )
            })
           }
        </Select>   
       </div>
       <div className='col'>
        <h3 className='text-[14px] font-[500] mb-1'>Sub Category Name</h3>
        <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.1)]
        focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounde-sm p-3 text-sm'
        name='name'
        value={formFields2.name}   
        onChange={onChangeInput2}
        />
       </div>
       </div>  
       <br/>
        <div className='w-[250px]'>
        <Button type='submit' className='!bg-blue-600 !text-white !font-[600] !px-4 w-full flex gap-1'>
          {
            isLoading2 === true ? <CircularProgress color="inherit"/> 
             :
            <>
          <FaCloudUploadAlt className='text-[25px]'/> Publish and View
           </>
           }
        </Button>
        </div>
        </form>
    </section>
  )
}

export default AddSubCategory;

