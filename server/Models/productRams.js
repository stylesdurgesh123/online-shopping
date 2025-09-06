const mongoose = require('mongoose');

const productRAMSSchema = new mongoose.Schema({
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

const productRAMSModel = mongoose.model('productRAMS', productRAMSSchema);
module.exports= productRAMSModel;
