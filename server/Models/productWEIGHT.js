const mongoose = require('mongoose');

const productWIGHTSchema = new mongoose.Schema({
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

const productWEIGHTModel = mongoose.model('productWEIGHT', productWIGHTSchema);
module.exports= productWEIGHTModel;
