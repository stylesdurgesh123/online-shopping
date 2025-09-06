import React,{useContext, useEffect, useState} from 'react';
import '../../App.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { BiExport } from "react-icons/bi";
import SeacrhBox from '../../Components/SearchBox';
import { MyContext } from '../../App';
import { deleteData, fetchDataFromApi } from '../../utlis/api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CircularProgress from '@mui/material/CircularProgress';
import { Rating } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const columns = [
  
    { id: 'product', label: 'PRODUCTS', minWidth: 150},
    { id: 'category', label: 'CATEGORY', minWidth: 150 },
    { id: 'subcategory', label: 'SUB CATEGORY', minWidth: 150},
    {
      id: 'price',
      label: 'PRICE',
      minWidth: 10
    },
    {
      id: 'sale',
      label: 'SALES',
      minWidth: 64
    },
     {
      id: 'rating',
      label: 'RATING',
      minWidth: 64
    },
    {
     id: 'action',
     label: 'ACTION',
     minWidth: 10
    },
  ];
     
   function Products() {
    const [productData,setProductData]=useState([]);
    const [productCat, setProductCat] =useState('');
    const [productSubCat, setProducSubtCat] =useState('');
    const [productThirdLavelCat,setProductThirdLavelCat]=useState('');
    const [formFields,setFormFields]=useState({
          name:"",
          images:[],
          description:"",
          brand:"",
          price:"",
          oldPrice:"",
          category:'',
          catName:"",
          catId:"",
          subCatId:"",
          subCat:"",
          thirdSubCat:"",
          thirdSubCatId:"",
          countInStock:"",
          rating:"",
          isFeatured:false,
          discount:"",
          productRam:[],
          size:"",
          productWeight:[], 
        });

    const context=useContext(MyContext);

    useEffect(()=>{
     getProduct();
     },[context?.isOpenFullScreenPanel]);

    const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    setProducSubtCat('');
    setProductThirdLavelCat('');
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${event.target.value}`)
    .then((res)=>{
    if(res?.error===false){
    setProductData(res?.products)
    }
    })
  };
  
 const selectCatByName=(name)=>{
  formFields.catName=name;
 }

 const handleChangeProductSubCat = (event) => {
    setProducSubtCat(event.target.value);
    setProductCat('');
    setProductThirdLavelCat('');
    fetchDataFromApi(`/api/product/getAllProductsBySubCatId/${event.target.value}`)
    .then((res)=>{
    if(res?.error===false){
    setProductData(res?.products)
    }
    })
  };

 const selectSubCatByName=(name)=>{
    formFields.subCat=name;
 }

  const handleChangeProductThirdLavelCat=(event) => {
    setProductThirdLavelCat(event.target.value);
    setProducSubtCat('');
    setProductCat('');
     fetchDataFromApi(`/api/product/getAllProductsByThirdSubCatId/${event.target.value}`)
    .then((res)=>{
    if(res?.error===false){
    setProductData(res?.products)
    }
    })
  };

  const selectSubCatByThirdLavel=(name)=>{
    formFields.thirdSubCat=name;
 }

 const getProduct = async()=>{
  fetchDataFromApi('/api/product/getAllProducts')
   .then((res)=>{
   console.log(res);
   if(res?.error===false){
   setTimeout(()=>{
   setProductData(res?.products);
   },1000)
    }
   });
 }
 
  const [page, setPage] =useState(0);
  const [rowsPerPage, setRowsPerPage] =useState(10);

  const deleteProduct = (id) => {
   deleteData(`/api/product/${id}`)
    .then((res) => {
      console.log(res);
      if (res.error === false) {
        context.openAlertBox('success', res.message);
        getProduct(); 
      } else {
        context.openAlertBox('error', res.message);
      }
    })
    .catch(err => {
      context.openAlertBox('error', "Failed to delete product.");
    });
};


  const handleChangePage = (newPage) => {
      setPage(newPage);
    };
        
  const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
    setPage(0);
     };

  return (
    <>
     <div className='flex items-center justify-between px-2 py-0 mt-3'>
     <h2 className='text-[18px] font-[600]'>Products</h2>
        <div className='col w-[50%] ml-auto flex items-center justify-end gap-3'>
         <Button className='!bg-blue-500 !text-white !px-4 whitespace-nowrap' onClick={()=>context. 
            setIsOpenFullScreenPanel({
              open:true,
              modal:'Add Product'
            })}>Add Product</Button>
          </div>
        </div>
   
      <div className='card my-4 pt-5 shadow-md sm:rounded-lg bg-white'>
      <div className='grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 justify-between gap-4 w-full px-5'>
      <div className='col'>
        <h4 className='font-[600] text-[13px] mb-2'>Category By</h4>
          {
         context?.cartData?.length !==0 &&
         <Select
         style={{zoom:'80%'}}
         className='w-full'
         labelId="demo-simple-select-label"
         id="ProductCatDrop"
         size='small'
         value={productCat}
         label="Category"
         onChange={handleChangeProductCat}>
         {
        context?.cartData?.map((cat,index)=>{
        return(
        <MenuItem value={cat?._id} onClick={()=>selectCatByName(cat?.name)}>
         {cat?.name}
        </MenuItem>
        )
         })
          }
        </Select> 
         }
         </div>
      <div className='col'>
        <h4 className='font-[600] text-[13px] mb-2'>Sub Category By</h4>
            {
          context?.cartData?.length !==0 &&
          <Select
          style={{zoom:'80%'}}
          className='w-full'
          labelId="demo-simple-select-label"
          id="ProductCatDrop"
          size='small'
          value={productSubCat}
          label="Sub Category"
          onChange={handleChangeProductSubCat}>
           {
           context?.cartData?.map((cat,index)=>{
            return(
           cat?.children?.length !==0 && cat?.children?.map((subCat,index_)=>{
            return (
           <MenuItem value={subCat?._id} onClick={()=>selectSubCatByName(subCat?.name)}>
            {subCat?.name}
            </MenuItem>
            )
          })
            )
           })
           }
        </Select> 
           }
         </div>
      <div className='col mb-4'>
         <h4 className='font-[600] text-[13px] mb-2'>Third Lavel Category By</h4>
             {
         context?.cartData?.length !==0 &&
          <Select
          style={{zoom:'80%'}}
          className='w-full'
          labelId="demo-simple-select-label"
          id="ProductCatDrop"
          size='small'
          value={productThirdLavelCat}
          label="Sub Category"
          onChange={handleChangeProductThirdLavelCat}>
           {
           context?.cartData?.map((cat)=>{
            return(
           cat?.children?.length !==0 && cat?.children?.map((subCat)=>{
            return (
           subCat?.children?.length !==0 && subCat?.children?.map((thirdlevelCat,index_)=>{
            return(
             <MenuItem value={thirdlevelCat?._id} key={index_}
             onClick={()=>selectSubCatByThirdLavel(thirdlevelCat?.name)}>
              {thirdlevelCat?.name}
              </MenuItem>
             )
            }) 
            )
             })
            )
           })
           }
        </Select> 
           }
         </div>
           <div className='col mb-4 flex items-center'>
           <div style={{alignSelf:'end'}} className='w-full'>
            <SeacrhBox/>
            </div>
           </div>
            </div>
            <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
            <TableRow>
            <TableCell>
             <Checkbox {...label} size='small'/>
             </TableCell>
             {columns.map((column) => (
             <TableCell
             key={column.id}
             align={column.align}
             className='!font-[600]'
             style={{ minWidth: column.minWidth}}>
             {column.label}
             </TableCell>
              ))}
            </TableRow>
            </TableHead>
            <TableBody>

             {
             productData?.length !==0 ? productData?.map((product,index)=>{
             return (
            <TableRow key={index}>
            <TableCell style={{minWidth: columns.minWidth}}>
            <Checkbox {...label} size='small'/>
            </TableCell>
             <TableCell style={{minWidth: columns.minWidth}}>
             <div className='flex items-center gap-4 w-[300px]'>
             <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
             <Link to={`/product/${product._id}`}>
             <LazyLoadImage
             alt='image'
             effect='blur'
             className='w-100 group-hover:scale-105 transition-all duration-300'
             src={product.images}
              />
             </Link>
             </div>
             <div className='info w-[75%]'>
           <h3 className='capitalize font-[600] text-[12px] leading-4 transition-all duration-300 hover:text-[#ff5252]'>
           <Link to={`/product/${product._id}`}>
           {product.name}
           </Link>
           </h3>
          <span className='text-[12px]'>{product.brand}</span>
         </div>
         </div>
        </TableCell>
        <TableCell style={{minWidth: columns.minWidth}}>
         {product.catName}
        </TableCell>
        <TableCell style={{minWidth: columns.minWidth}}>
          {product.subCat}
        </TableCell>
        <TableCell style={{minWidth: columns.minWidth}}>
         <div className='flex gap-1 flex-col'>
         <span className='olpPrice line-through text-gray-500 text-[14] font-[500]'>
           &#x20b9; {product.oldPrice}
        </span>
        <span className='price text-[#ff5252] text-[14px] font-[600]'>
          &#x20b9; {product.price}
       </span>
       </div>
      </TableCell>
     <TableCell style={{minWidth: columns.minWidth}}>
     <td className='px-6 py-2'>  
     <p className='text-[14px] w-[100px]'><span className='font-[600]'>{product.sale}</span> sale </p> 
      </td>
      </TableCell>
      <TableCell style={{minWidth: columns.minWidth}}>
     <td className='px-6 py-2'>  
     <p className='text-[14px] w-[100px]'>
      <Rating name="half-rating" defaultValue={product?.rating} size='small' readOnly/>
       </p> 
      </td>
      </TableCell>
      <TableCell style={{minWidth: columns.minWidth}}>
       <td className='px-6 py-2'>
       <div className='flex items-center gap-1'>
      <Tooltip title="Edit Product" placement="top-start">
      <Button className='!w-[35px] !h-[35px] !min-w-[35px]
      bg-[#f1f1f1] !rounded-full hover:bg-[#ccc]' 
       onClick={()=>context.setIsOpenFullScreenPanel({
             open:true,
             modal:'Edit Product',
             id:product._id
            })}>
      <MdOutlineModeEditOutline className='text-[rgba(0,0,0,0.7)] text-[20px]'/>
      </Button>
     </Tooltip>
       <Tooltip title="View Product Details" placement="top-start">
      <Link to={`/product/${product._id}`}>
      <Button className='!w-[35px] !h-[35px] !min-w-[35px]
     bg-[#f1f1f1] !rounded-full hover:bg-[#ccc]'>
     <FaEye className='text-[rgba(0,0,0,0.7)] text-[18px]'/>
     </Button>
    </Link>
     </Tooltip>
     <Tooltip title="Delete Product" placement="top-start">
      <Button className='!w-[35px] !h-[35px] !min-w-[35px]
     bg-[#f1f1f1] !rounded-full hover:bg-[#ccc]' 
      onClick={()=>deleteProduct(product._id)}
      >
      <GoTrash className='text-[rgba(0,0,0,0.7)] text-[18px]'/>
      </Button>
      </Tooltip>
      </div>
       </td>
       </TableCell>
       </TableRow>  
       )   
        }) 
        :
        <>
       <TableRow>
       <TableCell colSpan={8}>
      <div className='flex items-center justify-center w-full min-h-[400px]'>
      <CircularProgress color="inherit" />
       </div> 
       </TableCell>
        </TableRow> 
        </>    
      }      
     </TableBody>
     </Table>
     </TableContainer>
      <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={productData.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={(e, newPage) => handleChangePage(newPage)}
      onRowsPerPageChange={handleChangeRowsPerPage}
      />
     </div> 
     </>
    )
   }
export default Products;
