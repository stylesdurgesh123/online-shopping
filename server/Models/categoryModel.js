const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  images:[
    {
      type: String,  
    }
  ],
  parentCatName:{
    type: String
  },
  parentId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    default: null
  }
},{timestamps: true});

const categoryModel = mongoose.model('category', categorySchema);
module.exports= categoryModel;
