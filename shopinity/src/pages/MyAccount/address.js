import { useContext, useEffect } from 'react';
import AccountSidebar from '../../components/AccountSidebar';
import { MyContext } from '../../App';
import { useState } from 'react';
import 'react-international-phone/style.css';
import { deleteData, fetchDataFromApi} from '../../utlis/api';
import AddressBox from './addressBox';

function Address() {

 const context=useContext(MyContext);

 const [phone, setPhone] = useState('');
 const [isOpneModel,setIsOpenModel]=useState(false);
 const [address,setAddress]=useState([]);
 //const [mode,setMode]=useState('add');
 const [addressId,setAddressId]=useState('');
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
  

  const removeAddress=(id)=>{
   deleteData(`/api/address/${id}`)
   .then((res)=>{
  const token = localStorage.getItem('accessToken');
  fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`, token,{withCredentials: true}).then((res) => {
     setAddress(res.data);
     context?.getUserDetails()
       });
     })
   }

    const editAddress = (id)=>{
      setIsOpenModel(true);
      setAddressId(id);
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
       userId:res?.address?.userId
       })
      setPhone(`${res?.address?.mobile}`);
      setAddressType(res?.address?.addressType);
      })
     }  
      
  return (
    <>
     <section className='py-5 lg:py-10 w-full'>
      <div className='w-[95%] m-auto flex flex-col md:flex-row gap-5'>
      <div className="col1 w-full md:w-[30%] lg:w-[20%]">
       <AccountSidebar/>
      </div>
      <div className="col2 w-full md:w-[70%] lg:w-[50%]">
       <div className="card bg-white p-5 shadow-md rounded-md mb-5">
       <div className='flex items-center pb-3'>
        <h2 className='pb-0 font-[500]'>Address</h2>
       </div>
       <hr/>

       <div className='flex items-center justify-center p-5 border border-dashed
         border-[#0,0,0,0.1] bg-[#f1faff] transition-all duration-300 hover:bg-[#6ac7f9] rounded-md cursor-pointer' 
         onClick={context?.toggleAddressPanel(true)}>
          <span className='text-[14px] font-[500]'>Add Address</span>
          </div>
           <div className='flex gap-2 flex-col mt-4'>
           {
            address?.length > 0 && address?.map((address,index)=>{
            return(
           <AddressBox address={address} 
           key={index} 
           removeAddress={removeAddress} 
           editAddress={editAddress}/>
         )
        })
        }
      </div>
      </div>
     </div>
    </div>
  </section>
  </>
  )
}

export default Address;
