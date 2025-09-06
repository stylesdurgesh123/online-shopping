const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

   orderId: {
    type: String,
    unique: true,
    default: () => "ORD-" + Date.now() + "-" + Math.floor(Math.random() * 1000)
  },  

  userId:{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  products:[
   {
    productId:{
      type: String
    },
    productTitle:{
      type: String
    },
    quantity:{
      type: Number
    },
    price:{
      type: Number
    },
    image:{
      type: String
    },
    subTotal:{
    type: Number
    }
   }
  ],
    paymentId:{
    type: String,
    default: ''
  },
    payment_status:{
    type: String,
    default: ''
  },
   order_status:{
    type: String,
    default: 'Pending'
  },
    delivery_address:{
    type: mongoose.Schema.ObjectId,
    ref: 'address'
  },

    totalAmt:{
    type: Number,
    default: 0
  },
 },
  {timestamps: true
  });

const OrderModel = mongoose.model('order', orderSchema);
module.exports=OrderModel;
 

