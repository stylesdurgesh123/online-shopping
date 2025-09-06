import React, { useContext, useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import UploadBox from '../../Components/UploadBox';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import { deleteImage, fetchDataFromApi, postData} from '../../utlis/api';
import CircularProgress from '@mui/material/CircularProgress';

function AddProduct() {

  const [isLoading,setIsLoading]=useState(false);
  const [productCat, setProductCat] =useState('');
  const [productSubCat, setProducSubtCat] =useState('');
  const [productFeatured, setProductFeatured] =useState('');
  const [productRams, setProductRams] =useState([]);
  const [productRamsData, setProductRamsData] =useState([]);
  const [productWeight, setProductWeight] =useState([]);
  const [productWeightData, setProductWeightData] =useState([]);
  const [productSize, setProductSize] =useState([]);
  const [productSizeData, setProductSizeData] =useState([]);
  const [previews,setPreviews]=useState([]);
  const [productThirdLavelCat,setProductThirdLavelCat]=useState('');
  const [formFields,setFormFields]=useState({
      name:"",
      images:[],
      description:"",
      brand:"",
      price:"",
      oldPrice:"",
      category:'',
      catName:"",
      catId:"",
      subCatId:"",
      subCat:"",
      thirdSubCat:"",
      thirdSubCatId:"",
      countInStock:"",
      rating:"",
      isFeatured:false,
      discount:"",
      productRam:[],
      size:"",
      productWeight:[], 
    });
    
  const navigate=useNavigate();   
  const context=useContext(MyContext);

  useEffect(()=>{
   fetchDataFromApi(`/api/product/productRAMS/get`)
   .then((res)=>{
   if(res?.error===false){
    setProductRamsData(res?.data)
   }
   })

   fetchDataFromApi(`/api/product/productWEIGHT/get`)
   .then((res)=>{
   if(res?.error===false){
    setProductWeightData(res?.data)
   }
   })

   fetchDataFromApi(`/api/product/productSIZE/get`)
   .then((res)=>{
   if(res?.error===false){
    setProductSizeData(res?.data)
   }
   })
  },[]);
 
  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    formFields.catId=event.target.value;
    formFields.category=event.target.value;
  };

 const selectCatByName=(name)=>{
  formFields.catName=name;
 }

  const handleChangeProductSubCat = (event) => {
    setProducSubtCat(event.target.value);
    formFields.subCatId=event.target.value;
  };

 const selectSubCatByName=(name)=>{
    formFields.subCat=name;
 }

 const handleChangeProductThirdLavelCat=(event) => {
    setProductThirdLavelCat(event.target.value);
    formFields.thirdSubCatId=event.target.value;
  };

  const selectSubCatByThirdLavel=(name)=>{
    formFields.thirdSubCat=name;
 }

  const handleChangeProductFeatured = (event) => {
    setProductFeatured(event.target.value);
    formFields.isFeatured=event.target.value;
  };

  const handleChangeProductRams = (event) => {
    const { 
      target:{value},
    }=event;
    setProductRams(typeof value==="string"?value?.split(","):value);
    formFields.productRam=value;
  };

  const handleChangeProductWeight = (event) => {
     const { 
      target:{value},
    }=event;
   setProductWeight(typeof value==="string"?value?.split(","):value);
    formFields.productWeight=value;
  };


  const handleChangeProductSize = (event) => {
     const { 
      target:{value},
    }=event;
   setProductSize(typeof value==="string"?value?.split(","):value);
    formFields.size=value;
  };

 const onChangeInput = (e) => {
  const { name, value } = e.target;
   setFormFields(()=>{
    return {
      ...formFields,
      [name]:value
    }
   })
 };

 const onChangeRating=(e)=>{
   setFormFields(()=>{
    return {
    ...formFields,
    rating:e.target.value
    }
   })
 }

  const setPreviewsFun=(previewsArr)=>{
    setPreviews(previewsArr);
    formFields.images=previewsArr
     }

   const removeImg=(image,index)=>{
    var imageArr=[];
    imageArr=previews;
   deleteImage(`/api/category/deleteImage?img=${image}`).then((res)=>{
    imageArr.splice(index,1);
    setPreviews([]);
    setTimeout(()=>{
    setPreviews(imageArr) 
    setFormFields(() => ({
    ...previews,
    images: imageArr
    })) 
    },100);
   });
  }

 const handleSubmit=(e)=>{
  e.preventDefault(0);

  if(formFields.name===''){
   context?.openAlertBox('error','Please enter product name');
   return false;
  }
  
   if(formFields.description===''){
   context?.openAlertBox('error','Please enter product description');
   return false;
  }

  if(formFields.catName===''){
   context?.openAlertBox('error','Please enter product Category Name');
   return false;
  }

  if(formFields.subCat===''){
   context?.openAlertBox('error','Please enter product Sub Category');
   return false;
  }

   if(formFields.price===''){
   context?.openAlertBox('error','Please enter product price');
   return false;
  }

  
  if(formFields.oldPrice===''){
   context?.openAlertBox('error','Please enter product OldPrice');
   return false;
  }

   if(formFields.countInStock===''){
   context?.openAlertBox('error','Please enter product CountInStock');
   return false;
   }

  if(formFields.brand===''){
   context?.openAlertBox('error','Please enter product brand');
   return false;
  }

  if(formFields.discount===''){
   context?.openAlertBox('error','Please enter product Discount');
   return false;
   }

  if(formFields.catId===''){
   context?.openAlertBox('error','Please enter product CatId');
   return false;
  }
 
  if(formFields.rating===''){
   context?.openAlertBox('error','Please enter product Rating');
   return false;
   }

  if(previews?.length===0){
   context?.openAlertBox('error','Please select product images');
   return false;
  }

  setIsLoading(true)
  postData('/api/product/create',formFields,{withCredentials: true})
  .then((res)=>{
  if(res?.error===false){
   context?.openAlertBox('success',res?.message);
   setTimeout(()=>{
   setIsLoading(false)
    context.setIsOpenFullScreenPanel({
    open:false
    }) 
   navigate('/products')
   })
  } else{
   setIsLoading(false)
   context?.openAlertBox('error',res?.message);
  }
  })
 }

  return (
    <section className='p-5 bg-gray-50'>
      <form className='form p-1 md:p-8 py-1' onSubmit={handleSubmit}>
        <div className='scroll max-h-[75vh] overflow-x-scroll pr-4'>
        <div className='grid grid-cols-1 mb-3'>
       <div className='col'>
        <h3 className='text-[14px] font-[500] mb-1'>Product Name</h3>
        <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.1)]
        focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounde-sm p-3 text-sm'
        name='name' value={formFields.name} onChange={onChangeInput}/>
       </div>
       </div>
       <div className='grid grid-cols-1 mb-3'>
       <div className='col'>
        <h3 className='text-[14px] font-[500] mb-1'>Product Description</h3>
        <textarea type="text" className='w-full h-[140px] border border-[rgba(0,0,0,0.1)]
        focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounde-sm p-3 text-sm'
        name='description' value={formFields.description} onChange={onChangeInput}/>
       </div>
       </div>
       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-3 gap-4'>
       <div className='col'>
        <h3 className='text-[14px] font-[500] mb-1'>Product Category</h3>
         {
         context?.cartData?.length !==0 &&
          <Select
          className='w-full'
          labelId="demo-simple-select-label"
          id="ProductCatDrop"
          size='small'
          value={productCat}
          label="Category"
          onChange={handleChangeProductCat}>

           {
           context?.cartData?.map((cat,index)=>{
            return(
            <MenuItem value={cat?._id} onClick={()=>selectCatByName(cat?.name)}>
              {cat?.name}
           </MenuItem>
            )
           })
           }
        </Select> 
           }
       </div>
       <div className='col'>
        <h3 className='text-[14px] font-[500] mb-1'>Product Sub Category</h3>
            {
         context?.cartData?.length !==0 &&
          <Select
          className='w-full'
          labelId="demo-simple-select-label"
          id="ProductCatDrop"
          size='small'
          value={productSubCat}
          label="Sub Category"
          onChange={handleChangeProductSubCat}>
           {
           context?.cartData?.map((cat,index)=>{
            return(
           cat?.children?.length !==0 && cat?.children?.map((subCat,index_)=>{
            return (
           <MenuItem value={subCat?._id} onClick={()=>selectSubCatByName(subCat?.name)}>
            {subCat?.name}
            </MenuItem>
            )
          })
            )
           })
           }
        </Select> 
           }
       </div>

       <div className='col'>
        <h3 className='text-[14px] font-[500] mb-1'>Product Third level Category</h3>
            {
         context?.cartData?.length !==0 &&
          <Select
          className='w-full'
          labelId="demo-simple-select-label"
          id="ProductCatDrop"
          size='small'
          value={productThirdLavelCat}
          label="Sub Category"
          onChange={handleChangeProductThirdLavelCat}>
           {
           context?.cartData?.map((cat)=>{
            return(
           cat?.children?.length !==0 && cat?.children?.map((subCat)=>{
            return (
           subCat?.children?.length !==0 && subCat?.children?.map((thirdlevelCat,index_)=>{
            return(
             <MenuItem value={thirdlevelCat?._id} key={index_}
             onClick={()=>selectSubCatByThirdLavel(thirdlevelCat?.name)}>
              {thirdlevelCat?.name}
              </MenuItem>
             )
            }) 
            )
             })
            )
           })
           }
        </Select> 
           }
       </div>
       <div className='col'>
        <h3 className='text-[14px] font-[500] mb-1'>Product Price</h3>
        <input type="number" className='w-full h-[40px] border border-[rgba(0,0,0,0.1)]
        focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounde-sm p-3 text-sm'
        name='price' value={formFields.price} onChange={onChangeInput}/>
       </div>
       <div className='col'>
        <h3 className='text-[14px] font-[500] mb-1'>Product Old Price</h3>
        <input type="number" className='w-full h-[40px] border border-[rgba(0,0,0,0.1)]
        focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounde-sm p-3 text-sm'
        name='oldPrice' value={formFields.oldPrice} onChange={onChangeInput}/>
       </div>
        <div className='col'>
        <h3 className='text-[14px] font-[500] mb-1'>Is Featured?</h3>
        <Select
         className='w-full'
          labelId="demo-simple-select-label"
          id="ProductCatDrop"
          size='small'
          value={productFeatured}
          label="Category"
          onChange={handleChangeProductFeatured}>
          <MenuItem value={true}>True</MenuItem>
          <MenuItem value={false}>False</MenuItem>
        </Select>
       </div>
        <div className='col'>
        <h3 className='text-[14px] font-[500] mb-1'>Product Stock</h3>
        <input type="number" className='w-full h-[40px] border border-[rgba(0,0,0,0.1)]
        focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounde-sm p-3 text-sm'
        name='countInStock' value={formFields.countInStock} onChange={onChangeInput}/>
       </div>
       <div className='col'>
        <h3 className='text-[14px] font-[500] mb-1'>Product Brand</h3>
        <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.1)]
        focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounde-sm p-3 text-sm'
        name='brand' value={formFields.brand} onChange={onChangeInput}/>
       </div>
      <div className='col'>
        <h3 className='text-[14px] font-[500] mb-1'>Product Discount</h3>
        <input type="number" className='w-full h-[40px] border border-[rgba(0,0,0,0.1)]
        focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounde-sm p-3 text-sm'
        name='discount' value={formFields.discount} onChange={onChangeInput}/>
       </div>
        <div className='col'>
        <h3 className='text-[14px] font-[500] mb-1'>Product Rams</h3>
         {
          productRamsData?.length!==0 &&
         <Select
          multiple
          className='w-full'
          labelId="demo-simple-select-label"
          id="ProductCatDrop"
          size='small'
          value={productRams}
          label="Category"
          onChange={handleChangeProductRams}>
          {
            productRamsData?.map((item,index)=>{
             return <MenuItem key={index} value={item?.name}>{item?.name}</MenuItem>
            })
          }
        </Select>
         }
       </div>
      <div className='col'>
        <h3 className='text-[14px] font-[500] mb-1'>Product Weight</h3>
          {
          productWeightData?.length!==0 &&
          <Select
          multiple
          className='w-full'
          labelId="demo-simple-select-label"
          id="ProductCatDrop"
          size='small'
          value={productWeight}
          label="Category"
          onChange={handleChangeProductWeight}>
          {
           productWeightData?.map((item,index)=>{
            return  <MenuItem key={index} value={item?.name}>{item?.name}</MenuItem>
            })
          }
        </Select>
          }
       </div>     
      <div className='col'>
        <h3 className='text-[14px] font-[500] mb-1'>Product Size</h3>
         {
          productSizeData?.length!==0 &&
         <Select
          multiple
          className='w-full'
          labelId="demo-simple-select-label"
          id="ProductCatDrop"
          size='small'
          value={productSize}
          label="Category"
          onChange={handleChangeProductSize}>
           {
           productSizeData?.map((item,index)=>{
            return  <MenuItem key={index} value={item?.name}>{item?.name}</MenuItem>
            })
          }
        </Select>
         }
       </div>
       </div>
     <div className='grid grid-cols-4 mb-3 gap-4'>
       <div className='col'>
        <h3 className='text-[14px] font-[500] mb-1 whitespace-nowrap'>Product Rating</h3>
         <Rating name="half-rating" defaultValue={1} precision={0.5}
         onChange={onChangeRating}/>
       </div>
       </div>
      <div className='max-h-[75vh] overflow-x-scroll pr-4 pt-4'>
          <br/>
        <h3 className='text-[18px] font-[500] mb-1'>Category Image</h3>
        <br/>
          <div className='grid grid-cols-2 md:grid-cols-6 gap-4'>

           {
        previews?.length !== 0 && previews?.map((image, index) => {
       return (
      <div className="uploadBoxWrapper mr-3 relative" key={index}>
        <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 top-[-15px]
          flex items-center justify-center z-50 cursor-pointer' onClick={()=>removeImg(image,index)}>
          <IoMdClose className='text-white text-[17px]' />
        </span>
        <div className='uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)]
            h-[150px] w-[170px] bg-gray-100 transition-all duration-300 hover:bg-gray-200 cursor-pointer
            flex items-center justify-center flex-col relative'>
            <img src={image} className='w-100'/>
          </div>
          </div>
        );
        })
      }
     <UploadBox multiple={true} name='images' url='/api/product/uploadImages'
     setPreviewsFun={setPreviewsFun}/>
      </div>
       </div>
      </div>
      <hr/>
      <br/>
      <Button type='submit' className='!bg-blue-600 !text-white !font-[600] !px-4 w-full flex gap-1'>
        {
        isLoading === true ? <CircularProgress color="inherit"/> 
         :
        <>
        <FaCloudUploadAlt className='text-[25px]'/> Publish and View
        </>
        }
      </Button>
      </form>
    </section>
  )
}

export default AddProduct;
