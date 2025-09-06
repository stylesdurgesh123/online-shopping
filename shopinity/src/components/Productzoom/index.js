import React from 'react';
function Productzoom(props) {
  return (
    <div className="flex w-full gap-3">
      <div className="slider w-full max-w-[500px]">
        {
        props?.images?.map((item,index)=>{
         return (
        <div className="item" key={index}>
          <img
           src={item}
           alt="Product"
           className="w-full h-[450px] object-cover rounded-lg shadow-md"/>
        </div>
         ) 
        })
        }
      </div>
    </div>
  );
}

export default Productzoom;
