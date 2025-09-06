import React, { useContext } from 'react';
import MyListItems from './myListItems';
import AccountSlider from '../../components/AccountSidebar';
import { MyContext } from '../../App';
import { Link } from 'react-router-dom';
import Button  from '@mui/material/Button';

function MyList() {

const context=useContext(MyContext);

window.scrollTo(0,0,);

  return (
    <section className='py-5 lg:py-10 w-full'>
    <div className='w-[95%] m-auto flex flex-col md:flex-row gap-5'>
     <div className="col1 w-full md:w-[20%] hidden lg:block">
       <AccountSlider/>
     </div>
     <div className="col2 w-full lg:w-[70%]">
     <div className='shadow-md rounded-md bg-white'>
        <div className='py-2 px-3 border-b border-[rgba(0,0,0,0.1)]'>
        <h2>My List</h2>
         <p className='mt-0'>There are <span className='font-bold text-[#ff5252]'> {context?.myList?.length} </span>{' '} product in your my list</p>
        </div>
        {
        context?.myList?.length!==0 ? context?.myList?.map((item,index)=>{
         return (
         <MyListItems key={index} item={item}/>
         )
        })
        :
      <div className='flex items-center justify-center flex-col py-8 gap-4'>
      <img 
       src='https://cdn-icons-png.flaticon.com/128/4472/4472515.png' 
       alt="empty-cart"
       className='w-[150px]'
       />
      <h4 className='text-[20px] font-[500]'>My list is currently empty</h4>
      <Link to='/'>
      <Button className='!bg-[#ff5252] hover:!bg-[#000]
      !text-white !font-semibold !text-[13px] !mt-4' onClick={context.toggleCartPanel(false)}>
       Continue Shopping
       </Button> 
       </Link> 
      </div>  
        }
        </div> 
     </div>
    </div>
    </section>
  )
}

export default MyList;

