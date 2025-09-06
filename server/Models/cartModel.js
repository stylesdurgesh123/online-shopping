const mongoose = require('mongoose');

const cartProductSchema = new mongoose.Schema({
   productTitle: {
    type: String,
    require: true
  }, 
  image: {
    type: String,
    require: true
  }, 
  rating: {
    type: Number,
    require: true
  },
   price: {
    type: Number,
    require: true
  },
   oldPrice: {
    type: Number
  },
   discount: {
    type: Number,
    },
      productRam:{
        type: String
      },
    size:{
       type: String
        },
    productWeight:{
      type: String
      },
   brand: {
    type: String
    },
   quantity: {
    type: Number,
    require: true
  },
   subTotal: {
    type: Number,
    require: true
  },
   productId: {
    type: String,
    require: true
  },
   countInStock: {
    type: Number,
    require: true
  },
   userId: {
    type: String,
    require: true
  },
 },{timestamps: true});

const cartProductModel = mongoose.model('cart', cartProductSchema);
module.exports=cartProductModel;
