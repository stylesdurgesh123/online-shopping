import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from "react-icons/fa";
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import { MdOutlineModeEditOutline } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import { MyContext } from '../../App';
import { deleteData, fetchDataFromApi, postData, profileEditData } from '../../utlis/api';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function AddSize() {

   const [data,setData] = useState([]);
   const [editId,setEditId] = useState('');
   const [formFields,setFormFields]=useState({
        name:""
      });

   const context = useContext(MyContext);

    const getData = ()=>{
     fetchDataFromApi('/api/product/productSIZE/get')
     .then((res)=>{
     if(res?.error===false){
     setData(res?.data);
      }
     });
   }

   useEffect(() => {
     getData();
     }, []);

  const handleChangeProductRAMS = (event) => {
  const value = event.target.value;
  setFormFields((prev) => ({
      ...prev,
       name: value
      }));
     };

    const deleteRams = (id) => {
    deleteData(`/api/product/productSIZE/${id}`)
      .then((res) => {
      if (res.error === false) {
      context.openAlertBox('success', res.message);
      getData(); 
       } else {
      context.openAlertBox('error', res.message);
       }
      })
       }; 

  const editItem = (id)=>{
   fetchDataFromApi(`/api/product/productSIZE/${id}`)
   .then((res)=>{
   setFormFields({ name: res?.data?.name });
   setEditId(id);
   })
  }      

   const handleSubmit = (e) => {
   e.preventDefault();

   if (formFields.name === '') {
    context?.openAlertBox('error', 'Please enter product RAM');
    return;
   }

     if (!editId) {
      postData('/api/product/productSIZE/add', formFields, { withCredentials: true })
      .then((res) => {
        if (res?.error === false) {
          context?.openAlertBox('success', res?.message);
          setFormFields({ name: '' });
          getData();
        } else {
          context?.openAlertBox('error', res?.message);
        }
      });
     } else {
       // Edit existing RAM
       profileEditData(`/api/product/updateProductSIZE/${editId}`, formFields, { withCredentials: true })
        .then((res) => {
          if (res?.error === false) {
          context?.openAlertBox('success', res?.message);
          setFormFields({ name: '' });
          setEditId(''); // reset edit mode
          getData();
         } else {
          context?.openAlertBox('error', res?.message);
         }
       });
      }
     };

  return (
    <>
    <div className='flex items-center justify-between px-2 py-0 mt-3'>
     <h2 className='text-[18px] font-[600]'>Add Products Size</h2>
     </div> 
     <div className='card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-[100%] sm:w-[100%] lg:w-[65%]'>
      <form className='form p-6 py-3' onSubmit={handleSubmit}>
       <div className='col mb-4'>
        <h3 className='text-[14px] font-[500] mb-1'>Product Size</h3>
        <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.1)]
        focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounde-sm p-3 text-sm'
        name='name' value={formFields.name} onChange={handleChangeProductRAMS}/>
        </div>
        <Button type='submit' className='!bg-blue-600  !text-white !font-[600] !px-4 w-full flex gap-1'>
        <FaCloudUploadAlt className='text-[25px]'/> Publish and View
      </Button>
      </form>
      </div> 
       {
       data?.length !==0 && 
        <div className='card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-[100%] sm:w-[100%] lg:w-[65%]'>
      <div className="relative mt-5 pb-5">
       <table className="w-full text-sm text-left text-gray-500">
       <thead className="text-xs text-gray-700 bg-gray-100">
       <tr>
        <th className="px-6 py-3 w-[10%]">
        <div className='w-[60px]'>
       <Checkbox {...label} size='small'/>
        </div>
        </th>
        <th className="px-6 py-3 whitespace-nowrap w-[60%]">PRODUCT RAM</th>
        <th className="px-6 py-3 whitespace-nowrap w-[30%]">ACTION</th>
        </tr>
       </thead>
        <tbody>

        {
       data?.map((item,index)=>{
        return(
        <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200'>
        <td className='px-6 py-2'>
        <div className='w-[60px]'>
        <Checkbox {...label} size='small'/>
        </div>
         </td>
         <td className='px-2 py-2' key={index}> 
          {item?.name}                       
         </td>
         <td className='px-6 py-2'>
         <div className='flex items-center gap-1'>
         <Tooltip title="Edit Product" placement="top-start">
         <Button className='!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !rounded-full
          hover:bg-[#ccc]' onClick={()=>editItem(item?._id)}>
         <MdOutlineModeEditOutline className='text-[rgba(0,0,0,0.7)] text-[20px]'/>
         </Button>
         </Tooltip>
         <Tooltip title="Delete Product" placement="top-start">
         <Button className='!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1]
          !rounded-full hover:bg-[#ccc]' onClick={()=>deleteRams(item?._id)}>
         <GoTrash className='text-[rgba(0,0,0,0.7)] text-[18px]'/>
         </Button>
         </Tooltip>
        </div>
        </td>                       
        </tr> 
        )
       })
        }                  
       </tbody>
       </table>
       </div>
      </div>
      }
    </>
  )
}

export default AddSize;
