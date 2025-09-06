import React, { useContext, useState } from 'react';
import UploadBox from '../../Components/UploadBox';
import { IoMdClose } from "react-icons/io";
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from "react-icons/fa";
import { deleteImage, postData} from '../../utlis/api';
import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import Editor from 'react-simple-wysiwyg';

function AddBlog() {

const context=useContext(MyContext);
const navigate=useNavigate();

  const [isLoading,setIsLoading]=useState(false);
  const [html, setHtml] = useState('');
  const [formFields,setFormFields]=useState({
    title:"",
    images:[],
    description:""
  });

 const [previews,setPreviews]=useState([]);

 const onChangeInput = (e) => {
  const { name, value } = e.target;
   setFormFields(()=>{
    return {
      ...formFields,
      [name]:value
    }
   })
 };

  const setPreviewsFun=(previewsArr)=>{
    setPreviews(previewsArr);
    formFields.images=previewsArr
   }

  const removeImg=(image,index)=>{
    var imageArr=[];
    imageArr=previews;
   deleteImage(`/api/blog/deleteImage?img=${image}`).then((res)=>{
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

const onChangeDescription = (event)=>{
  setHtml(event.target.value);
  formFields.description=event.target.value;
} 

 const handleSubmit=(e)=>{
  e.preventDefault();
  setIsLoading(true);
 if(formFields.title===''){
   context.openAlertBox('error','Please enter blog title');
    setIsLoading(false);
     return false
   }

 if(formFields.description===''){
   context.openAlertBox('error','Please enter blog description');
    setIsLoading(false);
     return false
   }

  if(previews?.length===0){
   context.openAlertBox('error','Please enter blog image');
    setIsLoading(false);
    return false
   }

  postData('/api/blog/add',formFields,{withCredentials: true})
   .then((res)=>{
    console.log(res);
    context?.fetchCategories();
    setIsLoading(false)
    setTimeout(() => {
    context.setIsOpenFullScreenPanel({
    open:false
    })
    navigate('/blogList')  
    }, 1000);
   });
 }

  return (
    <section className='p-5 bg-gray-50'>
      <form className='form p-1 md:p-8 py-1' onSubmit={handleSubmit}>
      <div className='grid grid-cols-1 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 mb-3'>
       <div className='col w-[100%]'>
        <h3 className='text-[14px] font-[500] mb-1'>Title</h3>
        <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.1)]
        focus:outline-none focus:border-[hsla(0,0%,0%,0)] 
        rounde-sm p-3 text-sm'
        name="title"
        value={formFields.title} 
        onChange={onChangeInput}/>
       </div>
       <div className='col w-[100%]'>
        <h3 className='text-[14px] font-[500] mb-1'>Description</h3>
       <Editor value={html} onChange={onChangeDescription}
        containerProps={{ style: { resize: 'vertical' } }}/>
       </div>
       </div>  
        <div className='scroll max-h-[75vh] overflow-x-scroll pr-4 pt-4'>
          <br/>
        <h3 className='text-[18px] font-[500] mb-1'>Blog Image</h3>
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
         <UploadBox multiple={true} name='images' url='/api/blog/uploadImages'
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
 export default AddBlog;

