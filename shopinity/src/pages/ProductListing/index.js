import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link,} from 'react-router-dom'; // React Router Link
import Productsitems from '../../components/Productsitems';
import ProductsitemsListView from '../../components/ProductsitemsListView';
import Button from '@mui/material/Button';
import { IoGridSharp } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import { postData } from '../../utlis/api';


function ProductListing() {

  const [itemView,setIsItemView]=useState('grid');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [productData,setProductData]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [page,setPage]=useState(1);
  const [totalPages,setTotalPages]=useState(1);
  const [selectedSortVal,setSelectedSortVal]=useState('Name, A to Z');

  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

 const handleSortBy=(name,order,products,value)=>{
  setSelectedSortVal(value);
  postData(`/api/product/sortBy`,{
   products: products,
   sortBy: name,
   order: order
  }).then((res)=>{
    setProductData(res);
    setAnchorEl(null);
  })
 }

  return (
    <section className='py-5 pb-0'>
     <div className='w-[95%] m-auto'>
     <Breadcrumbs aria-label="breadcrumb">
        <Link to="/" className="transition-all duration-300 hover:text-[#ff5252] hover:underline">
          Home
        </Link>
        <Link to="/products" className="transition-all duration-300 hover:text-[#ff5252] hover:underline">
          Fashion
        </Link>
      </Breadcrumbs>
     </div>

      <div className='bg-white p-2 mt-4'>
      <div className='w-[95%] m-auto flex gap-3'>
      <div className="sidebarWrapper fixed top-0 left-0 w-full h-full lg:static 
      lg:w-[20%] bg-white hidden lg:block">
       <Sidebar 
         productData={productData} 
         setProductData={setProductData}
         isLoading={isLoading} 
         setIsLoading={setIsLoading} 
         page={page} 
         setPage={setPage}
         totalPages={totalPages}
         setTotalPages={setTotalPages}
         />
      </div>

       <div className='rightContent w-full lg:w-[80%] py-3'>
        <div className='bg-[#f1f1f1] p-2 w-full mb-3 rounded-md 
          flex items-center justify-between sticky top-[130px] z-[99]'>
         <div className='col1 flex items-center ItemViewAction'>
         <Button className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full 
         !text-[#000] ${itemView==='list' && 'active'}`} onClick={()=>setIsItemView('list')}>
            <FiMenu className='text-[rgba(0,0,0,0.7)]'/>
            </Button>
           <Button className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full
            !text-[#000] ${itemView==='grid' && 'active'}`} onClick={()=>setIsItemView('grid')}>
            <IoGridSharp className='text-[rgba(0,0,0,0.7)]'/>
            </Button>
            <span className='text-[14px] hidden sm:block md:block lg:block font-[500] pl-3 text-[rgba(0,0,0,0.7)]'>
              There are {productData?.products?.length || 0} products.
              </span>
  
         </div>
       <div className='col2 ml-auto flex items-center justify-end gap-3 pr-4'>
       <span className='text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]'>
        Short By:
       </span>
       
       <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick} className='!bg-white !text-[12px] !text-[#000] !capitalize
        !border-2 border-[#000]'>
        {selectedSortVal}
      </Button>
       <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        
      <MenuItem 
      onClick={()=>handleSortBy('name','asc',productData,'Name, A to Z')}
      className='!text-[13px] !text-[#000] !capitalize'
      >
      Name, A to Z
      </MenuItem> 

     <MenuItem 
      onClick={()=>handleSortBy('name','desc',productData,'Name, Z to A')}
      className='!text-[13px] !text-[#000] !capitalize'
      >
      Name, Z to A
     </MenuItem>

     <MenuItem 
      onClick={()=>handleSortBy('price','asc',productData,'Price, low to high')}
      className='!text-[13px] !text-[#000] !capitalize'
      >
       Price, low to high
     </MenuItem>

     <MenuItem 
      onClick={()=>handleSortBy('price','desc',productData,'Price, high to low')}
      className='!text-[13px] !text-[#000] !capitalize'
      >
    Price, high to low
     </MenuItem>
      </Menu>
       </div>
        </div>
        <div className={`grid ${itemView==='grid' 
         ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' 
         : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:sm:grid-cols-1'} gap-4`
         }>
         {
          itemView === 'grid' ?
         <>
         {
          productData?.products?.length !==0 && productData?.products?.map((item,index)=>{
           return (
           <Productsitems key={index} item={item}/>
           )
          })
         }
          </> 
          :
          <>
           {
          productData?.products?.length !==0 && productData?.products?.map((item,index)=>{
           return (
           <ProductsitemsListView key={index} item={item}/>
           )
          })
         }
          </> 
        }
        </div>
        {
         totalPages > 1 && 
        <div className='flex items-center justify-center mt-10'>
         <Pagination
          showFirstButton showLastButton  
          count={totalPages}
          page={page} 
          onChange={(e,value)=>{
          setPage(value)
         }}
         />
       </div> 
        }
       </div>
      </div>
    </div>
    </section>
  );
}

export default ProductListing;





