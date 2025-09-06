import React, { useContext, useState } from 'react'
import { IoImagesOutline } from "react-icons/io5";
import { MyContext } from '../../App';
import { uploadAddressImage} from '../../utlis/api';
import CircularProgress from '@mui/material/CircularProgress';

function UploadBox(props) {

const context=useContext(MyContext);

 const [previews,setPreviews]=useState([]);
 const [uploading,setUploading] = useState(false);

  let selectedImages=[];
  const formData = new FormData();
 
  const onChangeFile = async (e,apiEndPoint) => {
    try {
    setPreviews([]);
    const files = e.target.files;
    setUploading(true);
    console.log(files); 
    
    for(var i=0; i < files.length; i++){
     if(files[i] && (files[i].type==='image/jpeg' || files[i].type==='image/jpg' ||files[i].type==='image/png' || files[i].type==='image/webp'))
     {
    const file = files[i];
    selectedImages.push(file);
    formData.append(props?.name,file)
 
     }else{
     context.openAlertBox('error','Please select a valid JPG, PNG or webp image file.');
     setUploading(false);
     return false;
     }
    }
 
 const token = localStorage.getItem('accessToken'); 
   
  uploadAddressImage(`${apiEndPoint}?token=${token}`, formData).then((res) => {
  setUploading(false);
  console.log("Full response:", res);
  props.setPreviewsFun(res.images)
   });

  } catch (error) {
      console.log(error); 
    }
  }
  return (
    <div className='uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)]
    h-[150px] w-[170px] bg-gray-100 transition-all duration-300 hover:bg-gray-200 cursor-pointer
    flex items-center justify-center flex-col relative'>

      {
       uploading===true ?
       <>
      <CircularProgress/>
    <h4 className='text-center'>Uploading...</h4>
       </> 
       :
    <>
    <IoImagesOutline className='text-[40px] opacity-35 pointer-events-none'/>
     <h4 className='text-[14px] pointer-events-none'>Image Upload</h4>  
     <input
      type="file"
      accept="image/*"
      multiple={props.multiple}
      onChange={(e) => {
      onChangeFile(e, props?.url);
      e.target.value = ""; 
      }}
      name="images"
      className="absolute top-0 left-0 w-full h-full z-50 opacity-0"/>
      </>
      }
    </div>
  )
}

export default UploadBox;
