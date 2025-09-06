import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { FaBagShopping } from "react-icons/fa6";
import { MyContext } from '../../App';
import { FaPlus } from "react-icons/fa6";
import Radio from '@mui/material/Radio';
import { deleteData, fetchDataFromApi, postData } from '../../utlis/api';
import { useNavigate } from 'react-router-dom';


const REACT_APP_RAZORPAY_KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID;
const REACT_APP_RAZORPAY_KEY_SECRET = process.env.REACT_APP_RAZORPAY_KEY_SECRET;

function Checkout() {
const [userData,setUserData] = useState(null); 
const [selectedAddress,setSelectedAddress]=useState('');
const [totalAmount,setTotalAmount]=useState();
const [isChecked,setIsChecked]=useState(0);

const context=useContext(MyContext);
const navigate=useNavigate();

window.scrollTo(0,0,);

useEffect(() => {
  if (context?.userData) {
    setUserData(context.userData);
    setSelectedAddress(context?.userData?.address_details[0]?._id);     
    } 
}, [context?.userData]);

useEffect(()=>{
  setTotalAmount(
   context?.cartData?.length !==0 ? 
   context?.cartData?.map(item=>parseInt(item.price) * item.quantity)
   .reduce((total,value)=>total + value,0) : 0)
   ?.toLocaleString('en-US',{style: 'currency', currency: 'INR'});

  /* localStorage.setItem('totalAmount', context?.cartData?.length !==0 ?
   context.cartData?.map(item=>parseInt(item.price) * item.quantity)
   .reduce((total,value)=>total+value,0) :0)
   ?.toLocaleString('en-US',{style: 'currency', currency: 'INR'});*/

},[context?.cartData])


const editAddress=(id)=>{
 context?.setOpenAddressPanel(true);
 context?.setAddressMode('edit');
 context?.setAddressId(id);
} 

const handleChange=(e,index)=>{
 if(e.target.checked){
 setIsChecked(index);
 setSelectedAddress(e.target.value);
 }
}

const checkout=(e)=>{
    e.preventDefault();

 if(userData?.address_details?.length !==0){
     const options = {
    key: REACT_APP_RAZORPAY_KEY_ID, 
    key_secret: REACT_APP_RAZORPAY_KEY_SECRET,
    amount: totalAmount * 100, 
    currency: "INR",
    order_receipt: context?.userData?.name,
    name: "Online Shoping",
    description: "Test Transaction",
    image: "https://yourlogo.png",
    handler: function (response) {
    const paymentId = response.razorpay_payment_id;
    const user=context?.userData
    const payLoad={
      userId:user?._id,
      products:context?.cartData,
      paymentId:paymentId,
      payment_status:'COMPLETED',
      delivery_address:selectedAddress,
      totalAmt:totalAmount,
      name: userData?.name,
      contact: userData?.mobile,
      date:new Date().toDateString('en-US',{
       month:'short',
       day:'2-digit',
       year:'numeric',
      }),
    };

postData(`/api/order/create`, payLoad)
.then((res)=>{
  if(res?.error===false){
    context?.openAlertBox('success',res?.message);
    deleteData(`/api/cart/emptyCart/${user?._id}`).then(()=>{
      context?.refreshCart();
    })
    navigate('/order/success');
  } else {
    navigate('/order/failed');
    context?.openAlertBox('error',res?.message);
  }
})

    },
    theme: {
      color: "#ff5252",
    },
  };
 // Razorpay checkout open
 const rzp1 = new window.Razorpay(options);
  rzp1.open();  
 }else{
 context?.openAlertBox('error','Please add addrerss');
 }   
}

const cashOnDelivery=()=>{
 const user = context?.userData

 if(userData?.address_details?.length !==0){
   const payLoad={
  userId:user?._id,
  products:context?.cartData,
  paymentId:'',
  payment_status:'CASH ON DELIVERY',
  delivery_address:selectedAddress,
  totalAmt:totalAmount,
  name: userData?.name,
  contact: userData?.mobile,
  date:new Date().toLocaleString('en-US',{
  month:'short',
  day:'2-digit',
  year:'numeric',
  }),
 };

postData(`/api/order/create`, payLoad)
.then((res)=>{
  if(res?.error===false){
    context?.openAlertBox('success',res?.message);
    deleteData(`/api/cart/emptyCart/${user?._id}`).then(()=>{
      context?.refreshCart();
      fetchDataFromApi(`/api/order/order-list`).then((res)=>{
        console.log('responsedddddd',res)
      })
    })
    navigate('/order/success');
  } else {
    navigate('/order/failed');
    context?.openAlertBox('error',res?.message);
  }
})
 }else{
  context?.openAlertBox('error','Please add addrerss');
 }
}

  return (
    <section className='py-3 lg:py-10 px-3'>
      <form onSubmit={checkout}>
       <div className='w-full lg:w-[75%] m-auto flex flex-col md:flex-row gap-5'>
        <div className="leftCol w-full lg:w-[60%]">
        <div className="card bg-white shadow-md p-5 rounded-md w-full">
        <div className='flex items-center justify-between'>
         <h2 className='text-[16px] font-[500]'>Select Delivery Address</h2>
         <Button className='!text-sm !border-2 !border-solid !border-[#ff5252]
         !text-[#ff5252] hover:!bg-[#ff5252]
          hover:!text-white transition-all duration-300'
           onClick={()=>{
           context?.toggleAddressPanel(true)
           context?.setAddressMode('add')
           }}>
          <FaPlus /> ADD {context?.windowWidth < 767 ? ' ' : 'NEW ADDRESS'} </Button>
        </div>
        <br/>
       <div className='flex flex-col gap-4'>
       {
        userData?.address_details?.length !==0 && userData?.address_details?.map((address,index)=>{
          return(
          <label className={`flex gap-3 p-4 border border-[rgba(0,0,0,0.2)] 
          rounded-md relative ${isChecked===index && 'bg-[#ffcdd2]'}`} key={index}>
          <div>
         <Radio size='small' onChange={(e)=>handleChange(e,index)}
          checked={isChecked===index}
          value={address?._id}
         />
          </div>
          <div className='info'>
           <span className='bg-[#ff5252] text-white p-1 rounded-sm text-sm'>{address?.addressType}</span>
           <h2 className='text-[16px] font-[500]'>{userData?.name}</h2>
          <p className='mt-0 mb-0'>
          { address?.address_line1 + " " + address?.city + " " + " " + address?.pincode + " " + address?.state + " " + address?.country + " " + address?.landmark }
          </p>
          <p className='mt-0 mb-0 font-[500]'>+{userData?.mobile}</p>
          <div>
           <Button
           variant='text' size='small' 
           className='!absolute !right-[15px] !top-[10px] 
           !text-sm !border-2 !border-solid !border-[#ff5252]
         !text-[#ff5252] hover:!bg-[#ff5252]
          hover:!text-white !transition-all !duration-300'
          onClick={()=>editAddress(address?._id)}
          >
          Edit
          </Button> 
          </div>
          </div>
        </label>
          )
          }) 
        }
       </div>

        </div>
       </div>

         <div className="rightCol w-full lg:w-[40%]">
         <div className="card bg-white shadow-md p-5 rounded-md w-full">
            <h2 className='font-[600] mb-4'>Your Order</h2>
            <div className='flex items-center justify-between py-3 border-t border-b border-[rgba(0,0,0,0.1)]'>
             <span className='text-[14px] font-[600]'>Product</span>
             <span className='text-[14px] font-[600]'>Subtotal</span>
            </div>
   
           {
            context?.cartData?.length!==0 && context?.cartData?.map((item,index)=>{
            return(
            <div className='flex items-center justify-between py-2' key={index}> 
             <div className="part1 flex items-center gap-3">
              <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer">
                <img src={item?.image} alt="itemImage"
                 className='w-full transition-all duration-300 group-hover:scale-105'/>
              </div>
               <div className="info cursor-pointer">
                <h4 className='text-[13px]' title={item?.productTitle}>{item?.productTitle?.substr(0,31)+'...'}</h4>
                <span className='text-[14px] text-[#ff5252]'>Qty : {item?.quantity}</span>
               </div>
             </div>
           <span className='text-[13px] font-[500]'>
           {(item?.quantity * (item?.price ?? 0)).toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR'
             })}
            </span>
            </div>
             )
             }) 
            }
          <div className='flex items-center flex-col gap-3 mb-2'>
          <Button type='submit' className='w-full !text-white !bg-[#ff5252] transition-all duration-300 hover:!bg-black items-center gap-2'>
          <FaBagShopping className='text-[18px]'/> Checkout</Button>
          <div id='paypal-button-container'></div>
          <Button type='button' className='w-full  !text-white !bg-green-500 flex gap-2 items-center' onClick={cashOnDelivery}>
          <FaBagShopping className='text-[18px]'/>Cash on Delivery
          </Button>
          </div>
           </div>
         </div>

      </div>
     </form>
    </section>
  )
}

export default Checkout;
