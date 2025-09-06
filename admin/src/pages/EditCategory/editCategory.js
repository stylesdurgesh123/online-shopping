import React, { useContext, useEffect, useState } from 'react';
import UploadBox from '../../Components/UploadBox';
import { IoMdClose } from "react-icons/io";
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from "react-icons/fa";
import { deleteImage, postData, profileEditData} from '../../utlis/api';
import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from '../../App';
import { fetchDataFromApi} from '../../utlis/api';

 function EditCategory() {

 const context=useContext(MyContext);

  const [isLoading,setIsLoading]=useState(false);
  const [formFields,setFormFields]=useState({
    name:"",
    images:[]
  });

 const [previews,setPreviews]=useState([]);

 useEffect(()=>{
const id = context?.isOpenFullScreenPanel?.id;
  fetchDataFromApi(`/api/category/${id}`)
  .then((res)=>{
   formFields.name=res?.category?.name
   setPreviews(res?.category?.images)
  })
 },[]);

 const onChangeInput = (e) => {
  const { name, value } = e.target;
   setFormFields(()=>{
    return {
      ...formFields,
      [name]:value
    }
   });
  formFields.images=previews
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
  e.preventDefault();
  setIsLoading(true);
 if(formFields.name===''){
   context.openAlertBox('error','Please enter category name');
    setIsLoading(false);
     return false
   }
  if(previews?.length===0){
   context.openAlertBox('error','Please enter category image');
    setIsLoading(false);
    return false
   }

  profileEditData(`/api/category/${context?.isOpenFullScreenPanel?.id}`,formFields,{withCredentials: true})
   .then((res)=>{
    setIsLoading(false)
    setTimeout(() => {
    context.setIsOpenFullScreenPanel({
    open:false
    });    
    }, 1000);
   });
 }

  return (
    <section className='p-5 bg-gray-50'>
      <form className='form p-1 md:p-8 py-1' onSubmit={handleSubmit}>
      <div className='grid grid-cols-1 mb-3'>
       <div className='col w-full md:w-[25%]'>
        <h3 className='text-[14px] font-[500] mb-1'>Category Name</h3>
        <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.1)]
        focus:outline-none focus:border-[rgba(0,0,0,0.4)] 
        rounde-sm p-3 text-sm'
        name="name"
        value={formFields.name} 
        onChange={onChangeInput}/>
       </div>
       </div>  
        <div className='scroll max-h-[75vh] overflow-x-scroll pr-4 pt-4'>
          <br/>
        <h3 className='text-[18px] font-[500] mb-1'>Category Image</h3>
        <br/>
      <div className='grid grid-cols-2 md:grid-cols-6 gap-4'>

        {
        previews?.length !== 0 && previews?.map((image, index) => {
       return (
      <div className="uploadBoxWrapper mr-3 relative" key={index}>
        <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 top-[-10px]
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
        <br/>
        <hr/>
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
      </section>
      )
    }
 export default EditCategory;

