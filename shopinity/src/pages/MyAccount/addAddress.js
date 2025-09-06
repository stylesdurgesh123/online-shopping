import { useContext, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { MyContext } from '../../App';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Button from '@mui/material/Button';
import { fetchDataFromApi, postData, profileEditData } from '../../utlis/api';

function AddAddress() {

const context=useContext(MyContext);

 const [phone, setPhone] = useState('');
 const [isOpneModel,setIsOpenModel]=useState(false);
 const [isLoading,setIsLoading]=useState(false);
 const [address,setAddress]=useState([]);
 //const [mode,setMode]=useState('add');
 //const [addressId,setAddressId]=useState('');
 const [addressType,setAddressType]=useState();
 const [formFields,setFormFields]=useState({
   address_line1:'',
   city:'',
   state:'',
   pincode:'',
   country:'',
   mobile:'',
   addressType:'',
   landmark:'',
   userId: context.userData?._id
   });

  const onChangeInput = (e)=>{
  const {name,value} = e.target;
  setFormFields(()=>{
    return {
      ...formFields,
      [name]:value
     }
    })
   }

   /*
  const handleClose = () => {
   setIsOpenModel(false);
   };*/

    useEffect(() => {
     if (context?.userData?._id !== '' && context?.userData?._id !== undefined) {
      const token = localStorage.getItem('accessToken');
  
      fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`, token,{withCredentials: true})
      .then((res) => {
        setAddress(res.data);
      });

     if (context?.userData?._id) {
      setFormFields(prev => ({
      ...prev,
      userId: context.userData._id
      }));
     }
    }
  }, [context?.userData]);
  
  const handleChangeAddressType=(event)=>{
   setAddressType(event.target.value);
     setFormFields(()=>({
     ...formFields,
     addressType: event.target.value
      }))
    }  

  useEffect(()=>{

  if(context?.addressMode==='edit'){
   fetchAddress(context?.addressId)
  }  

  },[context?.addressMode])   

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

       if(formFields.landmark===''){
        context.openAlertBox('error','Please enter your landmark');
        return false
        }
      
       if(formFields.addressType===''){
        context.openAlertBox('error','Please enter your addressType');
        return false
       }  
  
   if(context?.addressMode==='add'){
    const token = localStorage.getItem('accessToken');
    postData(`/api/address/add`, formFields, token)
    .then((res) => {
     if (res?.error !== true) {
     setIsLoading(false);
     context.openAlertBox('success', res?.message);  
     context?.setOpenAddressPanel(false);
     localStorage.setItem('userEmail', formFields.email);
    context?.getUserDetails();
      } else {
        context.openAlertBox('error', res?.message);
        setIsLoading(false);
      }
     });
     }

   if(context?.addressMode==='edit'){
    profileEditData(`/api/address/${context?.addressId}`,formFields,({withCredentials:true}))
    .then((res)=>{
    if (res?.error !== true) {
  //  setAddress(res?.address);
    context.openAlertBox('success', res?.message); 
    context?.setOpenAddressPanel(false);
     fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`)
     .then((res)=>{
      context?.getUserDetails(res?.data);
      // after edit do balnk form
      setFormFields({
       address_line1:'',
       city:'',
       state:'',
       pincode:'',
       country:'',
       mobile:'',
       addressType:'',
       landmark:'',
       userId:''  
      })
      setAddressType('');
      setPhone('');
      })
      }else {
        context.openAlertBox('error', res?.message);
      }
    }) 
  }  
 }

  const fetchAddress = (id)=>{
   // setMode('edit');
   setIsOpenModel(true);
   context?.setAddressId(id);
   fetchDataFromApi(`/api/address/${id}`)
   .then((res)=>{
    setFormFields({
    address_line1:res?.address?.address_line1,
    city:res?.address?.city,
    state:res?.address?.state,
    pincode:res?.address?.pincode,
    country:res?.address?.country,
    mobile:res?.address?.mobile,
    addressType:res?.address?.addressType,
    landmark:res?.address?.landmark,
    //userId: context.userData?._id
    userId:res?.address?.userId
     })
    setPhone(`${res?.address?.mobile}`);
    setAddressType(res?.address?.addressType);
     })
     } 
   
  return (
   <form className='p-8 py-3 px-2 pb-5' onSubmit={handleSubmit}>
    <div className='flex items-center gap-5 pb-5'>
    <div className="col w-[100%]">
    <TextField
     type='text' 
     className='w-full'
     label="Address Line 1" 
     variant="outlined"
     size='small'
     name='address_line1' 
     onChange={onChangeInput} 
     value={formFields.address_line1}
     />
     </div>
    </div>
    <div className="col w-[100%] mb-4">
     <TextField
     type='text' 
     className='w-full'
     label="City" 
     variant="outlined"
     size='small'
     name='city' 
     onChange={onChangeInput} 
     value={formFields.city}
     />
     </div>
    <div className="col w-[100%] mb-4">
     <TextField
     type='text' 
     className='w-full'
     label="State" 
     variant="outlined"
     size='small'
     name='state' 
     onChange={onChangeInput} 
     value={formFields.state}
     />
     </div>
     <div className="col w-[100%] mb-4">
     <TextField
     type='text' 
     className='w-full'
     label="Pincode" 
     variant="outlined"
     size='small'
     name='pincode' 
     onChange={onChangeInput} 
     value={formFields.pincode}
     />
     </div>
     <div className="col w-[100%] mb-4">
     <TextField
     type='text' 
     className='w-full'
     label="Country" 
     variant="outlined"
     size='small'
     name='country' 
     onChange={onChangeInput} 
     value={formFields.country}
     />
     </div> 
     <div className="col w-[100%] mb-4">
      <PhoneInput
      defaultCountry="in"
      value={phone}
      onChange={(phone) => {
      setPhone(phone);
      setFormFields(prev => ({
      ...prev,
      mobile: phone
      }));
     }}
    />
  </div>

    <div className="col w-[100%] mb-4">
     <TextField
     type='text' 
     className='w-full'
     label="Landmark" 
     variant="outlined"
     size='small'
     name='landmark' 
     onChange={onChangeInput} 
     value={formFields.landmark}
     />
    </div> 
   <div className='flex gap-5 pb-5 flex-col'>
     <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Address Type</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={addressType}
        onChange={handleChangeAddressType}
        >
       <FormControlLabel value="Home" control={<Radio />} label="Home" />
       <FormControlLabel value="Office" control={<Radio />} label="Office" />
      </RadioGroup>
    </FormControl>
    </div>

     <div className="py-3 px-2 flex">
      <Button type='submit' className="!bg-[#ff5252] !text-white !font-[600] hover:!bg-[#ff5252] w-full">
        Save
       </Button>
    </div>
   </form>     
  )
}

export default AddAddress
