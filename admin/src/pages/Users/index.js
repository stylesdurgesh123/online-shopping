import React,{useEffect, useState} from 'react'
import '../../App.css';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SeacrhBox from '../../Components/SearchBox';
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
import { fetchDataFromApi } from '../../utlis/api';
import userImg from '../../assets/userImage.jpg';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const columns = [
  
    { id: 'userImg', label: 'USER IMAGE', minWidth: 80},
    { id: 'userName', label: 'USER NAME', minWidth: 100 },
    { id: 'userEmail', label: 'USER EMAIL', minWidth: 150},
    {
      id: 'userPh',
      label: 'USER PHONE NO',
      minWidth: 130,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
       {
      id: 'createdDate',
      label: 'CREATED',
      minWidth: 130,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];
  
  function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }
  
const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
  ];
  
 function Users() {
   
       const [page, setPage] =useState(0);
       const [rowsPerPage, setRowsPerPage] =useState(10);
       
       const [userData,setUserData]=useState([]);
        
        const handleChangePage = (newPage) => {
            setPage(newPage);
          };
        
          const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
          };

  useEffect(()=>{
    fetchDataFromApi(`/api/user/getAllUsers`).then((res)=>{
    setUserData(res?.data)
     })
   },[])

   return (
    <>
       <div className='card my-4 pt-5 shadow-md sm:rounded-lg bg-white'>
       <div className='flex items-center justify-between w-full px-5'>
       <div className='col w-[40%] mb-4'>
       <h2 className='text-[18px] font-[600]'>
        Users List
        </h2>
         </div>
           <div className='col w-[40%] ml-auto mb-4'>
            <SeacrhBox/>
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
              userData?.length!==0 && userData?.map((user,index)=>{
               return(
               <TableRow key={index}>
               <TableCell style={{minWidth: columns.minWidth}}>
               <Checkbox {...label} size='small'/>
              </TableCell>
              <TableCell style={{minWidth: columns.minWidth}}>
              <div className='flex items-center gap-4 w-[70px]'>
              <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
              <Link to='/product/45745'>
               <img src={ user?.avatar !=="" && user?.avatar!==undefined ? user?.avatar : userImg } 
               alt="UserImage" 
               className='w-full group-hover:scale-105 transition-all duration-300'/>
               </Link>
               </div>
               </div>
              </TableCell>
              <TableCell style={{minWidth: columns.minWidth}}>
               {user?.name}
              </TableCell>
              <TableCell style={{minWidth: columns.minWidth}}>
              <span className='flex items-center gap-2'>
               <MdOutlineMarkEmailRead className='text-[18px]'/>   
               {user?.email}
               </span>
              </TableCell>
              <TableCell style={{minWidth: columns.minWidth}}>
               <span className='flex items-center gap-2'> 
               <MdLocalPhone className='text-[18px]'/>
               +{user?.mobile}
               </span>
              </TableCell>
              <TableCell style={{minWidth: columns.minWidth}}>
              <span className='flex items-center gap-2'>
               <BsCalendar2Date className='text-[18px]'/>{user?.createdAt.split('T')[0]}
               </span>
              </TableCell>
              </TableRow>
               )
              })
             }
           </TableBody>
           




           </Table>
           </TableContainer>
           <TablePagination
           rowsPerPageOptions={[10, 25, 100]}
           component="div"
           count={rows.length}
           rowsPerPage={rowsPerPage}
           page={page}
           onPageChange={handleChangePage}
           onRowsPerPageChange={handleChangeRowsPerPage}/>
           <div className='flex items-center justify-end pt-4 pb-4 px-4'>
           <Pagination count={10} color="primary" />
           </div>
          </div> 
         </>
        )
     }
 export default Users;
