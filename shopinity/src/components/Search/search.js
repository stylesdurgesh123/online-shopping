import React, { useState,useContext } from 'react';
import Button from '@mui/material/Button';
import { IoSearch } from "react-icons/io5";
import { MyContext } from '../../App';
import { fetchDataFromApi } from '../../utlis/api';
import { useNavigate } from 'react-router-dom';

function Search() {

const [searchQuery,setSearchQuery]=useState('');

const context = useContext(MyContext);
const navigate = useNavigate(); 

const onChangeInput = (e)=>{
 setSearchQuery(e.target.value);
}

const search = ()=>{
fetchDataFromApi(`/api/product/search/get?query=${searchQuery}&page=1&limit=100`).then((res) => {
  context?.setSearchData(res);
  context?.setOpenSearchPanel(false)
  navigate('/search');
 });
}

 return (
   <div className='w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2'>
    <input 
     type="text" 
     placeholder='Search for products...' 
     className='w-full h-[35px] focus:outline-none bg-inherit p-2 text-[15px]'
     value={searchQuery}
     onChange={onChangeInput}
     />
     <Button
    type="submit"
    className="!absolute right-3 top-1/2 -translate-y-1/2
    text-gray-600 hover:text-black" onClick={search}>
    <IoSearch size={20} className='text-black'/>
    </Button>
    </div>
  )
}

export default Search;  

