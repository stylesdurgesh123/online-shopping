import React,{useContext, useState, useEffect} from 'react'
import '../../App.css';
import Button from '@mui/material/Button';
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
//import { BiExport } from "react-icons/bi";
import { MyContext } from '../../App';
import { deleteData, fetchDataFromApi } from '../../utlis/api';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const columns = [
  
    { id: 'image', label: 'Image', minWidth: 250},
    { id: 'title', label: 'TITLE', minWidth: 200},
    { id: 'description', label: 'DESCRIPTION', minWidth: 200},
    { id: 'action', label: 'Action', minWidth: 100 }
  ];
  
  function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }
/*    
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
*/
  
// Utility function to remove HTML tags
const stripHtml = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

function BlogList() {
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

  const [blogData,setBlogData]=useState([]);     
          
  const context=useContext(MyContext);
  
  useEffect(()=>{
   fetchDataFromApi('/api/blog')
   .then((res)=>{
   setBlogData(res?.blogs);
   });
   },[context?.isOpenFullScreenPanel]);

    const deleteBlog = (id) => {
     deleteData(`/api/blog/${id}`)
      .then((res) => {
        console.log(res);
        if (res.error === false) {
        context.openAlertBox('success', res.message);
          fetchDataFromApi('/api/blog')
         .then((res)=>{
        setBlogData(res?.blogs);
        });
        } else {
          context.openAlertBox('error', res.message);
        }
      })
      .catch(err => {
        context.openAlertBox('error', "Failed to delete product.");
        });
     };

   return (
    <>
     <div className='flex items-center justify-between px-2 py-0 mt-3'>
     <h2 className='text-[18px] font-[600]'>Blog List</h2>
        <div className='col w-[40%] ml-auto flex items-center justify-end gap-3'>
          <Button className='!bg-blue-500 !text-white !px-4 whitespace-nowrap' 
           onClick={()=>context.setIsOpenFullScreenPanel({
              open:true,
              modal:'Add Blog'
            })}>Add Blog</Button>
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
                 blogData?.length!==0 && blogData?.map((item,index)=>{
               return (
               <TableRow>
              <TableCell>
               <Checkbox {...label} size='small'/>
               </TableCell>
                <TableCell width={300}>
                <div className='flex items-center gap-4 w-[130px] lg:w-[200px]'>
                <div className="img w-full rounded-md overflow-hidden group">
                <img src={item?.images[0]}/>
                </div> 
                </div>
                </TableCell>
                <TableCell width={200}>
                 <span className='text-[15px] font-[500] block w-[200px] sm:w-[200px] md:w-[300px]'>{item?.title}</span>
                </TableCell>
                          
               <TableCell width={300}>
               <div className='w-[250px] sm:w-[200px] md:w-[300px]'>
                 {
                  
                  item?.description 
                  ? stripHtml(item.description).substring(0, 450) + '...'
                  : 'No Description'
                 }
                 </div>
                </TableCell>
                
                <TableCell width={100}>
                <td className='px-6 py-2'>
                <div className='flex items-center gap-1'>
                <Tooltip title="Edit Product" placement="top-start">
                <Button className='!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1]
                 !rounded-full hover:bg-[#ccc]'
                 onClick={()=>context.setIsOpenFullScreenPanel({
                 open:true,
                 modal:'Edit Blog',
                 id:item?._id
                 })}>
                <MdOutlineModeEditOutline className='text-[rgba(0,0,0,0.7)] text-[20px]'/>
                </Button>
                  </Tooltip>
                  <Tooltip title="Delete Product" placement="top-start">
                  <Button className='!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1]
                   !rounded-full hover:bg-[#ccc]' onClick={()=>deleteBlog(item?._id)}>
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
                   count={blogData?.length}
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
export default BlogList;

