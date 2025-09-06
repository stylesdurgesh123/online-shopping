import React, {useState,createContext, useEffect } from 'react';
import './responsive.css';
import Header from './components/Header/index';
import Footer from './components/Footer';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails/index';  
import Login from './pages/Login';
import Register from './pages/Register';
import CartPage from './pages/CartPage';
import Verify from './pages/Verify';
import toast, { Toaster } from 'react-hot-toast';
import ForgotPassword from './pages/ForgotPassword';
import Checkout from './pages/Checkout';
import MyAccount from './pages/MyAccount';
import MyList from './pages/MyList';
import Orders from './pages/Orders';
import { fetchDataFromApi, postData } from './utlis/api';
import Address from './pages/MyAccount/address';
import OrderSuccess from './pages/Orders/successPage';
import OrderFailed from './pages/Orders/failed';
import SearchPage from './pages/SearchPage';

const MyContext=createContext();
function App() {

  const [openProductDetailModal, setOpenProductDetailModal] =useState({
    open: false,
    item: {}
  });
  const [maxWidth, setMaxWidth] = useState('lg');
  const [fullWidth, setFullWidth] =useState(true);
  const [isLogin,setIsLogin]=useState(false);
  const [userData,setUserData] = useState(null);
  const [catData,setCatData]=useState([]);
  const [cartData,setCartData]=useState([]);
  const [myList,setMyList]=useState([]);
  const [addressMode,setAddressMode]=useState('add');
  const [openCartPanel, setOpenCartPanel] =useState(false);
  const [openAddressPanel, setOpenAddressPanel] =useState(false);
  const [addressId,setAddressId]=useState();
  const [searchData,setSearchData]=useState([]);
  const [windowWidth,setWindowWidth]=useState(window.innerWidth);
  const [openSearchPanel,setOpenSearchPanel] = useState(false);
  
  const handleOpenProductDetailModal = (status,item)=>{
    setOpenProductDetailModal({
      open: status,
      item: item
    });
  }
  
  const handleCloseProductDetailModal = () => {
    setOpenProductDetailModal({
      open: false,
      item: {}
    });
  };
  

  const toggleCartPanel = (newOpen) => () => {
    if(newOpen===false){
    setAddressMode('add');
    }
    setOpenCartPanel(newOpen);
  };

 const toggleAddressPanel = (newOpen) => () => {
    setOpenAddressPanel(newOpen);
  }; 

    // refresh cart function
  const refreshCart = () => {
   fetchDataFromApi(`/api/cart/get`)
      .then((res) => {
        if (res?.error === false) {
          setCartData(res?.data);
        }
      });
  };
  
  const getUserDetails=()=>{
   const token = localStorage.getItem('accessToken'); 
   fetchDataFromApi(`/api/user/user-details?token=${token}`).then((res)=>{
    setUserData(res.data);
    if(res?.response?.data?.error===true){
    if(res?.response?.data?.message==='You have not login'){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    openAlertBox('error','Your session is closed please login again');
     setIsLogin(false); 
    }
    }
   });  
}  
  useEffect(()=>{
   const token = localStorage.getItem('accessToken'); 
   if(token!==undefined  && token!==null && token!==""){
   setIsLogin(true);

  refreshCart(); // use refreshCart
  getMyListData();
  getUserDetails();

   }else{
    setIsLogin(false);
   }
  },[isLogin])
  
   useEffect(()=>{
    fetchDataFromApi('/api/category')
    .then((res)=>{
     if(res.error===false){
      setCatData(res?.data);
     }
    })
    },[]);

 useEffect(() => {
  const handleResize = () => {
   setWindowWidth(window.innerWidth);
  };  
  window.addEventListener('resize', handleResize);
 return () => {
  window.removeEventListener('resize', handleResize);
 }
 },[])
 
  const openAlertBox=(value,msg)=>{
    if(value==='success'){
      toast.success(msg)
    }

    if(value==='error'){
      toast.error(msg)
    }
  }

 const addToCart=(product,userId,quantity)=>{
  if(userId===undefined){
  openAlertBox('error','Your are not login'); 
  return false;  
  }
 const data={
 productTitle:product?.name,
 image:product?.image,
 rating:product?.rating,
 price:product?.price,
 oldPrice:product?.oldPrice,
 discount:product?.discount,
 productRam:product?.productRam,
 size:product?.size,
 productWeight:product?.productWeight,
 brand:product?.brand,
 quantity:quantity,
 subTotal:parseInt(product?.price * quantity),
 productId:product?._id,
 countInStock:product?.countInStock,
 userId:userId
 } 
 postData('/api/cart/add',data)
 .then((res)=>{
  if(res?.error===false){
  openAlertBox('success',res?.message);
   refreshCart();
  }else{
  openAlertBox('error',res?.message);  
  }
 })
 } 

const getMyListData=()=>{
 fetchDataFromApi('/api/myList')
 .then((res)=>{
 if(res?.error===false){
 setMyList(res?.data);
 }
  })
 } 

const values={
  openProductDetailModal,
  setOpenProductDetailModal,
 // handleOpenProductDetailModal,
  handleOpenProductDetailModal,
  handleCloseProductDetailModal,
  maxWidth, 
  setMaxWidth,
  fullWidth, 
  setFullWidth,
  setOpenCartPanel,
  toggleCartPanel,
  openCartPanel,
  setOpenAddressPanel,
  toggleAddressPanel,
  openAddressPanel,
  openAlertBox,
  isLogin,
  setIsLogin,
  setUserData,
  userData,
  catData,
  setCatData,
  addToCart,
  cartData,
  setCartData,
  refreshCart,
  myList,
  getMyListData,
  setMyList,
  getUserDetails,
  setAddressMode,
  addressMode,
  addressId,
  setAddressId,
  searchData,
  setSearchData,
  windowWidth,
  openSearchPanel,
  setOpenSearchPanel
    };

  return (
    <>
      <BrowserRouter>
      <MyContext.Provider value={values}>
      <Header/>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/productListing" element={<ProductListing/>}/>
      <Route path="/product/:id" element={<ProductDetails/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/cartpage" element={< CartPage/>}/>
      <Route path="/verify" element={<Verify/>}/>
      <Route path="/forgotpassword" element={<ForgotPassword/>}/>
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path="/my-account" element={<MyAccount/>}/>
      <Route path="/my-list" element={<MyList/>}/>
      <Route path="/my-orders" element={<Orders/>}/>
      <Route path="/order/success" element={<OrderSuccess/>}/>
      <Route path="/order/failed" element={<OrderFailed/>}/> 
      <Route path="/address" element={<Address/>}/>
      <Route path="/search" element={<SearchPage/>}/>
    </Routes>
    <Footer/>
    </MyContext.Provider>
    </BrowserRouter>
      
     <Toaster/>

    </>
  )
}

export default App;
export {MyContext}
