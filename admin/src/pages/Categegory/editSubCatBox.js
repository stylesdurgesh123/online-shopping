import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../App';
import Button from '@mui/material/Button';
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import { deleteData, profileEditData } from '../../utlis/api';

function EditSubCatBox(props) {

const [isLoading,setIsLoading]=useState(false);
const [editMode,setEditMode]=useState(false);
const [selectVal,setSelectVal]=useState('');
const [formFields,setFormFields]=useState({
 name:"",
 parentCatName: null,
 parentId: null
 });

const context=useContext(MyContext);

 useEffect(()=>{
  formFields.name=props?.name;
  formFields.parentCatName=props?.selectedCatName;
  formFields.parentId=props?.selectedCat;
  setSelectVal(props?.selectedCat)
 },[]);

 const onChangeInput = (e) => {
 const { name, value } = e.target;

  const catId=selectVal
  setSelectVal(catId)

   setFormFields(()=>{
    return {
      ...formFields,
      [name]:value
     }
    })
  };

const handleChange=(event)=>{
 setSelectVal(event.target.value);
 formFields.parentId=event.target.value;
};

 const handleSubmit=(e)=>{
    e.preventDefault();
    setIsLoading(true);
   if(formFields.name===''){
     context.openAlertBox('error','Please enter category name');
      setIsLoading(false);
       return false
     }
    profileEditData(`/api/category/${props?.id}`,formFields,{withCredentials: true})
     .then((res)=>{
      setTimeout(() => {
     context?.openAlertBox('success', res?.message);
     context?.fetchCategories();
      setIsLoading(false)
      });    
      }, 1000);
   }

  const deleteCat=(id)=>{
  deleteData(`/api/category/${props?.id}`)
    .then((res)=>{
    context?.fetchCategories();
    console.log(res)
    }
    )
  }

 return (
   <>
   <form className='w-100 flex items-center gap-3 p-0 px-4' onSubmit={handleSubmit}>
    { 
    editMode ? (
     <>
      <div className='flex items-center justify-between py-2 gap-4 w-full whitespace-nowrap overflow-x-scroll'>
        <div className='w-[180px] md:w-[150px]'>
          <Select
            style={{ zoom: '75%' }}
            className='w-full'
            size='small'
            value={selectVal}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'without label' }}>
            {props?.catData?.length !== 0 &&
              props?.catData?.map((item, index) => (
                <MenuItem key={index} value={item?._id}>
                  {item?.name}
                </MenuItem>
              ))}
          </Select>
         </div>
         <input
          type="text"
          className='w-[150px] md:w-full h-[30px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'
          name='name'
          value={formFields?.name}
          onChange={onChangeInput}/>
         <Button
          type='submit'
          className='!bg-blue-600 !text-white !font-[600] !px-4 flex gap-1'>
          {
          isLoading ? <CircularProgress color="inherit" size={20} /> : 'Edit'
          }
         </Button>
         <Button
          type='button'
          size='small'
          variant='outlined'
          onClick={() => setEditMode(false)}>
          Cancel
        </Button>
       </div>
         </>
       ) : (
        <>
      <span className='font-[500] text-[14px]'>{props?.name}</span>
    </>
   )}
   <div className='flex items-center ml-auto gap-2'>
    <Button
      type='button'
      className='!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black'
      onClick={() => setEditMode(true)}>
      <MdOutlineEdit />
     </Button>

     <Button
      type='button'
      className='!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black'
       onClick={()=>deleteCat(props?.id)}>
      <AiOutlineDelete />
     </Button>
     </div>
   </form>
    </>
  )
}

export default EditSubCatBox;
