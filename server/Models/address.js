const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  address_line1:{
    type: String,
    default: ''
  },
    city:{
    type: String,
    default: ''
  },
     state:{
    type: String,
    default: ''
  },
    pincode:{
    type: String
  },
    country:{
    type: String
  },
   mobile:{
    type: Number,
    default: null
  },
    status:{
    type: Boolean,
    default: true
  },
    landmark:{
    type: String
   },
    addressType: {
     type: String,
     enum: ['Home', 'Office']
   },
   userId:{
    type: String,
    default: ''
  }
},
  {timestamps: true
  });

const AddressModel = mongoose.model('address', addressSchema);
module.exports=AddressModel;
