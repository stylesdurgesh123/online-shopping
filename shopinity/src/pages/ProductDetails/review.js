/*import React, { useContext, useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { MyContext } from '../../App';
import { postData } from '../../utlis/api';

function Review(props) {

    const [showForm, setShowForm] = useState(false);
    const [reviewMessage, setReviewMessage] = useState('');
    const [reviewRating, setReviewRating] = useState(0);
    const [reviews, setReviews] = useState({ 
     image:'',
     userName:'',
     review:'',
     rating:1,
     userId:'',
     productId:''
     });

 const context=useContext(MyContext);

   useEffect(()=>{
    setReviews(()=>({
     ...reviews,
     image:context?.userData?.avatar,
     userName:context?.userData?.name,
     userId:context?.userData?._id,
     productId:props?.productId
    }))
     },[context?.userData,props])

 const onChangeInput=(e)=>{
     setReviews(()=>({
       ...reviews,
       reviews:e.target.value
    }))
 }
  
  const handleSubmitReview = () => {
    const today = new Date();
    const date = today.toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  
    const newReview = {
      name: "Guest User",
      date,
      rating: reviewRating,
      message: reviewMessage,
      image: "https://randomuser.me/api/portraits/lego/1.jpg" 
    };

    setReviews([newReview, ...reviews]);
    setReviewMessage('');
    setReviewRating(0);
    setShowForm(false);
   };

 const addReview=(e)=>{
  e.preventDefault();
  postData(`/api/user/addReview`,reviews)
  .then((res)=>{
   if(res?.error===false){
   context.openAlertBox('success',res?.message);
   setReviews(()=>({
     ...reviews,
     reviews:'',
     rating:1
    }))
   }
  })
 }

  return (
  <div className="p-6 text-gray-700 space-y-6">
      <h3 className="text-lg font-semibold">Customer Question & Answer</h3>
      <div className="border border-gray-200 rounded-lg p-4">
        <button
          className="text-white bg-[#ff5252] px-4 py-2 rounded hover:bg-[#e04848] transition"
          onClick={() => setShowForm(!showForm)}>
          {
          showForm ? 'Cancel Review' : 'Add a Review'
          }
        </button>
        {showForm && (
          <form className="mt-4 space-y-3" onSubmit={addReview}>
            <textarea
              rows="4"
              placeholder="Write your review here..."
              className="w-full p-3 border rounded resize-none focus:outline-none"
              onChange={onChangeInput}
              value={reviews.review}
              />
              <Rating
              name="small-size"
              defaultValue={reviews.rating}
              onChange={(e, newValue) => {
              setReviews(()=>({
              ...reviews,
              rating:newValue
              }))
              }}
             />
              <Button
              type='submit'
              variant="contained"
              sx={{ backgroundColor: '#ff5252', '&:hover': { backgroundColor: '#e04848' } }}
              onClick={handleSubmitReview}
              disabled={!reviewMessage || !reviewRating}>
              Submit Review
            </Button>
          </form>
        )}
      </div>
    </div>   
  )
}

export default Review;
*/
/*
import React, { useContext, useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { MyContext } from '../../App';
import { fetchDataFromApi, postData } from '../../utlis/api';

function Review(props) {
  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState({
    image: '',
    userName: '',
    review: '',
    rating: 0,
    userId: '',
    productId: ''
  });

  const [reviewsData,setReviewsData]=useState();

  const context = useContext(MyContext);

  useEffect(() => {
    setReviews((prev) => ({
      ...prev,
      image: context?.userData?.avatar,
      userName: context?.userData?.name,
      userId: context?.userData?._id,
      productId: props?.productId
    }));
  }, [context?.userData, props]);

  const onChangeInput = (e) => {
    setReviews((prev) => ({
      ...prev,
      review: e.target.value
    }));
  };

  const handleSubmitReview = () => {
    const today = new Date();
    const date = today.toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric'
    });

    const newReview = {
      ...reviews,
      date,
    };

    postData(`/api/user/addReview`, newReview).then((res) => {
      if (res?.error === false) {
        context.openAlertBox('success', res?.message);
        setReviews((prev) => ({
          ...prev,
          review: '',
          rating: 0
        }));
        setShowForm(false);
        getReviews();
      }
    });
  };

 const getReviews=()=>{
  fetchDataFromApi(`api/user/getReview?productId=${props?.productId}`)
   .then((res)=>{
    if(res?.error===false){
    // setReviewsData(res?.review)
    console.log(res?.review)
    }
   })
 }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitReview();
  };

  return (
    <div className="p-6 text-gray-700 space-y-6">
      <h3 className="text-lg font-semibold">Customer Review</h3>
      
      <div className="border border-gray-200 rounded-lg p-4">
        <button
          className="text-white bg-[#ff5252] px-4 py-2 rounded hover:bg-[#e04848] transition"
          onClick={() => setShowForm(!showForm)}
          >
          {showForm ? 'Cancel Review' : 'Add a Review'}
        </button>

        {showForm && (
          <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
            <textarea
              rows="4"
              placeholder="Write your review here..."
              className="w-full p-3 border rounded resize-none focus:outline-none"
              onChange={onChangeInput}
              value={reviews.review}
            />
            <Rating
              name="rating"
              value={reviews.rating}
              onChange={(e, newValue) => {
                setReviews((prev) => ({
                  ...prev,
                  rating: newValue
                }));
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: '#ff5252', '&:hover': { backgroundColor: '#e04848' } }}
              disabled={!reviews.review || !reviews.rating}
            >
              Submit Review
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Review;
*/


import React, { useContext, useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { MyContext } from '../../App';
import { fetchDataFromApi, postData } from '../../utlis/api';

function Review(props) {
  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState({
    image: '',
    userName: '',
    review: '',
    rating: 0,
    userId: '',
    productId: ''
  });

  const [reviewsData, setReviewsData] = useState([]);
  const context = useContext(MyContext);

  useEffect(() => {
      setReviews((prev) => ({
        ...prev,
        image: context.userData.avatar,
        userName: context.userData.name,
        userId: context.userData._id,
        productId:props?.productId
      }));
      getReviews(props?.productId); // Fetch reviews for this product
    },[context?.userData, props?.productId]);

  const onChangeInput = (e) => {
    setReviews((prev) => ({
      ...prev,
      review: e.target.value
    }));
  };

  const handleSubmitReview = () => {
    const today = new Date();
    const date = today.toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric'
    });

    const newReview = {
      ...reviews,
      date
    };

    postData(`/api/user/addReview`, newReview).then((res) => {
      if (res?.error === false) {
        context.openAlertBox('success', res?.message);
        setReviews((prev) => ({
          ...prev,
          review: '',
          rating: 0
        }));
        setShowForm(false);
        getReviews(props?.productId); // Refresh reviews
      } else {
        context.openAlertBox('error', res?.message || 'Something went wrong');
      }
    });
  };

  const getReviews = (prodId) => {
    fetchDataFromApi(`/api/user/getReview?productId=${prodId}`)
      .then((res) => {
        if (res?.error === false) {
          setReviewsData(res.review || []);
         props.setReviewCount((res.review || []).length);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitReview();
  };

  return (
    <div className="p-6 text-gray-700 space-y-6">
      <h3 className="text-lg font-semibold">Customer Reviews</h3>
      <div className="border border-gray-200 rounded-lg p-4">
        <button
          className="text-white bg-[#ff5252] px-4 py-2 rounded hover:bg-[#e04848] transition"
          onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel Review' : 'Add a Review'}
        </button>
        {showForm && (
          <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
            <textarea
              rows="4"
              placeholder="Write your review here..."
              className="w-full p-3 border rounded resize-none focus:outline-none"
              onChange={onChangeInput}
              value={reviews.review}
            />
            <Rating
              name="rating"
              value={reviews.rating}
              onChange={(e, newValue) => {
              setReviews((prev) => ({
                ...prev,
                 rating: newValue
                }));
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: '#ff5252', '&:hover': { backgroundColor: '#e04848' } }}
              disabled={!reviews.review || !reviews.rating}>
              Submit Review
            </Button>
          </form>
        )}
      </div>

      {/* Show reviews */}
      <div className="space-y-4">
        {reviewsData && reviewsData.length > 0 ? (
          reviewsData.map((item,index) => (
            <div key={index} className="border p-4 rounded shadow-sm">
              <div className="flex items-center space-x-4">
                <img src={item.image} 
                alt="user" 
                className="w-[100px] h-[100px] rounded-full overflow-hidden
                mb-4 relative group flex items-center justify-center bg-gray-200"/>
                <div>
                  <h4 className="font-semibold">{item.userName}</h4>
                  <p className="text-sm text-gray-500">{item.createdAt.split("T")[0]}</p>
                  <p>{item.review}</p>
                  <Rating size='small' value={item.rating} readOnly/>
                </div>
              </div>  
            </div>
          ))
        ) : (
          <p>No reviews yet for this product.</p>
        )}
      </div>
    </div>
  );
}

export default Review;

