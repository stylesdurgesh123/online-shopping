import React, { useEffect, useState } from 'react';
import './responsive.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashbord from './pages/Dashbord';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import { createContext } from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Products from './pages/Products';
import toast, { Toaster } from 'react-hot-toast';
import HomeSliderBanners from './pages/HomeSliderBanners';
import CategoryList from './pages/Categegory';
import SubCategoryList from './pages/Categegory/subCategoryList';
import Users from './pages/Users';
import Orders from './pages/Orders';
import ForgotPassword from './pages/ForgotPassword';
import VerifyAccount from './pages/VerifyAccount';
import ChangePassword from './pages/ChangePassword';
import { fetchDataFromApi } from './utlis/api';
import Profile from './pages/Profile';
import ProductDetails from './pages/Products/productDetails';
import AddRAMS from './pages/Products/addRAMS';
import AddWeight from './pages/Products/addWEIGHT';
import AddSize from './pages/Products/addSize';
import BannerV1List from './pages/Banners/bannerV1List';
import BlogList from './pages/Blog';

const MyContext=createContext();
function App() {
  const [isSidebarOpen,setSidebarOpen]=useState(true);
  const [isLogin,setIsLogin]=useState(false);
  const [userData,setUserData] = useState(null);
  const [cartData,setCartData]=useState([]);
  const [windowWidth,setWindowWidth]=useState(window.innerWidth);
  const [sidebarWidth,setSidebarWidth]=useState(18);

  const [isOpenFullScreenPanel,setIsOpenFullScreenPanel]=useState({
    open:false,
    modal:'',
    id:''
  });
    
   const fetchCategories = async () => {
    try {
      const res = await fetchDataFromApi('/api/category');
      setCartData(res?.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(()=>{
  const token = localStorage.getItem('accessToken'); 
   if(token!==undefined  && token!==null && token!==""){
    setIsLogin(true);
 // fetchDataFromApi(`/api/user/user-details?token=${token}`)
   fetchDataFromApi(`/api/user/user-details`,token).then((res)=>{
    setUserData(res.data);
    console.log(res?.response?.data?.error)
    if(res?.response?.data?.error===true){
    if(res?.response?.data?.message==='You have not login'){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    openAlertBox('error','Your session is closed please login again');
     setIsLogin(false); 
    }
    }
   });

   }else{
    setIsLogin(false);
   }  
},[isLogin])

useEffect(() => {
 const handleResize = () => {
  setWindowWidth(window.innerWidth);
 };  
 window.addEventListener('resize', handleResize);
return () => {
 window.removeEventListener('resize', handleResize);
}
},[])

useEffect(() => {
  if (windowWidth < 992) {
    setSidebarOpen(false);
    setSidebarWidth(100);
  } else {
    setSidebarOpen(true); 
    setSidebarWidth(18);
  }
}, [windowWidth]);

 const openAlertBox=(value,msg)=>{
  if(value==='success'){
  toast.success(msg)
 }
  
 if(value==='error'){
  toast.error(msg)
  }
}

 const router = createBrowserRouter([
   {
    path: "/",
    element:(
    <>
  {/*  <section className='main'>
     <Header/>
     <div className='contnetMain flex'>
      <div className={`sidebarWrapper overflow-hidden transition-all duration-300 ${isSidebarOpen ? windowWidth < 992 ?  `w-[${sidebarWidth/1.5}%]` : `w-[${sidebarWidth}%]` : 'w-0 opacity-0'}`}>
     <Sidebar />
     </div>
      <div className={`contentRight py-4 px-5 transition-all duration-300 ${isSidebarOpen ? `w-[${100-sidebarWidth}%]` : 'w-full'}`}>
     <Dashbord />
       </div>
         </div>
        </section>*/}
   <section className='main'>
     <Header/>
    <div className='contnetMain flex'>
     <div
      className={`sidebarWrapper overflow-hidden transition-all duration-300`}
       style={{ width: windowWidth < 992 ? isSidebarOpen ? "70%" : "0%" : isSidebarOpen ? `${sidebarWidth}%` : "0%", }}
       >
      <Sidebar />
    </div>
    <div
     className="contentRight py-4 px-5 transition-all duration-300"
      style={{ width: windowWidth < 992 ? "100%" : isSidebarOpen ? `${100 - sidebarWidth}%` : "100%",}}>
      <Dashbord />
    </div>
  </div>
</section>

       </>
      ),
    },
    {
      path: "/login",
      element:(
        <>
        <Login/>
       </>
      ),
    },
    {
      path: "/signup",
      element:(
        <>
        <SignUp/>
       </>
      ),
    },
    {
      path: "/products",
      element:(
        <>
        <section className='main'>
         <Header/>
         <div className='contnetMain flex'>
         <div className={`sidebarWrapper overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'w-[18%]' : 'w-0 opacity-0'}`}>
         <Sidebar />
        </div>
      <div className={`contentRight py-4 px-5 transition-all duration-300 ${isSidebarOpen ? 'w-[82%]' : 'w-full'}`}>
     <Products/>
       </div>
         </div>
        </section>
       </>
      ),
    },
    {
      path: "/homeSlider/list",
      element:(
        <>
        <section className='main'>
         <Header/>
         <div className='contnetMain flex'>
         <div className={`sidebarWrapper overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'w-[18%]' : 'w-0 opacity-0'}`}>
         <Sidebar />
        </div>
      <div className={`contentRight py-4 px-5 transition-all duration-300 ${isSidebarOpen ? 'w-[82%]' : 'w-full'}`}>
     <HomeSliderBanners/>
       </div>
         </div>
        </section>
       </>
      ),
    },
    {
      path: "/category/list",
      element:(
        <>
        <section className='main'>
         <Header/>
         <div className='contnetMain flex'>
         <div className={`sidebarWrapper overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'w-[18%]' : 'w-0 opacity-0'}`}>
         <Sidebar />
        </div>
      <div className={`contentRight py-4 px-5 transition-all duration-300 ${isSidebarOpen ? 'w-[82%]' : 'w-full'}`}>
      <CategoryList/>
       </div>
         </div>
        </section>
       </>
      ),
    },
    {
      path: "/subCategory/list",
      element:(
        <>
        <section className='main'>
         <Header/>
         <div className='contnetMain flex'>
         <div className={`sidebarWrapper overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'w-[18%]' : 'w-0 opacity-0'}`}>
         <Sidebar />
        </div>
      <div className={`contentRight py-4 px-5 transition-all duration-300 ${isSidebarOpen ? 'w-[82%]' : 'w-full'}`}>
      <SubCategoryList/>
       </div>
         </div>
        </section>
       </>
      ),
    },
    {
      path: "/users",
      element:(
        <>
        <section className='main'>
         <Header/>
         <div className='contnetMain flex'>
         <div className={`sidebarWrapper overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'w-[18%]' : 'w-0 opacity-0'}`}>
         <Sidebar />
        </div>
      <div className={`contentRight py-4 px-5 transition-all duration-300 ${isSidebarOpen ? 'w-[82%]' : 'w-full'}`}>
      <Users/>
       </div>
         </div>
        </section>
       </>
      ),
    },
    {
      path: "/orders",
      element:(
        <>
        <section className='main'>
         <Header/>
         <div className='contnetMain flex'>
         <div className={`sidebarWrapper overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'w-[18%]' : 'w-0 opacity-0'}`}>
         <Sidebar />
        </div>
      <div className={`contentRight py-4 px-5 transition-all duration-300 ${isSidebarOpen ? 'w-[82%]' : 'w-full'}`}>
      <Orders/>
       </div>
         </div>
        </section>
       </>
      ),
    },
    {
      path: "/verify-account",
      element:(
        <>
        <VerifyAccount/>
       </>
      ),
    },
    {
      path: "/change-password",
      element:(
        <>
        <ChangePassword/>
       </>
      ),
    },
    {
      path: "/forgot-password",
      element:(
        <>
        <ForgotPassword/>
       </>
      ),
    },
    {
      path: "/profile",
      element:(
        <>
        <section className='main'>
         <Header/>
         <div className='contnetMain flex'>
         <div className={`sidebarWrapper overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'w-[18%]' : 'w-0 opacity-0'}`}>
         <Sidebar />
        </div>
      <div className={`contentRight py-4 px-5 transition-all duration-300 ${isSidebarOpen ? 'w-[82%]' : 'w-full'}`}>
      <Profile/>
       </div>
         </div>
        </section>
       </>
      ),
    },
    {
     path: "/product/:id",
      element:(
        <>
        <section className='main'>
         <Header/>
         <div className='contnetMain flex'>
         <div className={`sidebarWrapper overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'w-[18%]' : 'w-0 opacity-0'}`}>
         <Sidebar />
        </div>
      <div className={`contentRight py-4 px-5 transition-all duration-300 ${isSidebarOpen ? 'w-[82%]' : 'w-full'}`}>
      <ProductDetails/>
       </div>
         </div>
        </section>
       </>
      ),
    },
    {
     path: "/products/addRams",
      element:(
        <>
        <section className='main'>
         <Header/>
         <div className='contnetMain flex'>
         <div className={`sidebarWrapper overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'w-[18%]' : 'w-0 opacity-0'}`}>
         <Sidebar />
        </div>
      <div className={`contentRight py-4 px-5 transition-all duration-300 ${isSidebarOpen ? 'w-[82%]' : 'w-full'}`}>
       <AddRAMS/>
       </div>
         </div>
        </section>
       </>
      ),
    },
    {
     path: "/products/addWeight",
      element:(
        <>
        <section className='main'>
         <Header/>
         <div className='contnetMain flex'>
         <div className={`sidebarWrapper overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'w-[18%]' : 'w-0 opacity-0'}`}>
         <Sidebar />
        </div>
      <div className={`contentRight py-4 px-5 transition-all duration-300 ${isSidebarOpen ? 'w-[82%]' : 'w-full'}`}>
       <AddWeight/>
       </div>
         </div>
        </section>
       </>
      ),
    },
    {
     path: "/products/addSize",
      element:(
        <>
        <section className='main'>
         <Header/>
         <div className='contnetMain flex'>
         <div className={`sidebarWrapper overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'w-[18%]' : 'w-0 opacity-0'}`}>
         <Sidebar />
        </div>
      <div className={`contentRight py-4 px-5 transition-all duration-300 ${isSidebarOpen ? 'w-[82%]' : 'w-full'}`}>
       <AddSize/>
       </div>
         </div>
        </section>
       </>
      ),
    },
    {
     path: "/bannerV1List",
      element:(
        <>
        <section className='main'>
         <Header/>
         <div className='contnetMain flex'>
         <div className={`sidebarWrapper overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'w-[18%]' : 'w-0 opacity-0'}`}>
         <Sidebar />
        </div>
      <div className={`contentRight py-4 px-5 transition-all duration-300 ${isSidebarOpen ? 'w-[82%]' : 'w-full'}`}>
       <BannerV1List/>
       </div>
         </div>
        </section>
       </>
      ),
    }, 
    {
     path: "/blogList",
      element:(
        <>
        <section className='main'>
         <Header/>
         <div className='contnetMain flex'>
         <div className={`sidebarWrapper overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'w-[18%]' : 'w-0 opacity-0'}`}>
         <Sidebar />
        </div>
      <div className={`contentRight py-4 px-5 transition-all duration-300 ${isSidebarOpen ? 'w-[82%]' : 'w-full'}`}>
       <BlogList/>
       </div>
         </div>
        </section>
       </>
      ),
    },
  ]);
 
  useEffect(()=>{
   fetchDataFromApi('/api/category')
   .then((res)=>{
   setCartData(res?.data);
   })
  },[])

/*
 useEffect(() => {
  fetchDataFromApi('/api/category')
    .then((res) => {
      const cleanedData = res?.data?.map(item => ({
        id: item._id,   
        name: item.name,
      }));
      setCartData(cleanedData);
    });
}, []);
*/

 const values={
  isSidebarOpen,
  setSidebarOpen,
  isLogin,
  setIsLogin,
  isOpenFullScreenPanel,
  setIsOpenFullScreenPanel,
  userData,
  setUserData,
  openAlertBox,
  cartData,
  setCartData,
  fetchCategories,
  windowWidth,
  setWindowWidth,
  sidebarWidth,
  setSidebarWidth 
  }

  return (
     <MyContext.Provider value={values}>
    <RouterProvider router={router} />
      <Toaster/>
    </MyContext.Provider>
  )
}

export default App;
export {MyContext}

