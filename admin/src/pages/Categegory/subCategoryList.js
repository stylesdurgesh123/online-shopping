import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button';
import { BiExport } from "react-icons/bi";
import { MyContext } from '../../App';
import { FaAngleDown } from "react-icons/fa";
import EditSubCatBox from './editSubCatBox';

function SubCategoryList() {

 const [isOpen,setIsOpen]=useState(0);

 const context=useContext(MyContext);

 const expend=(index)=>{
   if(isOpen===index){
    setIsOpen(!isOpen);
   } else{
    setIsOpen(index);
   }
 }

  return (
  <>
   <div className='flex items-center flex-col md:flex-row justify-start md:justify-between px-2 py-0 mt-3'>
   <h2 className='text-[18px] font-[600] w-full md:w-[50%] mb-2 md:mb-0'>Sub Category List</h2>
   <div className='col mr-auto md:mr-0 md:ml-auto flex items-center justify-end gap-3'>
        <Button className='!bg-blue-500 !text-white !px-4' 
         onClick={()=>context.setIsOpenFullScreenPanel({
          open:true,
          modal:'Add New Sub Category'
         })}>Add New Sub Category</Button>
       </div>
      </div>

   <div className='card my-4 pt-5 pb-5 px-5 shadow-md sm:rounded-lg bg-white'>
    {
   context?.cartData?.length !==0 && 
    <ul className='w-full'>
      {
      context?.cartData?.map((firstLevelCat,index)=>{
       return (
        <li className='w-full mb-1' key={index}>
         <div className='flex items-center w-full p-2 bg-[#f1f1f1] rounded-sm px-4'>
          <span className='font-[500] flex items-center gap-4 text-[14px]'>
           {firstLevelCat?.name}
          </span>
          <Button className='!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black
          !ml-auto' onClick={()=>expend(index)}>
          <FaAngleDown />
          </Button>
         </div>

          {
            isOpen === index &&
            <>
            {
            firstLevelCat?.children?.length !==0 &&
             <ul className='w-full'>
              {firstLevelCat?.children?.map((subCat,index_)=>{
                return (
              <li className='w-full py-1' key={index_}>
                <EditSubCatBox name={subCat?.name} 
                id={subCat?._id}
                catData={context?.cartData}
                index={index_}
                selectedCat={subCat?.parentId}
                selectedCatName={subCat?.parentCatName}/>
                 {subCat?.children?.length !== 0 && 
                <ul className='pl-4'>
               {
               subCat?.children?.map((thirdLevel, index_) => {
                  return (
                  <li key={index_} className='w-full py-1'>
                  <EditSubCatBox
                  name={thirdLevel?.name}
                  id={thirdLevel?._id}
                  catData={context?.cartData}
                  index={index_}
                  selectedCat={thirdLevel?.parentId}
                  selectedCatName={thirdLevel?.parentCatName}/>
                  </li>
                 );
                })
              }
             </ul>
                }
              </li>
                )
              })}
             </ul>
            }
            </>
          }

        </li>
       )
      })
      }
    </ul>
    }
   </div>
      </>
  )
}

export default SubCategoryList









/*import React,{useContext, useEffect, useState} from 'react'
import '../../App.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import { MdOutlineModeEditOutline } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import Tooltip from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { BiExport } from "react-icons/bi";
import { MyContext } from '../../App';
import Chip from '@mui/material/Chip';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const columns = [
  
    { id: 'image', label: 'CATEGORY IMAGE', minWidth: 250},
    { id: 'catName', label: 'CATEGORY NAME', minWidth: 250},
    { id: 'subCatName', label: 'SUB CATEGORY NAME', minWidth: 400},
    { id: 'action', label: 'Action', minWidth: 100 }
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
  
function SubCategoryList() {
    const [categoryFilterValue, setcategoryFilterValue] =useState('');
    const handleChangeCatFilter = (event) => {
        setcategoryFilterValue(event.target.value);
      };
       const [page, setPage] =useState(0);
        const [rowsPerPage, setRowsPerPage] =useState(10);
        const handleChangePage = (newPage) => {
            setPage(newPage);
          };
        
          const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
          };

      const context=useContext(MyContext);

  return (
    <>
     <div className='flex items-center justify-between px-2 py-0 mt-3'>
     <h2 className='text-[18px] font-[600]'>Sub Category List <span className='text-[14px] font-[400]'>
        (Matrial Ui table)</span>
        </h2>
        <div className='col w-[40%] ml-auto flex items-center justify-end gap-3'>
          <Button className='!bg-green-500 !text-white !px-4'><BiExport className='text-[19px]'/>Export</Button>
          <Button className='!bg-blue-500 !text-white !px-4' onClick={()=>context. 
            setIsOpenFullScreenPanel({
              open:true,
              modal:'Add New Sub Category'
            })}>Add New Sub Category</Button>
            </div>
           </div>
           <div className='card my-4 pt-5 shadow-md sm:rounded-lg bg-white'>
            <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
            <TableRow>
            <TableCell width={60}>
             <Checkbox {...label} size='small'/>
             </TableCell>
             {columns.map((column) => (
             <TableCell
              width={column.minWidth}
              key={column.id}
              align={column.align}
              className='!font-[600]'>
              {column.label}
              </TableCell>
                ))}
              </TableRow>             
              </TableHead>
              <TableBody>
              {
            context?.cartData?.length!==0 &&  context?.cartData?.map((item,index)=>{
               return(
                    <TableRow>
              <TableCell>
               <Checkbox {...label} size='small'/>
               </TableCell>
                <TableCell width={100}>
                <div className='flex items-center gap-4 w-[80px]'>
                <div className="img w-full rounded-md overflow-hidden group">
                <Link to='/product/45745'>
                <img src="https://images-eu.ssl-images-amazon.com/images/I/71maVq6ajOL._AC_SR462,693_.jpg" alt="" 
                className='w-full group-hover:scale-105 transition-all duration-300'/>
                </Link>
                </div> 
                </div>
                </TableCell>
                <TableCell> 
                <Chip label="Fashion" />
               </TableCell>
               <TableCell> 
               <div className='flex items-center gap-3'>
               <Chip label="Men" color='primary'/>
               <Chip label="Women" color='primary'/>
               <Chip label="Kids" color='primary'/>
               </div>
               </TableCell>
                <TableCell width={100}>
                <td className='px-6 py-2'>
                <div className='flex items-center gap-1'>
                <Tooltip title="Edit Product" placement="top-start">
                <Button className='!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !rounded-full hover:bg-[#ccc]'>
                <MdOutlineModeEditOutline className='text-[rgba(0,0,0,0.7)] text-[20px]'/>
                 </Button>
                 </Tooltip>
                 <Tooltip title="Delete Product" placement="top-start">
                 <Button className='!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !rounded-full hover:bg-[#ccc]'>
                 <GoTrash className='text-[rgba(0,0,0,0.7)] text-[18px]'/>
                 </Button>
                 </Tooltip>
                </div>
               </td>
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
  export default SubCategoryList;*/

