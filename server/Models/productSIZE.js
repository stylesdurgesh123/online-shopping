const mongoose = require('mongoose');

const productSIZESchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
   dateCreated: {
   type: Date,
   default: Date.now,
 }
},{
  timestamps: true
});

const productSIZEModel = mongoose.model('productSIZE', productSIZESchema);
module.exports= productSIZEModel;
