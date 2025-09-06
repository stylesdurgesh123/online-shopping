import React, { useEffect, useState } from 'react'
import AccountSlider from '../../components/AccountSidebar';
import Button from '@mui/material/Button';
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import Badge from '../../components/Badge';

import { fetchDataFromApi } from '../../utlis/api';
//import { MyContext } from '../../App';

function Orders() {

const [isOpenOrderProduct,setIsShowOrderProduct]=useState(null);
const [orders,setOrders] = useState([]);

//const context = useContext(MyContext)

const isShowOrderProduct=(index)=>{
  if(isOpenOrderProduct===index){
    setIsShowOrderProduct(null);
  }
  else{
    setIsShowOrderProduct(index);
  }
}
/*
useEffect(() => {
    fetchDataFromApi(`/api/order/order-list`).then((res)=>{
          console.log('rest',res)
        }) 
}, [context?.userData, context?.cartData]);
*/
/*
useEffect(() => {
  fetchDataFromApi(`/api/order/order-list`).then((res)=>{
          console.log('rest',res)
        }) 
}, []);
*/

useEffect(() => {
  fetchDataFromApi(`/api/order/order-list?timestamp=${new Date().getTime()}`)
    .then((res) => {
    if(res?.error===false){
      setOrders(res?.data)
    }
    })
    .catch((err) => {
      console.error('Error fetching orders:', err);
    });
}, []);

  return (
    <section className='py-5 lg:py-10 w-full'>
    <div className='w-[95%] m-auto flex flex-col lg:flex-row gap-5'>
     <div className="col1 w-[20%] hidden lg:block">
       <AccountSlider/>
     </div>
     <div className="col2 w-full lg:w-[80%]">
     <div className='shadow-md rounded-md bg-white'>
        <div className='py-2 px-3 border-b border-[rgba(0,0,0,0.1)]'>
        <h2>My Orders</h2>
         <p className='mt-0'>There are <span className='font-bold text-[#ff5252]'> {orders.length} </span>{' '} orders</p>
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
                  <td className="px-6 py-4"><Badge status={order?.order_status}/></td>
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

             {/*
              <tr className="bg-white border-b">
                  <td className="px-6 py-">
                  <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]'
                  onClick={()=>isShowOrderProduct(1)}>
                    {
                    isOpenOrderProduct===1 ?  <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]'/> 
                    :
                    <FaAngleUp className='text-[16px] text-[rgba(0,0,0,0.7)]'/>
                    }
                  </Button>
                  </td>
                  <td className="px-6 py-4">
                    <span className='text-[#ff5252]'>
                      62170c5af3d27e919f30b100
                      </span>
                    </td>
                  <td className="px-6 py-4">pay_PTP0qEXFirst</td>
                  <td className="px-6 py-4 whitespace-nowrap"> Click here to view </td>
                  <td className="px-6 py-4 whitespace-nowrap">Durgesh Yadav</td>
                  <td className="px-6 py-4">+918948979129</td>
                  <td className="px-6 py-4"><span className='block w-[300px]'>H No 223 Street No 6 Kalyanpur Kanpur</span></td>
                  <td className="px-6 py-4">110053</td>
                  <td className="px-6 py-4">3800</td>
                  <td className="px-6 py-4">dky233@gmail.com</td>
                  <td className="px-6 py-4"><span className='text-[#ff5252]'>62170c5af3d27e919f30b100</span></td>
                  <td className="px-6 py-4"><Badge status='pending'/></td>
                  <td className="px-6 py-4 whitespace-nowrap">2025-04-14</td>
                </tr>

                {
                  isOpenOrderProduct===1 && 
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
                <tr className="bg-white border-b">
                  <td className="px-6 py-">
                  <span className='text-[#ff5252]'>
                      62170c5af3d27e919f30b100
                      </span>
                  </td>
                  <td className="px-6 py-4">
                     A-Line Kurti With Sharara
                    </td>
                  <td className="px-6 py-4">
                    <img src="https://sslimages.shoppersstop.com/sys-master/images/h68/ha4/29951427903518/3755MINT_MINT.jpg_2000Wx3000H" alt=""
                    className='w-[40px] h-[40px] object-cover rounded-md' />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">2</td>
                  <td className="px-6 py-4 whitespace-nowrap">1300</td>
                  <td className="px-6 py-4">1300</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-">
                  <span className='text-[#ff5252]'>
                      62170c5af3d27e919f30b100
                      </span>
                  </td>
                  <td className="px-6 py-4">
                     A-Line Kurti With Sharara
                    </td>
                  <td className="px-6 py-4">
                    <img src="https://sslimages.shoppersstop.com/sys-master/images/h68/ha4/29951427903518/3755MINT_MINT.jpg_2000Wx3000H" alt=""
                    className='w-[40px] h-[40px] object-cover rounded-md' />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">2</td>
                  <td className="px-6 py-4 whitespace-nowrap">1300</td>
                  <td className="px-6 py-4">1300</td>
                </tr>
                </tbody>
                </table>
                 </div>
                  </td>
                 </tr>
                }
               */}
              </tbody>
            </table>
          </div>

        </div>
        </div> 
     </div>
    </div>
    </section>
  )
}

export default Orders;
