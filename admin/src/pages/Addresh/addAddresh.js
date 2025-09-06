import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from "react-icons/fa";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { postData } from '../../utlis/api';
import { MyContext } from '../../App';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function AddAddresh() { 

 const [phone, setPhone] = useState('');
 const [isLoading,setIsLoading]=useState(false);
 const [status, setStatus] = useState(false);

 const context = useContext(MyContext);

 const [formFields,setFormFields]=useState({
     address_line1:'',
     city:'',
     state:'',
     pincode:'',
     country:'',
     mobile:'',
     status:'',
     userId: context.userData?._id
   });

 useEffect(() => {
  if (context?.userData?._id) {
    setFormFields(prev => ({
      ...prev,
      userId: context.userData._id
    }));
  }
}, [context?.userData]);

  const handleChangeStatus = (event) => {
   setStatus(event.target.value);
   setFormFields(prev => ({
  ...prev,
  status: event.target.value
  }));
  };

  const onChangeInput = (e)=>{
  const {name,value} = e.target;
  setFormFields(()=>{
    return {
      ...formFields,
      [name]:value
     }
    })
   }

 console.log("Submitting this data:", formFields);
 const handleSubmit = (e)=>{
    e.preventDefault();
    setIsLoading(true);
    if(formFields.address_line1===''){
    context.openAlertBox('error','Please Addresh in one line');
     return false
      }
   
       if(formFields.city===''){
       context.openAlertBox('error','Please enter your city');
       return false
     }
  
      if(formFields.state===''){
      context.openAlertBox('error','Please enter your state');
      return false
     }

      if(formFields.pincode===''){
      context.openAlertBox('error','Please enter your pincode');
      return false
     }

      if(formFields.country===''){
      context.openAlertBox('error','Please enter country');
      return false
     }
  
      if(phone===''){
      context.openAlertBox('error','Please enter your phone number in 10 digit');
      return false
     }

 const token = localStorage.getItem('accessToken');
 console.log("FormFields:", formFields);

  postData(`/api/address/add`, formFields, token)
  .then((res) => {
    console.log(res);
    if (res?.error !== true) {
      setIsLoading(false);
      context.openAlertBox('success', res?.message);
      context?.setIsOpenFullScreenPanel({ open: false });
      localStorage.setItem('userEmail', formFields.email);
    } else {
      context.openAlertBox('error', res?.message);
      setIsLoading(false);
    }
   });

   }

  return (
    <section className='p-5 bg-gray-50'>
      <form className='form p-8 py-3' onSubmit={handleSubmit}>
      <div className='grid grid-cols-2 mb-3 gap-4'>
       <div className='col w-[100%]'>
        <h3 className='text-[14px] font-[500] mb-1'>Address Line 1</h3>
        <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.1)]
        focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounde-sm p-3 text-sm'
        name='address_line1' onChange={onChangeInput} value={formFields.address_line1}/>
       </div>
         <div className='col w-[100%]'>
        <h3 className='text-[14px] font-[500] mb-1'>City</h3>
        <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.1)]
        focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounde-sm p-3 text-sm'
        name='city' onChange={onChangeInput} value={formFields.city}/>
       </div>
       </div> 
       <div className='grid grid-cols-3 mb-3 gap-4'>
       <div className='col w-[100%]'>
        <h3 className='text-[14px] font-[500] mb-1'>State</h3>
        <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.1)]
        focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounde-sm p-3 text-sm'
        name='state' onChange={onChangeInput} value={formFields.state}/>
       </div>
        <div className='col w-[100%]'>
        <h3 className='text-[14px] font-[500] mb-1'>Pincode</h3>
        <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.1)]
        focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounde-sm p-3 text-sm'
        name='pincode' onChange={onChangeInput} value={formFields.pincode}/>
       </div>
       <div className='col w-[100%]'>
        <h3 className='text-[14px] font-[500] mb-1'>Country</h3>
        <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.1)]
        focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounde-sm p-3 text-sm'
        name='country' onChange={onChangeInput} value={formFields.country}/>
       </div>
       <div className='col w-[100%]'>
        <h3 className='text-[14px] font-[500] mb-1'>Mobile</h3>
         <PhoneInput
           defaultCountry="in"
           value={phone}
           onChange={(phone) =>{
           setPhone(phone);
            {
            setFormFields(prev => ({
            ...prev,
           mobile: phone
           }));
           }
           }}/> 
       </div>
       <div className='col w-[100%]'>
      <h3 className='text-[14px] font-[500] mb-1 text-black'>Status</h3>
         <Select
          value={status}
          onChange={handleChangeStatus}
          displayEmpty
          size='small'
          className='w-full'
          inputProps={{ 'aria-label': 'Without label' }}>
          <MenuItem value={true}>True</MenuItem>
          <MenuItem value={false}>False</MenuItem>
        </Select>
       </div>
       </div>  
          <br/>
            <hr/>
             <br/>
              <div className='w-[250px]'>
              <Button type='submit' className='!bg-blue-600 !text-white !font-[600] !px-4 w-full flex gap-1'>
              <FaCloudUploadAlt className='text-[25px]'/> Publish and View
              </Button>
              </div>
             </form>
            </section>
        )
       }

export default AddAddresh;




