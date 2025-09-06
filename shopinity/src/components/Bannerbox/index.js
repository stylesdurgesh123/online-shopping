import React from 'react'
import { Link } from 'react-router-dom'
function BannerBox(props) {
  return (
    <>
  <div className='bannerBox overflow-hidden rounded-lg group'>
  <Link to='/'>
   <img src={props.img} alt="bannerimage" className='w-full transition-transform 
   duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-1'/>
   </Link>
  </div>
    </>
  )
}

export default BannerBox
