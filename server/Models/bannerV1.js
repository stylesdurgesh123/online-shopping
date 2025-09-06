const mongoose = require('mongoose');

const bannerV1Schema = new mongoose.Schema({

   bannerTitle: {
    type: String,
    default: '',
    required: true
  },

   images:[
    {
      type: String,  
    }
  ],

  catId: {
    type: String,
    default: '',
    required: true
   },
 
  subCatId: {
    type: String,
    default: '',
    required: true
   },

   thirdSubCatId: {
    type: String,
    default: '',
    required: true
   },  

   price: {
    type: Number,
    default: '',
    required: true
   },
   
},{timestamps: true});

const bannerV1Model = mongoose.model('bannerV1', bannerV1Schema);
module.exports= bannerV1Model;
