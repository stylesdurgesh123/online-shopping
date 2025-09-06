const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
      image: {
      type: String,
      default: ''
     },

   userName:{
      type: String,
      default: '' 
    },

   review: {
    type: String,
    default: ''
  }, 

   rating: {
    type: String,
    default: ''
  }, 

   userId: {
    type: String,
    default: ''
  },
  
   productId: {
    type: String,
    default: ''
  },
   
},{timestamps: true});

const reviewsModel = mongoose.model('reviews', reviewsSchema);
module.exports=reviewsModel;
