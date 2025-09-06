import React,{useContext, useEffect, useState} from 'react'
import '../../App.css';
import { Link } from 'react-router-dom';
import DashboardBoxes from '../../Components/DashboardBoxes';
import shopImg from '../../assets/shop.png';
import Button from '@mui/material/Button';
import { FaPlus } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import Badge from '../../Components/Badge';
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
import { MyContext } from '../../App';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CircularProgress from '@mui/material/CircularProgress';
import { Rating } from '@mui/material';

import { XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar,} from 'recharts';
import { deleteData, fetchDataFromApi } from '../../utlis/api';
import SeacrhBox from '../../Components/SearchBox';

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

function Dashbord() {

  const context=useContext(MyContext);

  const [productData,setProductData]=useState([]);
  const [productCat, setProductCat] =useState('');
  const [productSubCat, setProducSubtCat] =useState('');
  const [productThirdLavelCat,setProductThirdLavelCat]=useState('');
  const [isOpenOrderProduct,setIsShowOrderProduct]=useState(null);
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

 const [orders,setOrders] = useState([]); 
 
    useEffect(()=>{
    getProduct();
     },[context?.isOpenFullScreenPanel]);     

  const isShowOrderProduct=(index)=>{
    if(isOpenOrderProduct===index){
      setIsShowOrderProduct(null);
    }
    else{
      setIsShowOrderProduct(index);
    }
  }
  
 useEffect(() => {
  fetchDataFromApi(`/api/order/order-list?timestamp=${new Date().getTime()}`)
    .then((res) => {
      console.log('rest', res);
    if(res?.error===false){
      setOrders(res?.data)
    }
    })
    .catch((err) => {
      console.error('Error fetching orders:', err);
    });
}, []);

  const [page, setPage] =useState(0);
  const [rowsPerPage, setRowsPerPage] =useState(10);

  const [chartData,setChartData]=useState([]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

const getTotalUsersByYear = () =>{
 fetchDataFromApi(`/api/order/users`).then((res)=>{
  const users = [];
  res?.totalUsers?.length !==0 && 
  res?.totalUsers?.map((item)=>{
   users.push({
    name: item?.name,
    totalUsers: parseInt(item?.totalUsers)
    });
  });

const uniqueArr = users.filter(
 (obj,index,self)=>
 index === self.findIndex((t)=>t.name === obj.name)
);
setChartData(uniqueArr);
 })
}

const getTotalSalesByYear = () =>{
 fetchDataFromApi(`/api/order/sales`).then((res)=>{
  const sales = [];
  res?.monthlySales?.length !==0 && 
  res?.monthlySales?.map((item)=>{
   sales.push({
    name: item?.name,
    totalSales: parseInt(item?.totalSales)
    });
  });

const uniqueArr = sales.filter(
 (obj,index,self)=>
 index === self.findIndex((t)=>t.name === obj.name)
);
setChartData(uniqueArr);
 })
}

  return (
    <>
    <div className='w-full py-5 px-5 border bg-white border-[rgba(0,0,0,0.1)]
     flex items-center justify-between rounded-md gap-8 mb-5'>
       <div className="info">
        <h3 className='text-[28px] sm:text-[30px] font-bold leading-10 mb-2'>Good Morning,<br /> Durgesh</h3>
        <p>Here's what happeing on your store today.See the statistics at once.</p>
        <br />
        <Button className='btn-blue !capitalize'><FaPlus />Add Product</Button>
       </div>
       <img src={shopImg} alt="shopImage" 
       className='w-[250px] hidden lg:block'/>
     </div>
     <DashboardBoxes/> 
     <div className='card my-4 pt-5 shadow-md sm:rounded-lg bg-white'>
     <div className='grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 justify-between gap-4 w-full px-5'>
     <div className='col mb-4'>
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
      <div className='col mb-4'>
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
                 <TableRow>
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
           <Rating name="half-rating" defaultValue={product?.rating} size='small'/>
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
        <div className='card my-3 shadow-md sm:rounded-lg bg-white'>
        <div className='grid grid-cols-1 lg:grid-cols-2 px-5 py-5 flex-col sm:flex-row'>
        <h2 className='text-[18px] font-[600] text-left mb-2 lg:mb-0'>Recent Orders</h2>
        <div className='ml-auto w-full'>
         <SeacrhBox/>
        </div>
        </div>
             <div className="relative overflow-scroll mt-5">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 bg-gray-50">
                <tr>
                <th className="px-6 py-3">
                 &nbsp;
                </th>
                  <th className="px-6 py-3 whitespace-nowrap">Order Id</th>
                  <th className="px-6 py-3 whitespace-nowrap">Payment Id</th>
                  <th className="px-6 py-3 whitespace-nowrap">Name</th>
                  <th className="px-6 py-3 whitespace-nowrap">Phone Number</th>
                  <th className="px-6 py-3 whitespace-nowrap">Address</th>
                  <th className="px-6 py-3 whitespace-nowrap">Pincode</th>
                  <th className="px-6 py-3 whitespace-nowrap">Total Amount</th>
                  <th className="px-6 py-3 whitespace-nowrap">Email</th>
                  <th className="px-6 py-3 whitespace-nowrap">User Id</th>
                  <th className="px-6 py-3 whitespace-nowrap">Order Status</th>
                  <th className="px-6 py-3 whitespace-nowrap">Date</th>
                </tr>
              </thead>
              <tbody>

             {
              orders?.length!==0 && orders?.map((order,index)=>{
              return(
               <>
                   <tr className="bg-white border-b">
                  <td className="px-6 py-">
                  <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]'
                  onClick={()=>isShowOrderProduct(index)}>
                    {
                    isOpenOrderProduct===index ?  <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]'/> 
                    :
                    <FaAngleUp className='text-[16px] text-[rgba(0,0,0,0.7)]'/>
                    }
                  </Button>
                  </td>
                  <td className="px-6 py-4">
                    <span className='text-[#ff5252]'>
                     {order?._id}
                      </span>
                    </td>
                  <td className="px-6 py-4">{order?.paymentId ? order?.paymentId : 'CASH ON DELIVERY'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order?.userId?.name}</td>
                  <td className="px-6 py-4">+{order?.delivery_address?.mobile}</td>
                  <td className="px-6 py-4">
                  <span className='block w-[300px]'>
                  {order?.delivery_address?.
                  address_line1 + " " + 
                  order?.delivery_address?.city + " " + 
                  order?.delivery_address?.state + " " +
                  order?.delivery_address?.landmark + " " +
                  order?.delivery_address?.pincode + " " +
                  order?.delivery_address?.country
                  }
                  </span>
                  </td>
                  <td className="px-6 py-4">{order?.delivery_address?.pincode}</td>
                  <td className="px-6 py-4">{order?.totalAmt}</td>
                  <td className="px-6 py-4">{order?.userId?.email}</td>
                  <td className="px-6 py-4">
                  <span className='text-[#ff5252]'>
                  {order?.userId?._id}
                  </span>
                  </td>
                  <td className="px-6 py-4">
                  <Badge status={order?.order_status}/>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{order?.createdAt?.split('T')[0]}</td>
                </tr>

                {
                  isOpenOrderProduct===index && 
                  <tr>
                  <td className='pl-20' colSpan={6}>
                  <div className="relative overflow-scroll">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 whitespace-nowrap">Product Id</th>
                  <th className="px-6 py-3 whitespace-nowrap">Product Title</th>
                  <th className="px-6 py-3 whitespace-nowrap">Image</th>
                  <th className="px-6 py-3 whitespace-nowrap">Quantity</th>
                  <th className="px-6 py-3 whitespace-nowrap">Price</th>
                  <th className="px-6 py-3 whitespace-nowrap">SubTotal</th>
                </tr>
              </thead>
              <tbody>
              {
                order?.products?.map((item,index)=>{
                 return(
                <tr className="bg-white border-b">
                  <td className="px-6 py-">
                  <span className='text-[#ff5252]'>
                     {item?.productId}
                      </span>
                  </td>
                  <td className="px-6 py-4">
                    {item?.productTitle}
                    </td>
                  <td className="px-6 py-4">
                    <img src={item?.image} alt="productImage"
                    className='w-[40px] h-[40px] object-cover rounded-md' />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item?.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item?.price}</td>
                  <td className="px-6 py-4">{item?.price * item?.quantity}</td>
                </tr>
                 )
                })
              }
                </tbody>
                </table>
                 </div>
                  </td>
                 </tr>
                }
               </>
              )
              })
             }
             
              </tbody>
            </table>
          </div>
             </div>
             <div className='card my-3 shadow-md sm:rounded-lg bg-white'>
              <div className='flex items-center justify-between px-5 py-5 pb-0'>
              <h2 className='text-[18px] font-[600]'>Total User & Total Sales</h2>
              </div>
              <div className='flex items-center gap-5 px-5 py-5 pt-0'>
                <span className='flex items-center gap-1 text-[15px] cursor-pointer' onClick={getTotalUsersByYear}>
                <span className='block w-[8px] h-[8px] rounded-full bg-green-500'>
                </span>Total Users</span>
                <span className='flex items-center gap-1 text-[15px] cursor-pointer' onClick={getTotalSalesByYear}>
                <span className='block w-[8px] h-[8px] rounded-full bg-blue-500'>
                </span>Total Sales</span>
              </div>
            {
             chartData?.length !==0 && 
             <BarChart 
             width={ context?.windowWidth > 920 ? (context?.windowWidth - 300) : (context?.windowWidth-90) }
             height={500}
             data={chartData}
             margin={{
             top: 5,
             right: 30,
             left: 20,
             bottom: 5,
             }}>
            <CartesianGrid strokeDasharray="3 3" stroke='none'/>
            <XAxis dataKey="name" tick={{fontSize :12}}/>
            <YAxis tick={{fontSize :12}}/>
            <Tooltip />
            <Legend />
            <Bar dataKey="totalUsers" fill="#3E7B27" />
           <Bar dataKey="totalSales" fill="#8884d8" />
            </BarChart>
            }
           </div>
           </>
         )
        }

export default Dashbord;
