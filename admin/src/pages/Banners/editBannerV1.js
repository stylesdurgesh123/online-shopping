import React, { useContext, useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MyContext } from '../../App';
import { deleteImage, fetchDataFromApi, postData, profileEditData } from '../../utlis/api';
import UploadBox from '../../Components/UploadBox';
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from "react-icons/fa";
import CircularProgress from '@mui/material/CircularProgress';

function EditBannerV1() {

 const [isLoading,setIsLoading]=useState(false);
 const [productCat, setProductCat] =useState('');
 const [previews,setPreviews]=useState([]);
 const [productSubCat, setProducSubtCat] =useState('');
 const [productThirdLavelCat,setProductThirdLavelCat]=useState('');
 const [formFields,setFormFields]=useState({
       catId:"",
       bannerTitle:'',
       subCatId:"",
       thirdSubCatId:"",
       price:''
     });
         
   const context=useContext(MyContext);
   const navigate=useNavigate();
 
   useEffect(()=>{
    const id = context?.isOpenFullScreenPanel?.id;
     fetchDataFromApi(`/api/bannerV1/${id}`)
     .then((res)=>{
      formFields.bannerTitle=res?.banner?.bannerTitle
      setPreviews(res?.banner?.images);
      formFields.images=res?.banner?.images;
      setProductCat(res?.banner?.catId);
      formFields.catId=res?.banner?.catId;
      setProducSubtCat(res?.banner?.subCatId);
      formFields.subCatId=res?.banner?.subCatId;
      setProductThirdLavelCat(res?.banner?.thirdSubCatId);
      formFields.thirdSubCatId=res?.banner?.thirdSubCatId;
      formFields.price=res?.banner?.price;
     })
    },[]);

   const onChangeInput = (e) => {
   const { name, value } = e.target;
   setFormFields(()=>{
    return {
      ...formFields,
      [name]:value
      }
      })
    };

   const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    formFields.catId=event.target.value;
  };

  const handleChangeProductSubCat = (event) => {
    setProducSubtCat(event.target.value);
    formFields.subCatId=event.target.value;
  };

  const handleChangeProductThirdLavelCat=(event) => {
    setProductThirdLavelCat(event.target.value);
    formFields.thirdSubCatId=event.target.value;
  };

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
    console.log('formffeeee', formFields)
    e.preventDefault();
    setIsLoading(true);
   if(formFields.bannerTitle===''){
     context.openAlertBox('error','Please enter Banner Title');
      setIsLoading(false);
       return false
     }

   if(formFields.price===''){
     context.openAlertBox('error','Please enter banner price');
      setIsLoading(false);
       return false
     } 
     
    if(previews?.length===0){
     context.openAlertBox('error','Please enter category image');
      setIsLoading(false);
      return false
     }
  
    profileEditData(`/api/bannerV1/${context?.isOpenFullScreenPanel?.id}`,{withCredentials: true})
     .then((res)=>{
      console.log(res);
      context?.fetchCategories();
      setIsLoading(false)
      setTimeout(() => {
      context.setIsOpenFullScreenPanel({
      open:false
      })
      navigate('/bannerV1List')  
      }, 1000);
     });
   }

  return (
    <>
   <section className='p-5 bg-gray-50'>
    <form className='form p-1 md:p-8 py-1' onSubmit={handleSubmit}>
     <div className='grid grid-cols-1 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-5 mb-3'>
     <div className='col'>
      <h3 className='text-[14px] font-[500] mb-1'>Banner Title</h3>
      <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.1)]
      focus:outline-none focus:border-[rgba(0,0,0,0.4)] 
      rounde-sm p-3 text-sm'
      name="bannerTitle"
      value={formFields.bannerTitle} 
      onChange={onChangeInput}/>
      </div>
     <div className='col '>
      <h3 className='text-[14px] font-[500] mb-1'>Category</h3>
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
            return (
           <MenuItem value={cat?._id} key={index}>
              {cat?.name}
           </MenuItem>
           )
           })
          }
         </Select> 
        }
      </div>
      <div className='col'>
       <h3 className='text-[14px] font-[500] mb-1'>Sub Category</h3>
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
         <MenuItem value={subCat?._id} key={index_}>
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
             <h3 className='text-[14px] font-[500] mb-1'>Third level Category</h3>
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
                  <MenuItem value={thirdlevelCat?._id} key={index_}>
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
      <h3 className='text-[14px] font-[500] mb-1'>Price</h3>
      <input type="number" className='w-full h-[40px] border border-[rgba(0,0,0,0.1)]
      focus:outline-none focus:border-[rgba(0,0,0,0.4)] 
      rounde-sm p-3 text-sm'
      name="price"
      value={formFields.price} 
      onChange={onChangeInput}/>
      </div>  
      </div>  
       <div className='scroll max-h-[75vh] overflow-x-scroll pr-4 pt-4'>
        <br/>
        <h3 className='text-[18px] font-[500] mb-1'>Image</h3>
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
         <UploadBox multiple={true} name='images' url='/api/bannerV1/uploadImages'
          setPreviewsFun={setPreviewsFun}/>
         </div>
      </div>
        <div className='w-[250px] mt-6'>
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
     </section>  
    </>
  )
}

export default EditBannerV1;
